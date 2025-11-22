import React, { useState, useMemo, useEffect } from 'react';
import { CRITERIA_DATA } from './data';
import { UserState, Activity, InputType } from './types';
import { CriteriaItem } from './components/CriteriaItem';
import { ScoreSummary } from './components/ScoreSummary';
import { ActivityLogger } from './components/ActivityLogger';
import { DataControls } from './components/DataControls';
import { calculateTotalScore, calculateNodeScore, getLoggableCriteria } from './utils';
import { GraduationCap, RefreshCcw, Calculator, ListTodo } from 'lucide-react';

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  
  // Criteria State (The values used for score calculation)
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('ueh-drl-state');
    return saved ? JSON.parse(saved) : {};
  });

  // Activity Log State
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('ueh-drl-activities');
    return saved ? JSON.parse(saved) : [];
  });

  // View State
  const [activeTab, setActiveTab] = useState<'calculator' | 'logger'>('calculator');

  // --- EFFECTS ---

  useEffect(() => {
    localStorage.setItem('ueh-drl-state', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    localStorage.setItem('ueh-drl-activities', JSON.stringify(activities));
  }, [activities]);

  // --- HANDLERS ---

  const handleStateChange = (id: string, value: any) => {
    setUserState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu? Hành động này sẽ xóa cả danh sách hoạt động.')) {
      setUserState({});
      setActivities([]);
    }
  };

  const handleImport = (data: { userState: UserState; activities: Activity[] }) => {
      setUserState(data.userState);
      setActivities(data.activities);
  };

  // Helper to find criteria type
  const getCriteriaType = (id: string) => {
    const flat = getLoggableCriteria(CRITERIA_DATA);
    const found = flat.find(c => c.id === id);
    // We only allow logging for items found in getLoggableCriteria (Boolean or Number)
    // But we need to know which one it is. 
    // Since getLoggableCriteria doesn't return type, we might need to search the tree or imply it.
    // A quick way is to check the current state value type or default to NUMBER if undefined.
    // Better: Traverse tree to find it.
    const findType = (nodes: typeof CRITERIA_DATA): InputType | undefined => {
        for (const node of nodes) {
            if (node.id === id) return node.type;
            if (node.children) {
                const childType = findType(node.children);
                if (childType) return childType;
            }
        }
        return undefined;
    };
    return findType(CRITERIA_DATA);
  };

  const handleAddActivity = (newActivity: Omit<Activity, 'id' | 'timestamp'>) => {
    const activity: Activity = {
        ...newActivity,
        id: crypto.randomUUID(),
        timestamp: Date.now()
    };

    setActivities(prev => [...prev, activity]);

    // Automatically update the score state
    const type = getCriteriaType(activity.criterionId);
    
    setUserState(prev => {
        const currentVal = prev[activity.criterionId];
        let newVal = currentVal;

        if (type === InputType.NUMBER) {
            newVal = (typeof currentVal === 'number' ? currentVal : 0) + 1;
        } else if (type === InputType.BOOLEAN) {
            newVal = true;
        }
        
        return { ...prev, [activity.criterionId]: newVal };
    });
  };

  const handleRemoveActivity = (activityId: string) => {
    const activityToRemove = activities.find(a => a.id === activityId);
    if (!activityToRemove) return;

    setActivities(prev => prev.filter(a => a.id !== activityId));

    // Decrement score state
    const type = getCriteriaType(activityToRemove.criterionId);

    setUserState(prev => {
        const currentVal = prev[activityToRemove.criterionId];
        let newVal = currentVal;

        if (type === InputType.NUMBER) {
            newVal = Math.max(0, (typeof currentVal === 'number' ? currentVal : 0) - 1);
        } else if (type === InputType.BOOLEAN) {
            // If it's boolean, removing one activity *might* not mean it's false 
            // (user could have manually checked it or have other activities).
            // But for strict sync, we might want to set it to false if no other activities exist for this ID?
            // Let's check if other activities exist for this ID.
            const otherActivities = activities.filter(a => a.id !== activityId && a.criterionId === activityToRemove.criterionId);
            if (otherActivities.length === 0) {
                newVal = false;
            }
        }
        
        return { ...prev, [activityToRemove.criterionId]: newVal };
    });
  };

  const totalScore = useMemo(() => calculateTotalScore(CRITERIA_DATA, userState), [userState]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight hidden sm:block">Đánh Giá Rèn Luyện</h1>
              <h1 className="font-bold text-slate-900 leading-tight sm:hidden">ĐRL UEH</h1>
              <p className="text-xs text-slate-500 font-medium">Student Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
              <DataControls 
                activities={activities}
                userState={userState}
                criteriaData={CRITERIA_DATA}
                totalScore={totalScore}
                onImport={handleImport}
              />
              <button 
                onClick={handleReset}
                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-100"
                title="Làm mới dữ liệu"
              >
                <RefreshCcw size={20} />
              </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Tabs */}
        <div className="flex p-1 bg-slate-200 rounded-lg mb-6">
            <button
                onClick={() => setActiveTab('calculator')}
                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'calculator' 
                    ? 'bg-white text-blue-700 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
            >
                <Calculator size={16} className="mr-2" />
                Tính Điểm
            </button>
            <button
                onClick={() => setActiveTab('logger')}
                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'logger' 
                    ? 'bg-white text-blue-700 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
            >
                <ListTodo size={16} className="mr-2" />
                Nhật Ký HĐ
            </button>
        </div>

        {activeTab === 'calculator' ? (
            <div className="space-y-6">
                {/* Intro Card */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                    Chọn các tiêu chí bên dưới hoặc chuyển sang tab <strong>Nhật Ký HĐ</strong> để thêm chi tiết các hoạt động đã tham gia.
                </p>
                </div>

                {/* Criteria Sections */}
                {CRITERIA_DATA.map((section) => {
                    const sectionScore = calculateNodeScore(section, userState);
                    const isMaxed = section.maxPoints !== undefined && sectionScore === section.maxPoints;
                    
                    return (
                    <div key={section.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide truncate mr-4">{section.label.split('.')[1] || section.label}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-bold ${isMaxed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                            {sectionScore} / {section.maxPoints}
                        </div>
                        </div>
                        <div className="p-4 pt-0">
                        <CriteriaItem
                            criterion={section}
                            state={userState}
                            onChange={handleStateChange}
                            level={0}
                        />
                        </div>
                    </div>
                    );
                })}

                <div className="text-center text-slate-400 text-xs py-4">
                    Kết quả mang tính chất tham khảo.
                </div>
            </div>
        ) : (
            <ActivityLogger 
                activities={activities}
                criteriaData={CRITERIA_DATA}
                onAddActivity={handleAddActivity}
                onRemoveActivity={handleRemoveActivity}
            />
        )}

      </main>

      {/* Sticky Footer */}
      <ScoreSummary totalScore={totalScore} />
    </div>
  );
};

export default App;