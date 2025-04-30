import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useTeacherManagement, useDeleteHandler } from '../../hooks'
import { teacherService } from '../../services'
import { teacherFields } from '../../Components/common/forms/teacherFields'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'

import { useNotification } from '../../context/NotificationContext'
// import { formatDate } from '../../utils/dateUtils'
import { ITeacher } from '../../interfaces/components/entities'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { AddressWithMap } from '../../Components/common/maps/AddressWithMap'
// import { AddressWithMap } from '../../Components/common/maps/AddressWithMap'

const AdminManageTeacher = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    teachers,
    setTeachers,
    currentTeacher,
    setCurrentTeacher,
    handleSubmit,
  } = useTeacherManagement()

  const {
    deletingId,
    error: deleteError,
    deleteItem,
  } = useDeleteHandler<ITeacher>(
    teacherService.deleteTeacher,
    setTeachers,
    teachers
  )

  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const response = await teacherService.getAllTeachers()
        setTeachers(
          Array.isArray(response.data)
            ? response.data.sort((a, b) => a.name.localeCompare(b.name))
            : []
        )
      } catch (err) {
        setError(`${err}: Failed to load teachers`)
      } finally {
        setLoading(false)
      }
    }
    fetchTeachers()
  }, [setTeachers])

  return (
    <>
      <div className='d-flex justify-content-evenly align-items-center mb-3'>
        <GoBackButton />
        <ReusableButton
          onClick={() => {
            setCurrentTeacher(null)
            setIsModalOpen(true)
          }}
          theme='light'
          label='Add Teacher'
        />
      </div>

      <section className='border border-2 border-primary rounded'>
        {loading && <p>Loading teachers...</p>}
        {error && <div className='alert alert-danger'>{error}</div>}
        {deleteError && <div className='alert alert-danger'>{deleteError}</div>}

        {teachers.length === 0 ? (
          <p className='text-danger fs-5 p-2'>There is no teacher available!</p>
        ) : (
          <ul className='list-group'>
            {teachers.map((teacher) => (
              <li
                key={teacher.id}
                className='list-group-item border rounded m-2'
              >
                <section className='p-4 my-4 border rounded-4 shadow-sm bg-light'>
                  <div className='d-flex flex-column flex-md-row gap-4'>
                    {/* Avatar Section - Placeholder for future implementation */}
                    <div className='text-center'>
                      <div
                        className='bg-secondary rounded-circle d-flex align-items-center justify-content-center'
                        style={{ width: '100px', height: '100px' }}
                      >
                        <span className='text-white fs-4'>
                          {teacher.firstName.charAt(0)}
                          {teacher.lastName.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Teacher Info Section */}
                    <div className='flex-grow-1'>
                      {/* Name Row */}
                      <div className='d-flex flex-column flex-md-row gap-3 mb-3'>
                        <div className='flex-grow-1'>
                          <h3 className='fw-bold text-dark mb-1'>
                            <span className='text-muted small d-block'>
                              First Name
                            </span>
                            {teacher.firstName}
                          </h3>
                        </div>
                        <div className='flex-grow-1'>
                          <h3 className='fw-bold text-dark mb-1'>
                            <span className='text-muted small d-block'>
                              Last Name
                            </span>
                            {teacher.lastName}
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
                            {teacher.teacherType}
                          </span>
                        </h4>
                      </div>

                      {/* Address Map - Conditional */}
                      {/* {teacher.address && (
                        <div className='mb-3'>
                          <AddressWithMap
                            address={teacher.address}
                            className='border rounded p-2 bg-white'
                          />
                        </div>
                      )} */}

                      {/* Contact Information */}
                      <div className='border-top pt-3'>
                        <div className='d-flex align-items-center mb-2'>
                          <FaPhone className='text-secondary me-2' />
                          <a
                            href={`tel:${teacher.telephone}`}
                            className='text-decoration-none text-dark'
                          >
                            {teacher.telephone}
                          </a>
                        </div>
                        <div className='d-flex align-items-center'>
                          <FaEnvelope className='text-secondary me-2' />
                          <a
                            href={`mailto:${teacher.email}`}
                            className='text-decoration-none text-dark'
                            onClick={(e) => {
                              e.preventDefault()
                              window.location.href = `mailto:${teacher.email}?subject=Contact from Website&body=Hello ${teacher.firstName},`
                            }}
                          >
                            {teacher.email}
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
                        teacher.id,
                        'Are you sure you want to delete this teacher?'
                      )
                      if (deleted) {
                        showNotification({
                          message: 'Teacher deleted successfully!',
                          variant: 'danger',
                        })
                      }
                    }}
                    theme='light'
                    className='bg-danger text-white w-50'
                    disabled={deletingId === teacher.id}
                    loading={deletingId === teacher.id}
                    label='Delete Teacher'
                  />
                  <ReusableButton
                    onClick={() => {
                      setCurrentTeacher(teacher)
                      setIsModalOpen(true)
                    }}
                    theme='light'
                    className='bg-primary text-white w-50'
                    label='Edit'
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        <ResourceManager<ITeacher>
          fields={teacherFields}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            const success = await handleSubmit(data)
            if (success) setIsModalOpen(false)
          }}
          initialData={currentTeacher || undefined}
          title={currentTeacher ? 'Edit Teacher' : 'Create New Teacher'}
        />
      </section>
    </>
  )
}

export default AdminManageTeacher
