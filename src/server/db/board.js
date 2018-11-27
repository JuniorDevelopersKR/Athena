const pool = require("./db_connect")

module.exports = function() {
  return {
    findByGroupId: function(groupId, callback) {
      pool.getConnection(function(err, con) {
        if (err) {
          return callback(err)
        }
        let sql =
          "SELECT b.id as id, title, contents, f.id as fileId, filename, user_id as userId, u.username as username , created_time as createdTime FROM board b left join file f on f.id = b.file_id join user u on u.id=b.user_id WHERE group_id = ?"
        con.query(sql, groupId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("success show")
          callback(null, result)
        })
      })
    },
    remove: function(boardId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board delete error : ${err}`)
        console.log(`board id : ${boardId}`)
        let sql = "DELETE FROM board WHERE id = ?"
        con.query(sql, boardId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("success delete board")
          callback(null, result)
        })
      })
    },
    show: function(boardId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board show error : ${err}`)
        console.log(`board id : ${boardId}`)
        let sql =
          "SELECT b.id, title, contents, group_id as groupId, file_id as fileId, username, created_time FROM board b, user u WHERE b.id = ? and u.id = b.user_id"
        con.query(sql, boardId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("success show")
          callback(null, result)
        })
      })
    },
    write: function(board, groupId, userId, fileId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board write error : ${err}`)
        let sql =
          "INSERT INTO board (title, contents, group_id, user_id, file_id) VALUES (?, ?, ?, ?, ?)"
        con.query(
          sql,
          [board.title, board.contents, groupId, userId, fileId],
          function(error, rows, fields) {
            con.release()
            if (error) {
              return callback(error)
            }
            console.log(`id : ${rows.insertId}`)
            callback(null, rows)
          }
        )
      })
    }
  }
}
