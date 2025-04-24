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
    USERS: 'users',
  },

  TEACHER: {
    ROOT: '/teacher',
    DASHBOARD: 'dashboard',
    COURSES: 'courses',
    NOTICES: 'notices',
  },

  STUDENT: {
    ROOT: '/student',
    DASHBOARD: 'dashboard',
    COURSES: 'courses',
    COURSE_DETAILS: '/courses/:courseId',
    MODULE_DETAILS: '/courses/:courseId/module/:moduleId',
  },

  NOT_FOUND: '*',
}
