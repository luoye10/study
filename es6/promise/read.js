// 引入 fs 模块
let fs = require('fs');
// 调用方法读取文件
fs.readFile('./静夜思.md', (err, data) => {
    // 如果失败，抛出错误
    if (err) {
        throw err;
    }
    // 如果成功，输出内容
    console.log(data.toString());
});

// 使用 promise 封装
let p = new Promise((resolve, reject) => {
    fs.readFile('./静夜思.md', (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
});
p.then(
    value => {
        console.log(value.toString());
    },
    reason => {
        console.log('读取失败！');
    }
);

// 多个文件内容读取
let p1 = new Promise((resolve, reject) => {
    fs.readFile('./静夜思.md', (err, data) => {
        resolve(data);
    });
});
p1.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./望庐山瀑布.md', (err, data) => {
            resolve([value, data]);
        });
    });
})
    .then(value => {
        return new Promise((resolve, reject) => {
            fs.readFile('./早发白帝城.md', (err, data) => {
                value.push(data);
                resolve(value);
            });
        });
    })
    .then(value => {
        console.log(value.join('\r\n'));
    });
