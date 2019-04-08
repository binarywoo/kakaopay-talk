import React from 'react'
import { shallow } from 'enzyme'
import MessageImage from './MessageImage'
import { DUMMY_IMG_URL } from '../../constants/testConstants'

describe('MessageImage', () => {
  let component = null
  const dummyImage = DUMMY_IMG_URL
  it('정상적으로 렌더링이 된다.', () => {
    component = shallow(<MessageImage src={dummyImage} />)
  })

  it('스냅샷과 일치한다.', () => {
    expect(component).toMatchSnapshot()
  })
})
