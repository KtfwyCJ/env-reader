// 将env文件中定义的环境变量加载到process.env中步骤
// 1. 读取env文件内容
// 2. 分割文件内容，并组装成键值对的格式
// 3. 变量复制到process.env上
// 4. 返回对象

const fs = require('fs');
const path = require('path');

// 将文件内容组装成键值对
const parse = function parse(src) {
    const obj = {};

    src.split('\n').forEach((line, index) => {
        const key = line.split('=')[0].trim();
        const value = (line.split('=')[1] || '').trim();

        obj[key] = value;

    });
    return obj;
}

// 读取文件
const config = function() {
    let envPath = path.resolve(process.cwd(), '.env');

    if (!envPath) {
      console.log(`env path is not exsist`)
      return;
    }
    const parsed = parse(fs.readFileSync(envPath, 'utf-8'))

    // 键值对形式复制到process.env上，已存在则不赋值
    Object.keys(parsed).forEach(key => {
        if (!Reflect.has(process.env, key)) {
            process.env[key] = parsed[key]
        } else {
            console.log(`${key} is already defined`)
        }
    })

    return parsed;
}

console.log(config())
console.log(process.env);

// 导出函数
module.exports.config = config;
module.exports.parse = parse;
