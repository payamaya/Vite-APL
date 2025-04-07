import { ReusableInputProps } from "../../../interfaces/components/common/inputTypes";
const ReusableInput: React.FC<ReusableInputProps> = ({
    label = '',
    name,
    type = 'text',
    value,
    placeholder = '',
    onChange,
    onBlur = () => {},
    error = '',
    required = false,
    autoFocus = false,
  }) => {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <input
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoFocus={autoFocus}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  };
  
  export default ReusableInput