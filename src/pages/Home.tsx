import Cards from '../Components/Cards'

const Home = () => {
  return (
    <section className='container'>
      <h1>Home</h1>
      <Cards
        imgSrc={'/public/read.png'}
        title={'Home Title'}
        text={'Home'}
        buttonLink={'https://getbootstrap.com/docs/5.3/components/card/'}
      />
    </section>
  )
}

export default Home
