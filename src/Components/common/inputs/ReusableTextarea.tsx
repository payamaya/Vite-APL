import { FieldConfig } from '../../../interfaces/components/common/inputTypes'
import FieldFactory from './FieldFactory'

const config: FieldConfig = {
  componentType: 'textarea',
}

const ReusableTextarea = FieldFactory(config)
export default ReusableTextarea
