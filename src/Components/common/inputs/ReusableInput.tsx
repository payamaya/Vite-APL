import { FieldConfig } from '../../../interfaces/components/common/inputTypes'
import FieldFactory from './FieldFactory'

const config: FieldConfig = {
  componentType: 'input',
}

const ReusableTextarea = FieldFactory(config)
export default ReusableTextarea
