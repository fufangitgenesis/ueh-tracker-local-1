import React, { useRef, useState } from 'react';
import { Activity, UserState, Criterion } from '../types';
import { exportToExcel, exportToPDF, exportToJSON } from '../exportUtils';
import { Download, Upload, FileSpreadsheet, FileText, FileJson, ChevronDown } from 'lucide-react';

interface DataControlsProps {
    activities: Activity[];
    userState: UserState;
    criteriaData: Criterion[];
    totalScore: number;
    onImport: (data: { userState: UserState; activities: Activity[] }) => void;
}

export const DataControls: React.FC<DataControlsProps> = ({
    activities,
    userState,
    criteriaData,
    totalScore,
    onImport
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (json.userState && Array.isArray(json.activities)) {
                    if (window.confirm('Bạn có chắc muốn nhập dữ liệu này? Dữ liệu hiện tại sẽ bị thay thế.')) {
                        onImport(json);
                    }
                } else {
                    alert('File không hợp lệ. Vui lòng chọn file backup JSON đúng định dạng.');
                }
            } catch (err) {
                alert('Lỗi đọc file.');
            }
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Import Button */}
            <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                title="Nhập dữ liệu từ file backup"
            >
                <Upload size={16} className="mr-2" />
                <span className="hidden sm:inline">Nhập</span>
            </button>

            {/* Export Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                    <Download size={16} className="mr-2" />
                    <span className="hidden sm:inline">Xuất</span>
                    <ChevronDown size={14} className="ml-1 opacity-80" />
                </button>

                {isMenuOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-1">
                                <button
                                    onClick={() => {
                                        exportToExcel(activities, userState, criteriaData, totalScore);
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                >
                                    <FileSpreadsheet size={16} className="mr-2 text-emerald-600" />
                                    Excel (.xlsx)
                                </button>
                                <button
                                    onClick={() => {
                                        exportToPDF(activities, userState, criteriaData, totalScore);
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                >
                                    <FileText size={16} className="mr-2 text-red-600" />
                                    PDF Report
                                </button>
                                <div className="my-1 border-t border-slate-100"></div>
                                <button
                                    onClick={() => {
                                        exportToJSON({ userState, activities });
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                >
                                    <FileJson size={16} className="mr-2 text-slate-500" />
                                    Backup JSON
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};