const pool = require("./db_connect")

module.exports = function() {
  return {
    //Master인지 체크 해야함
    acceptUser: function(appliedId, callback) {
      pool.getConnection(function(err, con) {
        let sql = "UPDATE user_group_apply SET accepted = true WHERE id = ?"
        con.query(sql, appliedId, function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    applyUserToGroup: function(userId, groupId, callback) {
      pool.getConnection(function(err, con) {
        let sql =
          "INSERT INTO user_group_apply (user_id, group_id) VALUES (?, ?)"
        con.query(sql, [userId, groupId], function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    showUsersApplied : function(groupId, callback) {
      pool.getConnection(function(err, con) {
        let sql = 'SELECT uga.id, user_id as userId, username, group_id as groupId FROM user_group_apply uga INNER JOIN user u ON uga.user_id = u.id WHERE group_id = ? and accepted = false';
        con.query(sql, [groupId], function(error, rows, fields) {
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
