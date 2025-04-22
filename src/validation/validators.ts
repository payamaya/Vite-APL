export const Validators = {
  isValidEmail: (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isValidPassword: (password: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password),
}

export const ValidationMessage = {
  email: 'Email must be in a valid format ( e.g name@example.com).',
  password: `Password must contain:
  - At least 1 Uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 specail character (@, #, $, etc.)
  - Minimun 8 characters`,
}
