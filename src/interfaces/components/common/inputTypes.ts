import React from "react";

export interface ReusableInputProps {
  label?: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
}
