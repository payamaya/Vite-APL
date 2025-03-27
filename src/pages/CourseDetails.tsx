const CourseDetails = () => {
  // Get course ID from the URL

  // List of modules
  const modules = [
    {
      moduleID: '101',
      Activity: 'Module 1',
      ActivityTitle: 'Design',
      ActivityType: 'Quiz',
      ActvityDetails:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis suscipit sequi eos doloremque. Voluptas reprehenderit fuga aliquam quo qui. Nam dolores earum ea odit quod iusto soluta enim voluptas excepturi!',
    },
    {
      moduleID: '102',
      ActivityTitle: 'Agil utveckling',
      Activity: 'Module 2',
      ActivityType: 'Video',
      ActvityDetails:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis suscipit sequi eos doloremque. Voluptas reprehenderit fuga aliquam quo qui. Nam dolores earum ea odit quod iusto soluta enim voluptas excepturi!',
    },
    {
      moduleID: '103',
      Activity: 'Module 3',
      ActivityTitle: 'Assignment',
      ActivityType: 'PDF File',
      ActvityDetails:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis suscipit sequi eos doloremque. Voluptas reprehenderit fuga aliquam quo qui. Nam dolores earum ea odit quod iusto soluta enim voluptas excepturi!',
    },
  ]
  // GET ALL modules from backend => database fetch

  return (
    <>
      <h2>Module </h2>
      {/* Bootstrap Accordion */}
      <div className='accordion' id='accordionExample'>
        {modules.map((module, index) => (
          <div className='accordion-item' key={module.moduleID}>
            <h2 className='accordion-header'>
              <button
                className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target={`#collapse${module.moduleID}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`collapse${module.moduleID}`}
              >
                <div className='p-3'>{module.Activity}</div>
                {module.ActivityTitle}
              </button>
            </h2>
            <div
              id={`collapse${module.moduleID}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              data-bs-parent='#accordionExample'
            >
              <div className='accordion-body'>
                <strong>{module.ActivityTitle}</strong> {/*TODO Activity */}
                <p>{module.ActvityDetails}</p>
                <div className='btn btn-info'>{module.ActivityType}</div>
                {/* <div className='btn btn-outline-danger'>Quiz</div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CourseDetails
