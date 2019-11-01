const myName = `my-local-data`
let myLocal = {
  getData () {
    return JSON.parse(window.sessionStorage.getItem(myName))
  },
  setData (user) {
    window.sessionStorage.setItem(myName, JSON.stringify(user.data.data))
  },
  delData () {
    window.sessionStorage.removeItem(myName)
  }
}
export default myLocal
