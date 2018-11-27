const pool = require("./db_connect")

module.exports = function() {
  return {
    saveChat: function(userId, username, groupId, message, callback) {
      pool.getConnection(function(err, con) {
        let sql =
          "INSERT INTO chat (user_id, username, group_id, message) VALUES(?, ?, ?, ?)"
        con.query(sql, [userId, username, groupId, message], function(
          error,
          rows,
          fields
        ) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    showChatInGroup: function(groupId, callback) {
      pool.getConnection(function(err, con) {
        let sql =
          "SELECT user_id as userId, username, message, current_time as time FROM chat WHERE group_id = ?"
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
