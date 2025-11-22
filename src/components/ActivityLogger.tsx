import React, { useState, useMemo } from 'react';
import { Activity, Criterion } from '../types';
import { getLoggableCriteria } from '../utils';
import { CLUBS_UNIVERSITY, CLUBS_FACULTY } from '../data';
import { Plus, Trash2, Calendar, Building2, Target, Filter } from 'lucide-react';

interface ActivityLoggerProps {
  activities: Activity[];
  criteriaData: Criterion[];
  onAddActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  onRemoveActivity: (id: string) => void;
}

export const ActivityLogger: React.FC<ActivityLoggerProps> = ({
  activities,
  criteriaData,
  onAddActivity,
  onRemoveActivity,
}) => {
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [orgLevel, setOrgLevel] = useState<'UNIVERSITY' | 'FACULTY'>('UNIVERSITY');
  const [criterionId, setCriterionId] = useState('');

  const loggableCriteria = useMemo(() => getLoggableCriteria(criteriaData), [criteriaData]);

  const suggestions = useMemo(() => {
    return orgLevel === 'UNIVERSITY' ? CLUBS_UNIVERSITY : CLUBS_FACULTY;
  }, [orgLevel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !criterionId) return;

    onAddActivity({
      name,
      organization: org,
      criterionId,
    });

    setName('');
    setOrg('');
    setCriterionId('');
  };

  const getCriterionLabel = (id: string) => {
    const found = loggableCriteria.find((c) => c.id === id);
    return found ? found.label : id;
  };

  return (
    <div className="space-y-6">
      {/* Add Activity Form */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
          <Plus size={18} className="mr-2 text-blue-600" />
          Thêm hoạt động mới
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              Tên hoạt động <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Chiến dịch Mùa hè xanh..."
              className="w-full p-2 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase">
                Đơn vị tổ chức / CLB
                </label>
            </div>
            
            {/* Organization Level Selector */}
            <div className="flex space-x-4 mb-2">
                <label className="flex items-center cursor-pointer">
                    <input 
                        type="radio" 
                        name="orgLevel" 
                        value="UNIVERSITY" 
                        checked={orgLevel === 'UNIVERSITY'} 
                        onChange={() => setOrgLevel('UNIVERSITY')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">Cấp Trường (Đoàn - Hội)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                    <input 
                        type="radio" 
                        name="orgLevel" 
                        value="FACULTY" 
                        checked={orgLevel === 'FACULTY'} 
                        onChange={() => setOrgLevel('FACULTY')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">Cấp Khoa / Viện</span>
                </label>
            </div>

            <div className="relative">
              <input
                type="text"
                list="org-suggestions"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="Chọn hoặc nhập tên đơn vị..."
                className="w-full p-2 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
              <datalist id="org-suggestions">
                {suggestions.map((club) => (
                  <option key={club} value={club} />
                ))}
              </datalist>
            </div>
            <p className="text-xs text-slate-400 mt-1">
                {orgLevel === 'UNIVERSITY' 
                    ? 'Các CLB/Đội/Nhóm trực thuộc Đoàn - Hội trường.' 
                    : 'Các CLB/Đội/Nhóm trực thuộc Khoa/Viện.'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              Tiêu chí tương ứng <span className="text-red-500">*</span>
            </label>
            <select
              value={criterionId}
              onChange={(e) => setCriterionId(e.target.value)}
              className="w-full p-2 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="">-- Chọn tiêu chí --</option>
              {loggableCriteria.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.id}] {c.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">Chọn tiêu chí phù hợp nhất để hệ thống tự động cộng điểm.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm active:scale-[0.98]"
          >
            Lưu hoạt động
          </button>
        </form>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-700 px-1">Nhật ký hoạt động ({activities.length})</h3>
        
        {activities.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <div className="text-slate-400 mb-2">Chưa có hoạt động nào</div>
            <p className="text-xs text-slate-400">Các hoạt động bạn thêm sẽ xuất hiện tại đây.</p>
          </div>
        ) : (
          activities.slice().reverse().map((activity) => (
            <div key={activity.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start group">
              <div className="flex-1 pr-4">
                <h4 className="font-semibold text-slate-800 mb-1">{activity.name}</h4>
                
                {activity.organization && (
                  <div className="flex items-center text-xs text-slate-500 mb-2">
                    <Building2 size={12} className="mr-1" />
                    {activity.organization}
                  </div>
                )}
                
                <div className="flex items-start text-xs text-blue-600 bg-blue-50 p-2 rounded mt-1">
                  <Target size={12} className="mr-1.5 mt-0.5 flex-shrink-0" />
                  <span>{getCriterionLabel(activity.criterionId)}</span>
                </div>
                
                <div className="flex items-center text-[10px] text-slate-400 mt-2">
                  <Calendar size={10} className="mr-1" />
                  {new Date(activity.timestamp).toLocaleString('vi-VN')}
                </div>
              </div>
              
              <button
                onClick={() => onRemoveActivity(activity.id)}
                className="text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded transition-colors"
                title="Xóa hoạt động"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};