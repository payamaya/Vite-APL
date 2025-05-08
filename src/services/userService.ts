import { IUser } from '../interfaces/components/entities/IUser'
import createEntityService from './entityServiceFactory'
// BUG change student to user url controller!!!!!!
// SO the admin can see all user
const usersService = createEntityService<IUser>('student')

export const userService = {
  getAllUsers: usersService.getAll,
  getUserById: usersService.getById,
  createUser: usersService.create,
  updateUser: usersService.update,
  deleteUser: usersService.delete,
}
