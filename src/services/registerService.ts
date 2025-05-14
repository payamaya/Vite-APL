import { IUser } from '../interfaces/components/entities'
import createEntityService from './entityServiceFactory'

const registersService = createEntityService<IUser>('auth/register')

export const registerService = {
  getAllRegisters: registersService.getAll,
  getRegisterById: registersService.getById,
  createRegister: registersService.create,
  updateRegister: registersService.update,
  deleteRegister: registersService.delete,
}
