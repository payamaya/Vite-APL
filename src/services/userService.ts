import { IUser } from '../interfaces/components/entities/IUser'
import createEntityService from './entityServiceFactory'
// BUG May need to change "student" to "user" url controller!!!!!!
// SO the admin can see all user
const usersService = createEntityService<IUser>('user')

export const userService = {
  getAllUsers: usersService.getAll,
  getUserById: usersService.getById,
  createUser: usersService.create,
  updateUser: usersService.update,
  deleteUser: usersService.delete,
}
