const pool = require("./db_connect")

module.exports = function() {
  return {
    create: (userId, roomName, callback) => {
      pool.getConnection((err, con) => {
        console.log(`create Room err : ${err}`)
        con.beginTransaction(err2 => {
          if (err2) {
            con.rollback(function() {
              return callback(err2)
            })
          }
          let insertRoom = "INSERT INTO room (name) VALUES (?)"
          con.query(insertRoom, [roomName], (error, result) => {
            if (error) {
              con.rollback(function() {
                con.release()
                return callback(error)
              })
            }
            console.log(`room number : ${result.insertId}`)
            let userToRoom =
              "INSERT INTO user_room (user_id, room_id) VALUES (?, ?)"
            con.query(userToRoom, [userId, result.insertId], (error3, rows) => {
              if (error3) {
                con.release()
                con.rollback(function() {
                  return callback(error3)
                })
              }
              con.commit(function(err4) {
                if (err4) {
                  con.rollback(function() {
                    con.release()
                    return callback(err4)
                  })
                }
              })
            })
            callback(null, result.insertId)
          })
        })
      })
    }
  }
}
