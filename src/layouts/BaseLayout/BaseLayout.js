import React from 'react'
import { Layout } from 'antd'

import Header from './Header'
import './index.less'

const BaseLayout = props => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div className='base-container'>
        <Header />
        {props.children}
      </div>
    </Layout>
  )
}

export default BaseLayout
