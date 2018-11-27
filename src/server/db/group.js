const pool = require("./db_connect")

module.exports = function() {
  return {
    addDescription: function(groupId, description, callback) {
      pool.getConnection(function(err, con) {
        console.log(`add description error : ${err}`)
        let sql = "UPDATE groupinfo SET description = ? WHERE id = ?"
        con.query(sql, [description, groupId], function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    findAll: function(userId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`group find error : ${err}`)
        let sql =
          "select * from groupinfo where id not in (select group_id from user_group where user_id = ?) ;"
        con.query(sql, userId, function(error, rows, fields) {
          if (error) {
            return callback(error)
          }
          con.release()
          callback(null, rows)
        })
      })
    },
    make: function(data, userId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`group make error : ${err}`)
        console.log(`user : ${userId}`)
        let sql = "INSERT INTO groupinfo (name, groupMaster) VALUES (?, ?)"
        con.query(sql, [data.name, userId], function(error, rows, fields) {
          con.release()
          if (error) {
            console.log(`group make error2 : ${err}`)
            return callback(error)
          }
          console.log(`id : ${rows.insertId}`)
          callback(null, rows)
        })
      })
    },
    show: function(groupId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board show error : ${err}`)
        let sql = "SELECT id, name, description FROM groupinfo WHERE id = ?"
        con.query(sql, groupId, function(error, result, fields) {
          con.release()
          if (error) {
            return callback(error)
          }
          console.log("success show")
          callback(null, result)
        })
      })
    }
  }
}
