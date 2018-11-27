const pool = require("./db_connect")

module.exports = function() {
  return {
    findByGroupId: function(groupId, callback) {
      pool.getConnection(function(err, con) {
        let sql =
          "SELECT u.id, username, ug.group_id as groupId FROM user_group ug, user u WHERE ug.user_id = u.id and group_id = ?"
        con.query(sql, groupId, function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    findGroupByUserId: function(userId, callback) {
      pool.getConnection(function(err, con) {
        let sql =
          "SELECT g.id, g.name, g.groupMaster FROM user_group ug inner join groupinfo g on ug.group_id = g.id WHERE ug.user_id = ?"
        con.query(sql, userId, function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    remove: function(userId, groupId, callback) {
      pool.getConnection(function(err, con) {
        let sql = "DELETE FROM user_group WHERE user_id = ? and group_id=?"
        con.query(sql, [userId, groupId], function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    saveUserToGroup: function(userId, groupId, callback) {
      pool.getConnection(function(err, con) {
        let sql = "INSERT INTO user_group (user_id, group_id) VALUES (?, ?)"
        con.query(sql, [userId, groupId], function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    }
  }
}
