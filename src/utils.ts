
import { Criterion, InputType, UserState } from './types';

// Helper to get the raw score of a single item based on user input
const getItemRawScore = (criterion: Criterion, state: UserState): number => {
  if (criterion.type === InputType.GROUP) {
    // Groups don't have direct values, their score comes from children
    return 0;
  }

  const value = state[criterion.id];

  if (criterion.type === InputType.BOOLEAN) {
    return value === true ? (criterion.points || 0) : 0;
  }

  if (criterion.type === InputType.NUMBER) {
    const count = typeof value === 'number' ? value : 0;
    return count * (criterion.points || 0);
  }

  if (criterion.type === InputType.SELECT && criterion.options) {
    const selectedOptionId = value as string;
    const selectedOption = criterion.options.find(opt => opt.id === selectedOptionId);
    return selectedOption ? selectedOption.value : 0;
  }

  return 0;
};

// Recursive function to calculate score for a criterion node
export const calculateNodeScore = (criterion: Criterion, state: UserState): number => {
  // Base case: If it has no children, calculate its own score
  if (!criterion.children || criterion.children.length === 0) {
    const score = getItemRawScore(criterion, state);
    // Apply maxPoints constraint on leaf node if it exists (e.g. max 5 points for a specific activity type)
    if (criterion.maxPoints !== undefined) {
        if (criterion.isDeduction) {
             // For deductions, maxPoints is usually a negative floor (e.g. -10).
             // Score is negative (e.g. -3 * 4 = -12).
             // We want max(score, maxPoints) -> max(-12, -10) = -10.
             return Math.max(score, criterion.maxPoints);
        } else {
             return Math.min(score, criterion.maxPoints);
        }
    }
    return score;
  }

  // Recursive step: Sum children scores
  let childrenSum = 0;
  for (const child of criterion.children) {
    childrenSum += calculateNodeScore(child, state);
  }

  // Apply maxPoints constraint to the group sum
  if (criterion.maxPoints !== undefined) {
      if (criterion.isDeduction) {
          // For deduction groups (e.g. max -25 deducted), the sum will be negative.
          // We clamp it so it doesn't go below the floor.
          // Example: Sum is -30, Max is -25. Result should be -25.
          return Math.max(childrenSum, criterion.maxPoints);
      } else {
          // For positive groups, clamp to ceiling.
          return Math.min(childrenSum, criterion.maxPoints);
      }
  }

  return childrenSum;
};

export const calculateTotalScore = (criteria: Criterion[], state: UserState): number => {
  let total = 0;
  criteria.forEach(c => {
    total += calculateNodeScore(c, state);
  });
  // Ensure final score doesn't exceed 100 (though technically some frameworks allow bonus, usually capped at 100 for classification)
  // The PDF implies standard 100 scale.
  return Math.min(total, 100);
};

// Flatten criteria to get a list of loggable items (Leaves that are Number or Boolean)
export const getLoggableCriteria = (criteria: Criterion[]): { id: string; label: string; group: string }[] => {
  const results: { id: string; label: string; group: string }[] = [];

  const traverse = (nodes: Criterion[], groupLabel: string) => {
    nodes.forEach(node => {
      if (node.type === InputType.GROUP) {
        // Update group label if it's a major section (I, II, III...) or significant subsection
        const isSection = /^[IVX]+\./.test(node.label);
        const newGroup = isSection ? node.label : groupLabel;
        if (node.children) traverse(node.children, newGroup);
      } else if (node.type === InputType.NUMBER || node.type === InputType.BOOLEAN) {
        // Only allow logging for Countable or Checkable items
        // Exclude SELECT types (grades) as they don't fit "Activity Log" well
        results.push({
          id: node.id,
          label: node.label,
          group: groupLabel
        });
      }
    });
  };

  traverse(criteria, 'Khác');
  return results;
};
