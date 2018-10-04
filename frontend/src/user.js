const allUsers = []
class User {
  constructor({
    id,
    name
  }) {
    this.id = id
    this.name = name
    allUsers.push(this)
  }

  static findByName(name){
    return allUsers.find(function(user){
      return user.name == name
    })
  }
}
