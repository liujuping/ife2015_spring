/**
 * Created by wangtingdong on 16/3/10.
 */

$.on = function(element,eventName,listener){
    if(element.addEventListener) {
        element.addEventListener(eventName,listener,false);
    }
    else if(element.attachEvent) {
        element.attachEvent("on"+eventName,listener);
    }
    else {
        element["on"+eventName]=listener;
    }
};

$.click = function(element,listener) {
    $.on(element,"click",listener);
};
function $(selector) {
    return document.querySelector(selector);
}

window.onload=function(){

    var $ipt=$("#ipt");
    var $btn=$("#btn");
    var $result=$("#result");
    var $tip=$("#tip");
    var tipText="";

    $.click($btn,function(){
        var text=$ipt.value;
        $result.innerHTML="";
        if(text==null || text==""||/^ *$/.test(text)) {
            tipText="请输入爱好再点击按钮";
            $tip.innerHTML=tipText;
            return 0;
        }
        else{
            $tip.innerHTML="";
        }
        //console.log(text);
        var arr = text.split(/[ ,，、；\n]/);
        for(var i=0;i<arr.length-1;i++){
            for(var j=i+1; j<arr.length;j++) {
                if(arr[i]==arr[j]) {
                    arr.splice(j,1);
                    j--;
                }
            }
        }
        for(i=0;i<arr.length;i++) {
            if(/^ *$/.test(arr[i])) {
                arr.splice(i,1);
                i--;
            }
        }
        if(arr.length>10) {
            tipText="输入爱好不能超过十个";
            $tip.innerHTML=tipText;
            return 0;
        }
        var resultText="";
        for(i=0;i<arr.length;i++) {
            resultText+='<input type="checkbox" id="check'+i+'"><lable for="check'+i+'">'+arr[i]+'</label>';
        }

        $result.innerHTML=resultText;
    });


};