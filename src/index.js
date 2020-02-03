let http = require('http');
let fs = require('fs');

http.get('http://www.nipic.com/photo/lvyou/guonei/index.html', res => {
  let data = '';
  res.on('data', buf => {
    // 获取网页源码
    data += buf.toString();
  });

  res.on('end', () => {
    // 正则匹配图片地址
    let reg = /<img src="(.*?)" data-src="(.+?)"  alt=".*?" \/>/img;
    let arr = [];
    let result = '';
    while(result=reg.exec(data)) {
      arr.push(result[2]);
    }
    arr.map((item, index) => {
      // 利用闭包，控制下载速度为1s
      (function(item, index) {
        setTimeout(() => {
          dowloadImg(item);
        }, 1000 * index);
      })(item, index);
    });
    //console.log(newArr);
    // fs.writeFile('./file.txt', data, (err) => {
    //   if(err) throw err;
    // });
  })
});

function dowloadImg(url) {
  // 把小图路径改为大图路径
  // let url1 = url.replace('\/pic\/', '/file/').replace(/_4.jpg/ig, '_2.jpg');
  http.get(url, res => {
    // console.log(url.match(/pic\/.+?jpg/ig)[0].slice(5));
    // 输出大图
    // res.pipe(fs.createWriteStream('./img/'+url1.match(/file\/.+?jpg/ig)[0].slice(5).replace(/\//g, '_')));
    // 输出小图
    res.pipe(fs.createWriteStream('./img/'+url.match(/pic\/.+?jpg/ig)[0].slice(4).replace(/\//g, '_')));
  });
}