let http = require('http');

http.get('http://www.nipic.com/photo/lvyou/guonei/index.html', res => {
  let data = '';
  res.on('data', buf => {
    // console.log(buf);
    data += buf.toString();
  });

  res.on('end', () => {
    console.log(data);
  })
});