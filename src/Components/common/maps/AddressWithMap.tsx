import { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface AddressWithMapProps {
  address: string
  className?: string
  apiKey?: string
}

export const AddressWithMap = ({
  address,
  className = '',
  //TODO Must add apiKey
  apiKey = 'YOUR_GOOGLE_MAPS_API_KEY',
}: AddressWithMapProps) => {
  const [showMap, setShowMap] = useState(false)

  if (!address) return <p className='text-gray-500'>No address provided</p>

  return (
    <div className={`mt-2 ${className}`}>
      {/* Clickable Address */}
      <button
        onClick={() => setShowMap(!showMap)}
        className='flex items-center text-blue-600 hover:text-blue-800 transition-colors'
        aria-label='View address on map'
      >
        <FaMapMarkerAlt className='w-4 h-4 mr-2' />
        <span className='text-light'>{address}</span>
      </button>

      {/* Map Iframe - Only shown when clicked */}
      {showMap && (
        <div className='mt-3 rounded-lg overflow-hidden'>
          <iframe
            width='100%'
            height='250'
            frameBorder='0'
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}`}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='rounded-lg'
            aria-label='Google Maps view'
          />
        </div>
      )}
    </div>
  )
}
