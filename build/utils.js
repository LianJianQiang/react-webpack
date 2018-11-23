const path = require('path');

/**
 * 获取文件（夹）的执行时所在路径
 * @param {string} dir 文件路径
 */
exports.resolvePath = dir => path.join(__dirname, '..', dir);
