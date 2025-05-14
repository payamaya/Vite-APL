import { useEffect, useState } from 'react'
import { useStudentManagement, useDeleteHandler } from '../../hooks'

import { studentService } from '../../services'
import { studentFields } from '../../Components/common/forms/studentField'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'

import { useNotification } from '../../context/NotificationContext'
// import { formatDate } from '../../utils/dateUtils'
import { IStudent } from '../../interfaces/components/entities/IStudent'
import { FaCalendar, FaEnvelope, FaPhone } from 'react-icons/fa'
import ResourceList from './ResourceList'

const AdminManageStudent = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    students,
    setStudents,
    currentStudent,
    setCurrentStudent,
    handleSubmit,
  } = useStudentManagement()

  const {
    deletingId,
    error: deleteError,
    deleteItem,
  } = useDeleteHandler<IStudent>(
    studentService.deleteStudent,
    setStudents,
    students
  )

  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const response = await studentService.getAllStudents()
        setStudents(
          Array.isArray(response.data)
            ? response.data.sort((a, b) => a.name?.localeCompare(b.name))
            : []
        )
      } catch (err) {
        setError(`${err}: Failed to load students`)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [setStudents])

  return (
    <>
      <div className='d-flex justify-content-evenly align-items-center mb-3'>
        <GoBackButton />
        <ReusableButton
          onClick={() => {
            setCurrentStudent(null)
            setIsModalOpen(true)
          }}
          theme='light'
          label='Add Student'
        />
      </div>

      <section className='border border-2 border-primary rounded'>
        <ResourceList
          items={students}
          loading={loading}
          error={error || deleteError}
          emptyMessage='No students available'
          keyExtractor={(student) => student.id}
          renderItem={(student) => (
            <>
              <section className='p-4 my-4 border rounded-4 shadow-sm bg-light'>
                {/* Student avatar and details */}
                <div className='d-flex flex-column flex-md-row gap-4'>
                  <div className='text-center'>
                    <div
                      className='bg-secondary rounded-circle d-flex align-items-center justify-content-center'
                      style={{ width: '100px', height: '100px' }}
                    >
                      <span className='text-white fs-4'>
                        {student.firstName.charAt(0)}
                        {student.lastName.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Student Info Section */}
                  <div className='flex-grow-1'>
                    {/* Name Row */}
                    <div className='d-flex flex-column flex-md-row gap-3 mb-3'>
                      <div className='flex-grow-1'>
                        <h3 className='fw-bold text-dark mb-1'>
                          <span className='text-muted small d-block'>
                            First Name
                          </span>
                          {student.firstName}
                        </h3>
                      </div>
                      <div className='flex-grow-1'>
                        <h3 className='fw-bold text-dark mb-1'>
                          <span className='text-muted small d-block'>
                            Last Name
                          </span>
                          {student.lastName}
                        </h3>
                      </div>
                    </div>

                    {/* Address Map - Conditional */}
                    {/* {student.address && (
                        <div className='mb-3'>
                          <AddressWithMap
                            address={student.address}
                            className='border rounded p-2 bg-white'
                          />
                        </div>
                      )} */}

                    {/* Contact Information */}
                    <div className='border-top pt-3'>
                      <div className='d-flex align-items-center mb-2'>
                        <FaPhone className='text-primary me-2' />
                        <a
                          href={`tel:${student.telephone}`}
                          className='text-decoration-none text-dark'
                        >
                          {student.telephone}
                        </a>
                      </div>
                      <div className='d-flex align-items-center mb-2'>
                        <FaEnvelope className='text-primary me-2' />
                        <a
                          href={`mailto:${student.email}`}
                          className='text-decoration-none text-dark'
                          onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `mailto:${student.email}?subject=Contact from Website&body=Hello ${student.firstName},`
                          }}
                        >
                          {student.email}
                        </a>
                      </div>
                      <div className='d-flex align-items-center'>
                        <FaCalendar className='text-primary me-2' />
                        <span className='text-dark'>
                          {student.createdAt
                            ? new Date(student.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )
                            : 'No date available'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className='d-flex justify-content-evenly gap-2 ms-3'>
                <ReusableButton
                  onClick={async () => {
                    const deleted = await deleteItem(
                      student.id,
                      'Are you sure you want to delete this student?'
                    )
                    if (deleted) {
                      showNotification({
                        message: 'Student deleted successfully!',
                        variant: 'danger',
                      })
                    }
                  }}
                  theme='light'
                  className='bg-danger text-white w-50'
                  disabled={deletingId === student.id}
                  loading={deletingId === student.id}
                  label='Delete Student'
                />
                <ReusableButton
                  onClick={() => {
                    setCurrentStudent(student)
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
        <ResourceManager<IStudent>
          fields={studentFields}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            const success = await handleSubmit(data)
            if (success) setIsModalOpen(false)
          }}
          initialData={currentStudent || undefined}
          title={currentStudent ? 'Edit Student' : 'Create New Student'}
        />
      </section>
    </>
  )
}

export default AdminManageStudent
