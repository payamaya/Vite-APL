import axios from 'axios'
import API_BASE_URL from './apiConfig'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
// GET all courses
export async function getAllCourses() {
  try {
    const response = await api.get(`/courses`)
    return response.data
  } catch (error) {
    console.log('Error fetching courses:', error)
    throw error
  }
}
// GET course by ID
export async function getCourseById(courseId: string) {
  try {
    const response = await api.get(`/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.log('Error fetching courseById', error)
    throw error
  }
}

// Create a new course
export async function createCourse(courseData: object) {
  try {
    const response = await api.post(`/course`, courseData)
    return response.data
  } catch (error) {
    console.log('Error creating a new course', error)
    throw error
  }
}

// update an existing course
export async function updateCourse(courseId: string, courseData: object) {
  try {
    const response = await api.put(`/course/${courseId}`, courseData)
    return response.data
  } catch (error) {
    console.log(`Error updating course with the ID ${courseId}`, error)
    throw error
  }
}

//Delete existing course by courseId
export async function deleteCourse(courseId: string) {
  try {
    const response = await api.delete(`/course/${courseId}`)
    return response.data
  } catch (error) {
    console.log(`Error deleting course with the ID:${courseId}`, error)
    throw error
  }
}
