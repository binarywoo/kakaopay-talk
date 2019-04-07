import React from 'react'
import { shallow, mount } from 'enzyme'
import MessageImage from './MessageImage'

describe('MessageImage', () => {
  let component = null
  const dummyImage =
    'https://firebasestorage.googleapis.com/v0/b/hand-pokemon-2.appspot.com/o/workshopImages%2FXL6bftAQxqyLPFSStXcdAnW9aoPFncOW?alt=media&token=36cca2b9-0591-4ff3-b27f-0137a2126808'
  console.log(MessageImage)
  it('정상적으로 렌더링이 된다.', () => {
    component = shallow(<MessageImage src={dummyImage} />)
  })

  it('스냅샷과 매칭이 된다.', () => {
    expect(component).toMatchSnapshot()
  })
})
