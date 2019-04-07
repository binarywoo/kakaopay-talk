import UserDao from '../dao/UserDao'

class UserService {
  constructor(firebase) {
    this.firebase = firebase
    this.dao = new UserDao(firebase)
  }

  getUserByUserId = userId => {
    return this.dao.readUserByUserId(userId)
  }

  getUser = userKey => {
    return this.dao.readUser(userKey)
  }

  postUser = user => {
    return this.dao.createUser(user)
  }

  getAllUser = () => {
    return this.dao.readAllUser()
  }

  putUser = (path, data) => {
    return this.dao.updateUser(path, data)
  }
}

export default UserService
