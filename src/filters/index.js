// 过滤日期格式，传入时间戳，根据参数返回不同格式
const formatTimer = function (val, hours) {
    if (val) {
        var dateTimer = new Date(val * 1000)
        var y = dateTimer.getFullYear()
        var M = dateTimer.getMonth() + 1
        var d = dateTimer.getDate()
        var h = dateTimer.getHours()
        var m = dateTimer.getMinutes()
        M = M >= 10 ? M : '0' + M
        d = d >= 10 ? d : '0' + d
        h = h >= 10 ? h : '0' + h
        m = m >= 10 ? m : '0' + m
        if (hours) {
            return y + '-' + M + '-' + d + ' ' + h + ':' + m
        } else {
            return y + '-' + M + '-' + d
        }
    }
}
// 过滤日期格式，传入时间戳，根据参数返回不同格式
const releaseTime = function (val) {
    let time = '';
    console.log('dsgfdg', val);

    var dateBegin = new Date(val.replace(/-/g, '/'));
    var dateEnd = new Date(); // 当前时间数据

    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); // 时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
    // 计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
    // 计算相差秒数
    var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
    //     , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");

    if (dayDiff > 1) {
        time = val.substr(5, 11)
    } else {
        time = `${hours}小时前发布`
    }
    return time;
}

const weekFilter = function (data) {
    let week = '周一'
    switch (data) {
        case 1:
            week = '周一';
            break;
        case 2:
            week = '周二';
            break;
        case 3:
            week = '周三';
            break;
        case 4:
            week = '周四';
            break;
        case 5:
            week = '周五';
            break;
        case 6:
            week = '周六';
            break;
        case 7:
            week = '周日';
            break;
    }

    return week
}

const gameTime = function (data) {
    let time = '';
    time = data.substr(5, 11)
    return time;
}

export default {
    formatTimer,
    releaseTime,
    weekFilter,
    gameTime
}
