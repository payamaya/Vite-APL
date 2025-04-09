import { BaseButtonProps } from '../../base/BaseButtonProps'

export interface LinkButtonProps extends BaseButtonProps {
  as: 'link' | 'navlink'
  to: string
}
export interface NormalButtonProps extends BaseButtonProps {
  as?: 'button'
  to?: string
}
export type ReusableButtonProps = LinkButtonProps | NormalButtonProps
