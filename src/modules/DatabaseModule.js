
module.exports = (function () {

  var module = {}

  const toGoRef = firebase.database().ref('togo')
  const db = firebase.database()
  const flagsRef = firebase.database().ref('flags')

  module.addToGo = function (togo) {
    return toGoRef.push(togo)
  }

  module.majToGo = function (togo) {
    toGoRef.child(togo.key).update(togo)
  }

  module.getData = function (node) {
    return db.ref(node).once('value')
  }

  module.deleteTogo = function (key) {
    toGoRef.child(key).remove()
  }

  return module
})()
