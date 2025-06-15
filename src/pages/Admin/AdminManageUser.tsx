import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useUserManagement, useDeleteHandler } from '../../hooks'
import { userService } from '../../services'
import { userFields } from '../../Components/common/forms/userFields'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'

import { useNotification } from '../../context/useNotification'
// import { formatDate } from '../../utils/dateUtils'
import { IUser } from '../../interfaces/components/entities'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import ResourceList from './ResourceList'
// import { AddressWithMap } from '../../Components/common/maps/AddressWithMap'

const AdminManageUser = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { users, setUsers, currentUser, setCurrentUser, handleSubmit } =
    useUserManagement()

  const {
    deletingId,
    error: deleteError,
    deleteItem,
  } = useDeleteHandler<IUser>(userService.deleteUser, setUsers, users)

  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await userService.getAllUsers()
        setUsers(
          Array.isArray(response.data)
            ? response.data.sort((a, b) =>
                `${a.firstName} ${a.lastName}`.localeCompare(
                  `${b.firstName} ${b.lastName}`
                )
              )
            : []
        )
      } catch (err) {
        setError(`${err}: Failed to load users`)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [setUsers])

  return (
    <>
      <div className='d-flex justify-content-evenly align-items-center mb-3'>
        <GoBackButton />
        <ReusableButton
          onClick={() => {
            setCurrentUser(null)
            setIsModalOpen(true)
          }}
          theme='light'
          label='Add User'
        />
      </div>

      <section className='border border-2 border-primary rounded'>
        <ResourceList
          items={users}
          loading={loading}
          error={error || deleteError}
          emptyMessage='No users available'
          keyExtractor={(user) => user.id}
          renderItem={(user) => (
            <>
              <section className='p-4 my-4 border rounded-4 shadow-sm bg-light'>
                <div className='d-flex flex-column flex-md-row gap-4'>
                  {/* Avatar Section - Placeholder for future implementation */}
                  <div className='text-center'>
                    <div
                      className='bg-secondary rounded-circle d-flex align-items-center justify-content-center'
                      style={{ width: '100px', height: '100px' }}
                    ></div>
                  </div>

                  {/* User Info Section */}
                  <div className='flex-grow-1'>
                    {/* Name Row */}
                    <div className='d-flex flex-column flex-md-row gap-3 mb-3'>
                      <div className='flex-grow-1'>
                        <h3 className='fw-bold text-dark mb-1'>
                          <span className='text-muted small d-block'>
                            First Name
                          </span>
                          {user.firstName}
                        </h3>
                      </div>
                      <div className='flex-grow-1'>
                        <h3 className='fw-bold text-dark mb-1'>
                          <span className='text-muted small d-block'>
                            Last Name
                          </span>
                          {user.lastName}
                        </h3>
                      </div>
                    </div>

                    {/* Profession */}
                    <div className='mb-3'>
                      <h4 className='text-dark'>
                        <span className='text-muted small d-block'>
                          Profession
                        </span>
                        <span className='badge bg-primary'>
                          {user.userType}
                        </span>
                      </h4>
                    </div>

                    {/* Address Map - Conditional */}
                    {/* {user.address && (
                        <div className='mb-3'>
                          <AddressWithMap
                            address={user.address}
                            className='border rounded p-2 bg-white'
                          />
                        </div>
                      )} */}

                    {/* Contact Information */}
                    <div className='border-top pt-3'>
                      <div className='d-flex align-items-center mb-2'>
                        <FaPhone className='text-secondary me-2' />
                        <a
                          href={`tel:${user.telephone}`}
                          className='text-decoration-none text-dark'
                        >
                          {user.telephone}
                        </a>
                      </div>
                      <div className='d-flex align-items-center'>
                        <FaEnvelope className='text-secondary me-2' />
                        <a
                          href={`mailto:${user.email}`}
                          className='text-decoration-none text-dark'
                          onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `mailto:${user.email}?subject=Contact from Website&body=Hello ${user.firstName},`
                          }}
                        >
                          {user.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className='d-flex justify-content-evenly gap-2 ms-3'>
                <ReusableButton
                  onClick={async () => {
                    const deleted = await deleteItem(
                      user.id,
                      'Are you sure you want to delete this user?'
                    )
                    if (deleted) {
                      showNotification({
                        message: 'User deleted successfully!',
                        variant: 'danger',
                      })
                    }
                  }}
                  theme='light'
                  className='bg-danger text-white w-50'
                  disabled={deletingId === user.id}
                  loading={deletingId === user.id}
                  label='Delete User'
                />
                <ReusableButton
                  onClick={() => {
                    setCurrentUser(user)
                    setIsModalOpen(true)
                  }}
                  theme='light'
                  className='bg-primary text-white w-50'
                  label='Edit'
                />
              </div>
            </>
          )}
        />

        <ResourceManager<IUser>
          fields={userFields}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            const success = await handleSubmit(data)
            if (success) setIsModalOpen(false)
          }}
          initialData={currentUser || undefined}
          title={currentUser ? 'Edit User' : 'Create New User'}
        />
      </section>
    </>
  )
}

export default AdminManageUser
