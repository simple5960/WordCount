const readline = require('readline');
const fs = require("fs");
// // -c 字符 -w 单词
var readStream = fs.createReadStream('input.txt');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = (query) => new Promise(resolve => rl.question(query, (answer) => resolve(answer)));
(async () => {
    const file = readline.createInterface({
        input: readStream
    });
    const arr = [];
    let res = 0;
    file.on('line', line => {
        arr.push(line);
        res++; // 统计行数
    });
    let input = await question('请输入需要统计的方式, c 字符, w 单词');
    const answer = input.trim();
    if (answer === 'c') {
        // character
        arr.map(a => {
            res += a.length;
        });
        console.log(`字符数: ${res}`);
    } else {
        // word
        const reg = /[a-zA-Z]+/g;
        res = 0; // 不统计行数
        arr.map(a => {
            res += a.match(reg).length;
        });
        console.log(`单词数: ${res}`);
    }
    rl.close();
})();