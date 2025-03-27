import { Link } from 'react-router-dom'
// import Cards from '../Components/Cards'

const Courses = () => {
  const courses = [
    {
      courseID: '101',
      name: 'React Basics',
      img: '/public/LTU-tenta.png',
      des: 'This is the first item accordion body.</strong> It is  shown by default, until the collapse plugin adds the appropriate  classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables',
    },
    {
      courseID: '102',
      name: 'React Advanced',
      des: 'This is the first item accordion body.</strong> It is  shown by default, until the collapse plugin adds the appropriate  classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables',
    },
    {
      courseID: '103',
      name: 'Fullstack',
      des: 'This is the first item accordion body.</strong> It is  shown by default, until the collapse plugin adds the appropriate  classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables',
    },
  ]
  // GET ALL Course from backend => database fetch
  return (
    <section className='card'>
      <h1>The Course</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.courseID}>
            <Link to={`/courses/${course.courseID}`}>
              {/* <Cards
                imgSrc={'/public/LTU-tenta.png'}
                title={'About Title'}
                text={'About'}
                buttonLink={
                  'https://getbootstrap.com/docs/5.3/components/card/'
                }
              /> */}

              <section key={course.courseID}>
                <h3>{course.name}</h3>
                <p>{course.des}</p>
                <img
                  src={course.img}
                  alt=''
                  className='figure-img img-fluid rounded '
                />
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Courses
