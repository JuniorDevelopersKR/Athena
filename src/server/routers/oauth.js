const express = require("express")
const passport = require("passport")
const KakaoStrategy = require("passport-kakao")
const NaverStrategy = require("passport-naver")
const FacebookStrategy = require("passport-facebook")

const sql = require("../db/db_sql")()
const secret = require("../db/.secret")

const router = express.Router()

router.post("/facebook", function(req, res, next) {
  sql.signIn(req.body, function(err, user) {
    if (err) {
      next(err)
    }
    console.log(user)
    //userInfo를 session에 저장
    //다음 요청부터 request.session.user로 사용할 수 있다.
    req.session.user = user
    res.status(200).json({ user: user })
  })
})

module.exports = router
