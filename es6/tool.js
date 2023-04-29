/**
 *
 *  定义一个函数，为指定元素绑定响应函数
 *      参数
 *          obj     要绑定事件的对象
 *          eventStr    要绑定事件的字符串
 *          callback    回调函数
 *
 *      addEventListener() 中的this，是绑定事件的对象
 *       attachEvent() 中的this是window
 *       需要统一两个方法的this
 *
 */
// 跨浏览器添加事件
function addEvent(obj, eventStr, callback) {
    if (obj.addEventListener) {
        // 大部分浏览器的方式
        obj.addEventListener(eventStr, callback, false);
    } else {
        // this 是谁由调用方式决定
        // IE8及以下
        obj.attachEvent('on' + eventStr, function () {
            // 在匿名函数中调用回调函数
            callback.call(obj);
        });
    }
}

// 跨浏览器兼容的阻止事件冒泡的函数
function stopBubble(e) {
    return e.cancelBubble || e.stopPropagation();
}

// obj 要获取样式的元素
// name 要获取的样式名
// 获取元素的样式的函数
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }
}

/**
 *
 * 创建一个可以执行简单动画的函数
 *      参数
 *          obj 要执行动画的对象
 *          attr  要执行动画的样式
 *          target  执行动画的目标位置
 *          speed   移动的速度
 *          callback    回调函数，动画执行完毕以后执行
 *
 * */
function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed;
    }
    // 开启一个定时器，用来执行动画效果
    // 向执行动画的对象中添加一个属性 timer
    obj.timer = setInterval(function () {
        // 获取 box 原来的 left 值
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue + speed;
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        obj.style[attr] = newValue + 'px';
        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}
