// src/interfaces/IStudent.ts
import { IPerson } from './IPerson'

export interface IStudent extends IPerson {
  label?: string
  // Inherits all person properties
}
