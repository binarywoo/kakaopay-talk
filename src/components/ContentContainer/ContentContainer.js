import React from 'react'

const ContentContainer = ({ children, ...restProps }) => {
  return (
    <div className='content-container' {...restProps}>
      {children}
    </div>
  )
}

export default ContentContainer
