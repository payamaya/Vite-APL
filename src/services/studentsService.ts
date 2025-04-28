// import { ApiResponse } from '../interfaces/components/ApiResponse'
// import apiService from '../api/apiService'

// const studentService = {
//   getAllStudents<T>(): Promise<ApiResponse<T>> {
//     console.log('Fetching all students')
//     return apiService.getAll<T>('student')
//   },

//   getStudentById<T>(studentId: string): Promise<ApiResponse<T>> {
//     if (!studentId) throw new Error('Student ID is required')
//     console.log(`Fetching student with ID: ${studentId}`)
//     return apiService.getById<T>('student', studentId)
//   },

//   createStudent: async <T>(data: T): Promise<ApiResponse<T>> => {
//     try {
//       console.log('Creating student with data:', data)
//       const response = await apiService.create<T, T>('student', data)
//       console.log('Student created successfully:', response)
//       return response
//     } catch (error) {
//       console.error('Error creating student:', error)
//       throw error
//     }
//   },

//   updateStudent: async <T>(
//     studentId: string,
//     studentData: T
//   ): Promise<ApiResponse<T>> => {
//     try {
//       if (!studentId) throw new Error('Student ID is required for update')
//       console.log(`Updating student ${studentId} with:`, studentData)
//       const response = await apiService.update<T, T>(
//         'student',
//         studentId,
//         studentData
//       )
//       console.log('Student updated successfully:', response)
//       return response
//     } catch (error) {
//       console.error(`Error updating student ${studentId}:`, error)
//       throw error
//     }
//   },

//   deleteStudent: async <T>(studentId: string): Promise<ApiResponse<T>> => {
//     try {
//       if (!studentId) throw new Error('Student ID is required for deletion')
//       console.log(`Deleting student with ID: ${studentId}`)
//       const response = await apiService.delete<T>('student', studentId)
//       console.log('Student deleted successfully:', response)
//       return response
//     } catch (error) {
//       console.error(`Error deleting student ${studentId}:`, error)
//       throw error
//     }
//   },
// }

// export default studentService
// src/services/studentService.ts
// src/services/studentsService.ts
import createEntityService from './entityServiceFactory'
import { IStudent } from '../interfaces/components/IStudent'

const baseService = createEntityService<IStudent>('student')

export default {
  getAllStudents: baseService.getAll,
  getStudentById: baseService.getById,
  createStudent: baseService.create,
  updateStudent: baseService.update,
  deleteStudent: baseService.delete,
}
