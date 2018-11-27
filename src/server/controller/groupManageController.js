const group = require("../db/group")()
const userGroup = require("../db/user_group")()
const groupApply = require("../db/user_group_apply")()

module.exports.editDescription = function(req, res) {
  console.log(`group : ${req.body}`)
  group.addDescription(req.params.groupId, req.body.description, function(err, result) {
    res.status(200).json({ success: true })
  })
}

module.exports.expelUser = function(req, res) {
  console.log(`remove group : ${req.params.groupId} user - ${req.params.userId}`);
  userGroup.remove(req.params.userId, req.params.groupId, function(err, result) {
    res.status(200).json({ success : true });
  })
}

module.exports.applyGroup = function(req, res) {
  groupApply.applyUserToGroup(req.session.user.id, req.params.groupId, function(err, result) {
    res.status(200).json({ success : true });
  })
}

module.exports.showUsersApplied = function(req, res) {
  groupApply.showUsersApplied(req.params.groupId, function(err, appliedUsers) {
    res.status(200).json({ users: appliedUsers })
  })
}

module.exports.acceptUser = function(req, res) {
  console.log(`accept : ${req.params.id}`)
  groupApply.acceptUser(req.params.id, function(error, results) {
    userGroup.saveUserToGroup(req.params.userId, req.params.groupId, function(err, result) {
      res.status(200).json({ accept: true })
    })
  })
}
