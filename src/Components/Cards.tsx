import React from 'react'

interface CardProps {
  imgSrc: string
  title: string
  text: string
  buttonLink: string
  buttonText?: string
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  title,
  text,
  buttonLink,
  buttonText = 'Go somewhere',
}) => {
  return (
    <section>
      <div className='card' style={{ width: '18rem' }}>
        <img src={imgSrc} className='card-img-top' alt={title} />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{text}</p>
          <a href={buttonLink} className='btn btn-dark'>
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Card
