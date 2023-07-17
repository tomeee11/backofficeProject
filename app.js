const express = require('express');
const app = express();
const PORT = 3003;

const OrderRouter = require('./routes/menus.route');

app.use(express.json());

app.use('/', OrderRouter);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
