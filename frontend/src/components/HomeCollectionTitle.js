import React from 'react'

export default function HomeCollectionTitle(prop) {
  return (
    <div className='d-flex flex-column mt-5'>
        <h1 className='font-weight-bold'>{prop.title}</h1>
        <h4>{prop.des}</h4>
    </div>
  )
}
