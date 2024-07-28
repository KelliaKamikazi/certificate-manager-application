import { ChangeEvent } from 'react';
import '../../styles/certificateForm.css';

export interface TextfieldProps {
  label?: string;
  name: string;
  value: string;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export function Textfield(props: TextfieldProps) {
  if (props.label)
    return (
      <div className="form-input-container">
        <label className="form-input-label">{props.label}</label>
        <input
          type={props.type}
          className="form-input"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      </div>
    );

  return (
    <input
      type={props.type}
      className="form-input"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}
