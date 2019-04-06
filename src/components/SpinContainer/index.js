import React from 'react'
import { Spin } from 'antd'

const SpinContainer = ({ height = '47vh', size, tip }) => {
  return (
    <div
      style={{ textAlign: 'center', paddingTop: height, paddingBottom: height }}
    >
      <Spin size={size} tip={tip} />
    </div>
  )
}

export default SpinContainer
