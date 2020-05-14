import { JSEncrypt } from 'jsencrypt'

export const encryptedData = (data, key) => {
    // 新建JSEncrypt对象
    let encryptor = new JSEncrypt();
    // 设置公钥
    encryptor.setPublicKey(key);
    // 加密数据
    return encryptor.encrypt(data);
}

// 设置cookie
export const setCookie = (name, val, expires) => {
    let cookie;
    if (expires > 0) {
        let exp = new Date();
        exp.setTime(exp.getTime() + expires * 1000);
        cookie = `${name}=${val};expires=${exp.toGMTString()}`;
    }
    document.cookie = cookie;
}

// 获取cookie
export const getCookie = (name) => {
    if (name) {
        let getCookies = document.cookie.split(';');
        for (let i in getCookies) {
            let c = getCookies[i].split('=');
            c[0] = c[0].replace(/(^\s+)|(\s+$)/g, ""); //如果cookie以一个或多个空格开始，替换全部空格为空
            if (name == c[0]) {
                return decodeURI(c[1]);
            }
        }
    }
}

export const validate = (val) => {
    if (val) {
        let reg = ''
        switch (val.type) {
            case 'phone': // 验证手机号码
                reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                break;
            case 'email': // 验证邮箱
                reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                break;
            case 'tel': // 验证固话
                reg = /^0\d{2,3}-?\d{7,8}$/;
                break;
            case 'number': // 验证n位数字
                reg = /^[0-9]*$/;
                break;
            case 'url': // 验证url
                reg = /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
                break;
            case 'money': // 验证金钱
                reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                break;
            case 'user': //验证用户
                reg = /\W/g;
                break;
            default:
                return false;
        }
        return reg.test(val.value);
    } else {
        return val;
    }
}