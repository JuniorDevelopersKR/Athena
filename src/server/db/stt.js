const pool = require("./db_connect")

module.exports = function() {
  return {
    findByGroupId: function(groupId, callback) {
      pool.getConnection(function(err, con) {
        if (err) {
          return callback(err)
        }
        let sql =
          "SELECT b.id as id, title, contents, f.id as fileId, filename FROM stt_board b left join file f on f.id = b.file_id WHERE group_id = ?"
        con.query(sql, groupId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("Success findBygroupId from stt_board")
          callback(null, result)
        })
      })
    },
    show: function(boardId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`stt_board show error : ${err}`)
        console.log(`stt_board id : ${boardId}`)
        let sql =
          "SELECT b.id as id, title, contents, f.id as fileId, filename FROM stt_board b join file f on f.id = b.file_id WHERE b.id = ?"
        con.query(sql, boardId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("success show stt_board ")
          callback(null, result)
        })
      })
    },
    update: function(boardId, contents, callback) {
      pool.getConnection(function(err, con) {
        console.log(`stt_board update error : ${err}`)
        console.log(`stt_board id : ${boardId}`)
        let sql = "UPDATE stt_board SET contents = ? WHERE id = ?"
        con.query(sql, [contents, boardId], function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("success update stt_board ")
          callback(null, result)
        })
      })
    },
    write: function(title, contents, userId, groupId, fileId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`stt_board write error : ${err}`)
        let sql =
          "INSERT INTO stt_board (title, contents, user_id, group_id, file_id) VALUES (?, ?, ?, ?, ?)"
        con.query(sql, [title, contents, userId, groupId, fileId], function(
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
