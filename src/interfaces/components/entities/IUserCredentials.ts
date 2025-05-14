export interface IUserCredentials {
  passwordHash: string
  refreshToken?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}
