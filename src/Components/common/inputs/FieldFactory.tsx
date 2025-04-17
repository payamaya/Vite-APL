import {
  FieldConfig,
  InputFieldProps,
  TextareaFieldProps,
} from '../../../interfaces/components/common/inputTypes'

const FieldFactory = ({ componentType, defaultRows = 3 }: FieldConfig) => {
  if (componentType === 'input') {
    return function InputField({
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
      ...restProps
    }: InputFieldProps) {
      return (
        <div className='mb-3'>
          {label && (
            <label htmlFor={name} className='form-label'>
              {label}
            </label>
          )}
          <input
            className={`form-control ${error ? 'is-invalid' : ''}`}
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            autoFocus={autoFocus}
            {...restProps}
          />
          {error && <div className='invalid-feedback'>{error}</div>}
        </div>
      )
    }
  }

  return function TextareaField({
    label = '',
    name,
    value,
    placeholder = '',
    onChange,
    onBlur = () => {},
    error = '',
    required = false,
    autoFocus = false,
    rows = defaultRows,
    ...restProps
  }: TextareaFieldProps) {
    return (
      <div className='mb-3'>
        {label && (
          <label htmlFor={name} className='form-label'>
            {label}
          </label>
        )}
        <textarea
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoFocus={autoFocus}
          rows={rows}
          {...restProps}
        />
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    )
  }
}

export default FieldFactory
