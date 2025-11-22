import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Activity, UserState, Criterion, InputType } from './types';
import { calculateNodeScore, calculateTotalScore } from './utils';

// --- HELPER FUNCTIONS ---

// Recursively flatten criteria to get scores for the report
const getFlatScores = (criteria: Criterion[], state: UserState): { label: string; score: number; max: number; level: number }[] => {
    let rows: { label: string; score: number; max: number; level: number }[] = [];

    criteria.forEach(c => {
        const score = calculateNodeScore(c, state);
        // Only show groups or items that have points relevant to the final score
        // We skip detailed children if the parent group logic is complex, but for this app, listing them is good.
        rows.push({
            label: c.label,
            score: score,
            max: c.maxPoints ?? (c.points || 0),
            level: 0 // Root
        });

        if (c.children) {
            const processChildren = (children: Criterion[], level: number) => {
                children.forEach(child => {
                    const childScore = calculateNodeScore(child, state);
                    rows.push({
                        label: child.label,
                        score: childScore,
                        max: child.maxPoints ?? (child.points || 0),
                        level: level
                    });
                    if (child.children) processChildren(child.children, level + 1);
                });
            };
            processChildren(c.children, 1);
        }
    });
    return rows;
};

const getClassification = (score: number) => {
    if (score >= 90) return 'Xuất sắc';
    if (score >= 80) return 'Tốt';
    if (score >= 65) return 'Khá';
    if (score >= 50) return 'Trung bình';
    return 'Yếu/Kém';
};

// --- EXCEL EXPORT ---

export const exportToExcel = (
    activities: Activity[],
    userState: UserState,
    criteriaData: Criterion[],
    totalScore: number
) => {
    // 1. Summary Sheet
    const summaryData = [
        ["BẢNG ĐÁNH GIÁ ĐIỂM RÈN LUYỆN UEH"],
        [""],
        ["Tổng điểm", totalScore],
        ["Xếp loại", getClassification(totalScore)],
        [""],
        ["CHI TIẾT CÁC MỤC CHÍNH"],
        ["Mục", "Điểm tối đa", "Điểm đạt được"],
    ];

    criteriaData.forEach(section => {
        const score = calculateNodeScore(section, userState);
        summaryData.push([
            section.label,
            section.maxPoints?.toString() || "-",
            score.toString()
        ]);
    });

    // 2. Detailed Scores Sheet
    const flatScores = getFlatScores(criteriaData, userState);
    const detailData = [
        ["Nội dung", "Điểm đạt được", "Điểm tối đa/Quy định"],
        ...flatScores.map(item => [
            "  ".repeat(item.level) + item.label, // Indent for hierarchy effect
            item.score,
            item.max
        ])
    ];

    // 3. Activity Log Sheet
    const activityData = [
        ["Thời gian", "Tên hoạt động", "Đơn vị tổ chức", "Mã tiêu chí"],
        ...activities.map(a => [
            new Date(a.timestamp).toLocaleString('vi-VN'),
            a.name,
            a.organization,
            a.criterionId
        ])
    ];

    // Create Workbook
    const wb = utils.book_new();

    const wsSummary = utils.aoa_to_sheet(summaryData);
    const wsDetail = utils.aoa_to_sheet(detailData);
    const wsActivities = utils.aoa_to_sheet(activityData);

    // Column widths
    wsSummary['!cols'] = [{ wch: 50 }, { wch: 15 }, { wch: 15 }];
    wsDetail['!cols'] = [{ wch: 80 }, { wch: 15 }, { wch: 15 }];
    wsActivities['!cols'] = [{ wch: 20 }, { wch: 40 }, { wch: 30 }, { wch: 15 }];

    utils.book_append_sheet(wb, wsSummary, "Tổng quan");
    utils.book_append_sheet(wb, wsDetail, "Chi tiết điểm");
    utils.book_append_sheet(wb, wsActivities, "Nhật ký hoạt động");

    writeFile(wb, `UEH_DRL_Export_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

// --- PDF EXPORT ---

// We need a font that supports Vietnamese. 
// Since we can't bundle a large TTF, we try to fetch it. 
// If fetch fails, it falls back to standard font (garbled text).
const loadVietnameseFont = async (doc: jsPDF) => {
    try {
        // Using a CDN for Arimo (Apache 2.0), which has good VN support and looks like Arial
        const fontUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf';
        const response = await fetch(fontUrl);
        const buffer = await response.arrayBuffer();
        const array = new Uint8Array(buffer);
        
        // Add font to VFS
        const fontFileName = 'Roboto-Regular.ttf';
        
        // Fix for browser environment: Manual binary string conversion instead of using Node.js Buffer
        let binaryString = "";
        for (let i = 0; i < array.length; i++) {
            binaryString += String.fromCharCode(array[i]);
        }
        
        doc.addFileToVFS(fontFileName, binaryString);
        doc.addFont(fontFileName, 'Roboto', 'normal');
        doc.setFont('Roboto');
        return true;
    } catch (e) {
        console.warn("Could not load Vietnamese font. Text may be garbled.", e);
        return false;
    }
};

export const exportToPDF = async (
    activities: Activity[],
    userState: UserState,
    criteriaData: Criterion[],
    totalScore: number
) => {
    const doc = new jsPDF();
    
    // Load font
    await loadVietnameseFont(doc);

    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 92, 169); // UEH Blue
    doc.text("BẢNG ĐÁNH GIÁ ĐIỂM RÈN LUYỆN UEH", 14, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 14, 28);

    // Summary Table
    const summaryRows = criteriaData.map(section => {
        const score = calculateNodeScore(section, userState);
        return [section.label, `${score} / ${section.maxPoints}`];
    });

    // Add Total Row
    summaryRows.push(["TỔNG CỘNG", `${totalScore} / 100`]);
    summaryRows.push(["XẾP LOẠI", getClassification(totalScore)]);

    autoTable(doc, {
        startY: 35,
        head: [['Hạng mục', 'Kết quả']],
        body: summaryRows,
        theme: 'grid',
        headStyles: { fillColor: [0, 92, 169] },
        styles: { font: 'Roboto', fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 40, halign: 'center' }
        }
    });

    let finalY = (doc as any).lastAutoTable.finalY + 10;

    // Activity Log Table
    doc.setFontSize(14);
    doc.setTextColor(0, 92, 169);
    doc.text("Nhật ký hoạt động", 14, finalY);
    
    const activityRows = activities.map(a => [
        new Date(a.timestamp).toLocaleDateString('vi-VN'),
        a.name,
        a.organization || '-',
        a.criterionId
    ]);

    if (activityRows.length > 0) {
        autoTable(doc, {
            startY: finalY + 5,
            head: [['Ngày', 'Hoạt động', 'Đơn vị', 'Mã TC']],
            body: activityRows,
            theme: 'striped',
            headStyles: { fillColor: [249, 115, 22] }, // UEH Orange ish
            styles: { font: 'Roboto', fontSize: 9 },
        });
    } else {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("(Chưa có hoạt động nào được ghi nhận)", 14, finalY + 10);
    }

    doc.save(`UEH_DRL_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
};

export const exportToJSON = (data: any) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `UEH_DRL_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
};