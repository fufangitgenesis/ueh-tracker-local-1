import React, { useCallback } from 'react';
import { Criterion, InputType, UserState } from '../types';
import { Check, ChevronDown, ChevronRight, Minus, Plus } from 'lucide-react';

interface CriteriaItemProps {
  criterion: Criterion;
  state: UserState;
  onChange: (id: string, value: any) => void;
  level?: number;
}

export const CriteriaItem: React.FC<CriteriaItemProps> = ({
  criterion,
  state,
  onChange,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Determine indentation and styling based on hierarchy level
  const paddingLeft = level * 16;
  const isGroup = criterion.type === InputType.GROUP;

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

  const renderInput = () => {
    if (isGroup) return null;

    if (criterion.type === InputType.BOOLEAN) {
      const isChecked = state[criterion.id] === true;
      return (
        <button
          onClick={() => onChange(criterion.id, !isChecked)}
          className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
            isChecked
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-white border-slate-300 hover:border-blue-400'
          }`}
        >
          {isChecked && <Check size={14} strokeWidth={3} />}
        </button>
      );
    }

    if (criterion.type === InputType.NUMBER) {
      const val = (state[criterion.id] as number) || 0;
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChange(criterion.id, Math.max(0, val - 1))}
            className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
            disabled={val <= 0}
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center font-medium text-slate-700">{val}</span>
          <button
            onClick={() => onChange(criterion.id, val + 1)}
            className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            <Plus size={14} />
          </button>
        </div>
      );
    }

    if (criterion.type === InputType.SELECT && criterion.options) {
      const currentVal = state[criterion.id] as string;
      return (
        <div className="flex flex-col space-y-2 mt-2 w-full">
          {criterion.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                currentVal === opt.id
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={criterion.id}
                checked={currentVal === opt.id}
                onChange={() => onChange(criterion.id, opt.id)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-slate-700">{opt.label}</span>
            </label>
          ))}
        </div>
      );
    }
    return null;
  };

  const scoreDisplay = () => {
    if (criterion.type === InputType.SELECT) return null; // handled in options usually or computed later
    
    if (criterion.points) {
        const pts = criterion.points;
        const unit = criterion.type === InputType.NUMBER ? '/lần' : '';
        const color = criterion.isDeduction ? 'text-red-500' : 'text-slate-500';
        return <span className={`text-xs font-medium ml-2 ${color}`}>({pts > 0 ? '+' : ''}{pts}{unit})</span>;
    }
    return null;
  };

  return (
    <div className={`flex flex-col ${level > 0 ? 'mt-2' : 'mt-4'}`}>
      {/* Header / Row content */}
      <div
        className={`flex items-start py-2 ${level === 0 ? 'border-b border-slate-100 pb-2 mb-2' : ''}`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {/* Expand Toggle for Groups */}
        {isGroup && (
          <button onClick={handleToggleExpand} className="mr-2 mt-1 text-slate-400 hover:text-slate-600">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}

        <div className="flex-1">
          <div className="flex items-baseline justify-between pr-2">
            <label
              className={`text-sm cursor-pointer select-none ${
                level === 0 ? 'font-bold text-slate-800 text-base' : 'text-slate-700 font-normal'
              }`}
              onClick={isGroup ? handleToggleExpand : undefined}
            >
              {criterion.label}
              {scoreDisplay()}
              {criterion.maxPoints !== undefined && (
                  <span className={`text-xs ml-2 px-1.5 py-0.5 rounded ${criterion.isDeduction ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      Max: {criterion.maxPoints}
                  </span>
              )}
            </label>
            
            {/* Input for non-select types (Select renders below label) */}
            {!isGroup && criterion.type !== InputType.SELECT && (
                 <div className="ml-4 flex-shrink-0">{renderInput()}</div>
            )}
          </div>

          {/* Select inputs render as a block below the label for better mobile UX */}
          {!isGroup && criterion.type === InputType.SELECT && (
               <div className="mt-1">{renderInput()}</div>
          )}
        </div>
      </div>

      {/* Children */}
      {isGroup && isExpanded && criterion.children && (
        <div className="flex flex-col">
          {criterion.children.map((child) => (
            <CriteriaItem
              key={child.id}
              criterion={child}
              state={state}
              onChange={onChange}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
