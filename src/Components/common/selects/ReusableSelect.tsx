import { ReusableSelectProps } from './ReusableSelectProps'

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  name,
  value,
  onChange,
  required,
  error,
  options,
}) => {
  return (
    <div>
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
