import { convertSnapshotToArr, childSetAndReturnResult } from '../libs/daoUtils'

class UserDao {
  constructor(firebase) {
    this.ref = firebase.database().ref('users')
  }

  readUserByUserId = userId => {
    return this.ref
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then(snapshot => Promise.resolve(convertSnapshotToArr(snapshot)[0]))
  }

  readUser = userKey => {
    return this.ref
      .child(userKey)
      .once('value')
      .then(snapshot => {
        return Promise.resolve(snapshot.val())
      })
  }

  readAllUser = () => {
    return this.ref.once('value').then(snapshot => {
      return Promise.resolve(convertSnapshotToArr(snapshot))
    })
  }

  createUser = user => {
    const key = this.ref.push().key
    const newUser = Object.assign({}, user, { key })
    return childSetAndReturnResult(this.ref, key, newUser)
  }

  updateUser = (path, data) => {
    return this.ref.child(path).set(data)
  }
}

export default UserDao
