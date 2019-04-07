import React from 'react'
import { shallow } from 'enzyme'
import ContentContainer from './index'
import SpinContainer from '../SpinContainer/index'

describe('ContentContainer', () => {
  let wrapper = null

  it('정상적으로 렌더링이 된다.', () => {
    wrapper = shallow(
      <ContentContainer>
        <SpinContainer />
      </ContentContainer>
    )
  })

  it('스냅샷과 매칭이 된다.', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('자식컴포넌트를 정상적으로 랜더링 한다.', () => {
    expect(wrapper.children()).not.toBeNull()
  })
})
