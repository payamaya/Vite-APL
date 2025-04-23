// src/constants/navigation.ts
import { NavItem } from '../interfaces/components/NavbarInterfaces'

export const NAV_BRAND = 'My E-Learning Platform'

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: 'Home', link: '/', role: 'all' },
  { label: 'About', link: '/about', role: 'all' },
  { label: 'Courses', link: '/courses', role: 'all' },
]

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', link: '/admin/dashboard', role: 'admin' },
  { label: 'Manage Courses', link: '/admin/courses', role: 'admin' },
  { label: 'Manage Teachers', link: '/admin/teachers', role: 'admin' },
]

export const TEACHER_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', link: '/teacher/dashboard', role: 'teacher' },
  { label: 'My Courses', link: '/teacher/courses', role: 'teacher' },
  { label: 'Notice', link: '/teacher/notices', role: 'teacher' },
  { label: 'FQA', link: '/teacher/fqa', role: 'teacher' },
  { label: 'Settings', link: '/teacher/settings', role: 'teacher' },
  { label: 'About', link: '/teacher/about', role: 'teacher' },
]

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', link: '/student/dashboard', role: 'student' },
  { label: 'My Courses', link: '/student/courses', role: 'student' },
]
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: 'Privacy', link: '/privacy', role: 'all' },
  { label: 'Terms', link: '/terms', role: 'all' },
  { label: 'Support', link: '/support', role: 'all' },
]
