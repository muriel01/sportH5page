import Vue from 'vue'
const mixins = {
    myOption: {
        takeFun() {
            console.log('eating...')
        }
    },
    color: '黑色',
    size: 'L'
}

// 单一属性
Vue.config.optionMergeStrategies.color = function (toVal, fromVal) {
    return fromVal ? fromVal : toVal
}

/**---------------------------------------------------------
 * 多数值为对象的选项
 */
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = function (toVal, fromVal) { // parentVal: Object childVal: Object
    console.log(toVal, fromVal);
    if (!fromVal) return toVal;
    if (!toVal) return fromVal;
    var ret = Object.create(null)
    extend(ret, toVal)
    extend(ret, fromVal)  //  组件中的方法会覆盖mixin中的
    console.log(ret);
    return ret
}

function extend(to, _from) {
    for (var key in _from) {
        // 遍历对象中的key值，将_from中的键值对赋值给to，相同的key会覆盖
        to[key] = _from[key]
    }
    return to
}

export default mixins;
