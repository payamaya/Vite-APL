import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useTeacherManagement } from '../../hooks/useTeacherManagement'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import teacherService from '../../services/teacherService'
import { teacherFields } from '../../Components/common/forms/teacherFields'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'

import { useNotification } from '../../context/NotificationContext'
import { ITeacher } from '../../interfaces/components/ITeacher'

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
                  <div className='mb-4'>
                    <h3 className='fw-bold text-dark mb-1'>{teacher.name}</h3>
                    <h3 className='fw-bold text-dark mb-1'>{teacher.title}</h3>
                    <h3 className='fw-bold text-dark mb-1'>TeacherType:{teacher.teacherType}</h3>
                    <p className='text-secondary mb-0'>{teacher.email}</p>
                    <h3 className='fw-bold text-dark mb-1'>{teacher.telephone}</h3>
                  </div>

                  {/* <div className='row g-3'>
                    <div className='col-md-6'>
                      <div className='bg-white border rounded-4 p-3 shadow-sm h-100'>
                        <div className='mb-1 text-muted text-uppercase small'>
                          Start Date
                        </div>
                        <div className='fw-semibold text-dark'>
                          {formatDate(teacher.startDate)}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='bg-white border rounded-4 p-3 shadow-sm h-100'>
                        <div className='mb-1 text-muted text-uppercase small'>
                          End Date
                        </div>
                        <div className='fw-semibold text-dark'>
                          {formatDate(teacher.endDate)}
                        </div>
                      </div>
                    </div>
                  </div> */}
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
