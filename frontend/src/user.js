const allUsers = []
class User{
  constructor({id,name}){
    this.id = id
    this.name = name
    allUsers.push(this)
  }
}
