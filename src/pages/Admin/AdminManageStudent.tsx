import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useStudentManagement } from '../../hooks/useStudentManagement'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import { studentService } from '../../services/studentService'
import { studentFields } from '../../Components/common/forms/studentField'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'

import { useNotification } from '../../context/NotificationContext'
// import { formatDate } from '../../utils/dateUtils'
import { IStudent } from '../../interfaces/components/entities/IStudent'

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
        {loading && <p>Loading students...</p>}
        {error && <div className='alert alert-danger'>{error}</div>}
        {deleteError && <div className='alert alert-danger'>{deleteError}</div>}

        {students.length === 0 ? (
          <p className='text-danger fs-5 p-2'>There is no student available!</p>
        ) : (
          <ul className='list-group'>
            {students.map((student) => (
              <li
                key={student.id}
                className='list-group-item border rounded m-2'
              >
                <section className='p-4 my-4 border rounded-4 shadow-sm bg-light'>
                  <div className='mb-4'>
                    <p className='fw-bold text-dark mb-1'>
                      {student.firstName}
                    </p>
                    <p className='fw-bold text-dark mb-1'>{student.lastName}</p>

                    <p className='text-secondary mb-0'>{student.email}</p>
                    <p className='text-secondary mb-0'>{student.address}</p>
                    <p className='text-secondary mb-0'>{student.telephone}</p>
                    <p className='text-secondary mb-0'>
                      {student.createdAt
                        ? new Date(student.createdAt).toLocaleString()
                        : 'No date'}
                    </p>
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
              </li>
            ))}
          </ul>
        )}

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
