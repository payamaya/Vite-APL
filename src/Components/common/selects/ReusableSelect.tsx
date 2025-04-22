import React from 'react'
import { ReusableSelectProps } from './ReusableSelectProps'

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  error,
  options,
}) => {
  return (
    <div>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <select
        className={`form-select ${error ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value=''>-- Select --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

export default ReusableSelect
