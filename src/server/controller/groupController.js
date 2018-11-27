const group = require("../db/group")()
const userGroup = require("../db/user_group")()

//로그인한 유저의 그룹을 응답
module.exports.showGroupOfUser = function(req, res) {
  userGroup.findGroupByUserId(req.session.user.id, function(err, result) {
    res.status(200).json({ groups: result })
  })
}

module.exports.make = function(req, res) {
  console.log(`group : ${req.body}`)
  console.log(`user id : ${req.session.user.id}`)
  group.make(req.body, req.session.user.id, function(err, result) {
    userGroup.saveUserToGroup(req.session.user.id, result.insertId, function(error, rows) {
      group.show(result.insertId, function(showErr, data) {
        res.status(201).json(data[0])
      })
    })
  })
}

//그룹 전체를 응답
module.exports.showAll = function(req, res) {
  group.findAll(req.session.user.id, function(err, result) {
    res.status(200).json({ groups: result })
  })
}

module.exports.findUsers = function(req, res) {
  console.log(`group : ${req.params.groupId} userList`)
  userGroup.findByGroupId(req.params.groupId, function(err, result) {
    res.status(200).json({ users: result })
  })
}
