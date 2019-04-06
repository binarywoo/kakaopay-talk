import { convertSnapshotToArr } from './daoUtils'

describe('daoUtils', () => {
  describe('convertSnapshotToArr', () => {
    it('works correctly', () => {
      const snapshot = { val: () => ({ test: { key: 'a', value: 'b' } }) }
      const arr = convertSnapshotToArr(snapshot)
      expect(arr[0].key).toEqual('a')
      expect(arr[0].value).toEqual('b')
    })
  })
})
