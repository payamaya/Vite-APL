// src/routes/routePaths.ts

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:courseId',
  MODULE_DETAILS: '/courses/:courseId/module/:moduleId',

  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: 'dashboard',
    COURSES: 'courses',
    COURSE_DETAILS: '/admin/courses/:courseId',
    MANAGE_TEACHER: '/admin/teachers',
    MANAGE_TEACHER_DETAILS: '/admin/teachers/:courseId',
    MODULE_DETAILS: '/admin/courses/:courseId/module/:moduleId',
    USERS: 'users',
  },

  TEACHER: {
    ROOT: '/teacher',
    DASHBOARD: 'dashboard',
    COURSES: 'courses',
    COURSE_DETAILS: '/teacher/courses/:courseId',
    MODULE_DETAILS: '/teacher/courses/:courseId/module/:moduleId',
    NOTICES: 'notices',
  },

  STUDENT: {
    ROOT: '/student',
    DASHBOARD: 'dashboard',
    COURSES: 'courses',
    COURSE_DETAILS: '/student/courses/:courseId',
    MODULE_DETAILS: '/student/courses/:courseId/module/:moduleId',
  },

  NOT_FOUND: '*',
}
