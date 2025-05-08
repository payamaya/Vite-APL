// src/constants/navigation.ts
import { ROLES } from '../constants/RolesEnum'
import { NavItem } from '../interfaces/components/NavbarInterfaces'

export const NAV_BRAND = 'My E-Learning Platform'

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: 'Home', link: '/', role: null },
  { label: 'About', link: '/about', role: null },
  { label: 'Courses', link: '/courses', role: null },
]

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', link: '/admin/courses', role: ROLES.ADMIN },
  { label: ' Manage Courses', link: '/admin', role: ROLES.ADMIN },
  { label: 'Manage Teachers', link: '/admin/teachers', role: ROLES.ADMIN },
  { label: 'Manage Students', link: '/admin/students', role: ROLES.ADMIN },
  //TODO Change the link address to the correct address
  { label: 'Manage Users', link: '#', role: ROLES.ADMIN },
]

export const TEACHER_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', link: '/teacher/dashboard', role: ROLES.TEACHER },
  { label: 'My Courses', link: '/teacher/courses', role: ROLES.TEACHER },
  { label: 'Notice', link: '/teacher/notices', role: ROLES.TEACHER },
  { label: 'FQA', link: '/teacher/fqa', role: ROLES.TEACHER },
  { label: 'Settings', link: '/teacher/settings', role: ROLES.TEACHER },
  { label: 'About', link: '/teacher/about', role: ROLES.TEACHER },
]

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', link: '/student/dashboard', role: ROLES.STUDENT },
  { label: 'My Courses', link: '/student/courses', role: ROLES.STUDENT },
]
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: 'Privacy', link: '/privacy', role: null },
  { label: 'Terms', link: '/terms', role: null },
  { label: 'Support', link: '/support', role: null },
]
