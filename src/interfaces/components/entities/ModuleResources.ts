export interface ModuleResource {
  id: string
  type: 'video' | 'document' | 'link' | 'quiz'
  url: string
  title: string
}
