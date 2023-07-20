const express = require('express');
const { Users } = require('../models');
const router = express.Router();
const jwt = require('jsonwebtoken');

const setUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (user) {
    res.locals.user = {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
    };
  }

  next();
};

// 회원가입
router.post('/users', setUser, async (req, res) => {
  const { email, password, nickname } = req.body;
  const isExistUser = await Users.findOne({ where: { email } });

  if (isExistUser) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }

  // Users 테이블에 사용자를 추가합니다.
  const user = await Users.create({ email, password, nickname });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

// 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
  } else if (user.password !== password) {
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
  }

  const token = jwt.sign(
    {
      userId: user.userId,
    },
    'customized_secret_key'
  );
  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({ message: '로그인 성공' });
});

module.exports = router;
