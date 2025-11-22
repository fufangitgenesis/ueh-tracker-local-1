
export enum InputType {
  BOOLEAN = 'BOOLEAN', // Simple checkbox (Yes/No)
  SELECT = 'SELECT',   // Radio group (Mutually exclusive options)
  NUMBER = 'NUMBER',   // Input field (Number of times/activities)
  GROUP = 'GROUP'      // Container for other items
}

export interface Criterion {
  id: string;
  label: string; // Description from the PDF
  type: InputType;
  points?: number; // Points awarded per unit (or fixed points if boolean)
  maxPoints?: number; // Maximum points allowed for this specific node or its children
  options?: { label: string; value: number; id: string }[]; // For SELECT type
  children?: Criterion[]; // Nested criteria
  isDeduction?: boolean; // If true, points are negative
}

export interface UserState {
  [key: string]: number | string | boolean; // id -> value (count, selectedOptionId, or boolean)
}

export interface Activity {
  id: string; // Unique ID for the log entry
  name: string;
  organization: string;
  criterionId: string;
  timestamp: number;
}
