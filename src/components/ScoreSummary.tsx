import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreSummaryProps {
  totalScore: number;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({ totalScore }) => {
  let classification = '';
  let colorClass = '';

  if (totalScore >= 90) {
    classification = 'Xuất sắc';
    colorClass = 'text-emerald-600';
  } else if (totalScore >= 80) {
    classification = 'Tốt';
    colorClass = 'text-blue-600';
  } else if (totalScore >= 65) {
    classification = 'Khá';
    colorClass = 'text-yellow-600';
  } else if (totalScore >= 50) {
    classification = 'Trung bình';
    colorClass = 'text-orange-600';
  } else {
    classification = 'Yếu/Kém';
    colorClass = 'text-red-600';
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg p-4 z-50 pb-8 sm:pb-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs uppercase font-semibold tracking-wider">Tổng Điểm Rèn Luyện</span>
          <div className="flex items-baseline space-x-2">
             <span className="text-3xl font-bold text-slate-900">{totalScore}</span>
             <span className="text-slate-400 text-sm">/ 100</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
           <span className="text-slate-500 text-xs uppercase font-semibold tracking-wider">Xếp loại</span>
           <div className={`flex items-center space-x-2 font-bold ${colorClass}`}>
               <Trophy size={18} />
               <span>{classification}</span>
           </div>
        </div>
      </div>
    </div>
  );
};
