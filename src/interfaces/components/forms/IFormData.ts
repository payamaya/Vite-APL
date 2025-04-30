export interface IFormData {
  id?: string // Optional for edit scenarios
  name: string
  title: string
  description: string
  courseId?: string // Add this
  img?: string // Optional if you want to handle images
}
