import { Form } from 'antd'

export default ComposedComponent => {
  return Form.create()(ComposedComponent)
}
