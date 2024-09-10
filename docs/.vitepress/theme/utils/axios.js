import axios from 'axios';

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: 'http://42.193.100.163:5000', // 替换为你的后端地址
    timeout: 10000, // 请求超时时间
});

export default instance;
