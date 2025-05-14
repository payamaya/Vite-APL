export interface ReusableSelectProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  error?: string
  options: { label: string; value: string }[]
}
