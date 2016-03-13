/**
 * Created by wangtingdong on 16/3/10.
 */
function $(selector) {
    return document.querySelector(selector);
}
$.on = function(element,eventName,listener) {
    if(element.addEventListener) {
        element.addEventListener(eventName,listener,false);
    } else if(element.attachEvent) {
        element.attachEvent("on"+eventName,listener);
    } else {
        element["on"+eventName]=listener;
    }
};

window.onload = function (){
    var btn = $("#btn");
    var timer;
    $.on(btn,"click",function(){
        timer = setInterval(setTime,100);
    });

    function setTime (){
        var data_ipt=$("#ipt");
        var box = $("#dataBox");
        var date=new Date();
        var targetDate=new Date();
        var arrDate = data_ipt.value.split("-");

        targetDate.setFullYear(arrDate[0],arrDate[1]-1,arrDate[2]);
        targetDate.setHours(0);
        targetDate.setMinutes(0);
        targetDate.setSeconds(0);
        var seconds = Math.floor((targetDate-date)/1000);
        if(seconds<=0) {
            clearInterval(timer);
            box.innerHTML="请输入以后的时间";
            return 0;
        }
        var day = Math.floor(seconds/24/3600);
        var hour = Math.floor(seconds/3600)%24;
        var minutes = Math.floor(seconds/60)%60;
        seconds=seconds%60;

        box.innerHTML="距离"+arrDate[0]+"年"+arrDate[1]+"月"+arrDate[2]+"日还有"+day+"天"+hour+"小时"+minutes+"分"+seconds+"秒";
    }


};