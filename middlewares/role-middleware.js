//사장님 권한 확인
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { userId, role } = res.locals.user;

    if (role !== 1) {
      return res
        .status(401)
        .json({ message: '사장님의 권한이 존재하지 않습니다' });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: '비정상적인 요청입니다.',
    });
  }
};
