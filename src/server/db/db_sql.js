const pool = require("./db_connect")

module.exports = function() {
  return {
    signIn: function(userInfo, callback) {
      pool.getConnection(function(error, con) {
        console.log(error)
        var id
        let username
        let sql = "select * from user where provider_id = ?"
        con.query(sql, userInfo.id, function(err, result) {
          if (err) {
            con.release()
            return callback(err)
          }
          if (result.length === 0) {
            let signUpSql =
              "INSERT INTO user (username, provider, provider_id) VALUES(?, ?, ?)"
            con.query(
              signUpSql,
              [userInfo.username, userInfo.provider, userInfo.id],
              function(signUpErr, rows) {
                con.release()
                if (signUpErr) {
                  return callback(signUpErr)
                }
                id = rows.insertId
              }
            )
          } else {
            id = result[0].id
          }
          let user = {
            id: id,
            username: userInfo.username
          }
          callback(null, user)
        })
      })
    }
  }
}
