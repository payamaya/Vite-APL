import React from 'react'
import Cards from '../Components/Cards'

const About = () => {
  return (
    <section>
      <h1>About</h1>
      <Cards
        imgSrc={'/public/LTU-tenta.png'}
        title={'About Title'}
        text={'About'}
        buttonLink={'https://getbootstrap.com/docs/5.3/components/card/'}
      />
    </section>
  )
}

export default About
