const pool = require("./db_connect")

module.exports = function() {
  return {
    findByUserId: function(userId, callback) {
      pool.getConnection(function(err, con) {
        if (err) {
          return callback(err)
        }
        let sql = "SELECT b.id as id, title, contents, f.id as fileId, filename FROM user_board b left join file f on f.id = b.file_id WHERE user_id = ?"
        con.query(sql, userId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("Success findByUserId from user_board")
          callback(null, result)
        })
      })
    },
    show: function(boardId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`user_board show error : ${err}`)
        console.log(`user_board id : ${boardId}`)
        let sql = "SELECT id, title, contents FROM user_board WHERE id = ?"
        con.query(sql, boardId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("success show user_board id")
          callback(null, result)
        })
      })
    },
    write: function(board, userId, fileId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`user_board write error : ${err}`)
        let sql = "INSERT INTO user_board (title, contents, user_id, file_id) VALUES (?, ?, ?, ?)"
        con.query(sql, [board.title, board.contents, userId, fileId], function(
          error,
          rows,
          fields
        ) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log(`id : ${rows.insertId}`)
          callback(null, rows)
        })
      })
    }
  }
}
