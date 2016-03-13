/**
 * Created by wangtingdong on 16/3/8.
 */



window.onload = function(){

    function ajax(url, options) {
        // 创建对象
        var xhr;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }
        else {
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }

        // 处理data
        if(options.data) {
            var data=[];
            for(key in options.data) {
                data.push(key+"="+options.data[key]);
            }
            data=data.join("&");
            console.log(data);
        }
        // 处理type
        if(!options.type) {
            options.type="GET";
        }
        options.type=options.type.toUpperCase();

        var myUrl = data ? url+"?"+data : url;

        // 发送请求
        if(options.type=="GET") {
            xhr.open(options.type,myUrl,true);
            xhr.send();
        }
        else if(options.type=="POST") {
            xhr.open(options.type,url,true);
            //xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }

        // readyState

        xhr.onreadystatechange=function(){
            if(xhr.readyState==4) {
                if(xhr.status==200) {
                    if(options.onsuccess) {
                        onsuccess(xhr.responseText,xhr);
                    }
                }
                else {
                    if(options.onfail) {
                        options.onfail()
                    }
                }
            }
        }

    }

    //ajax(
    //    'http://localhost:8080/server/ajaxtest',
    //    {
    //        data: {
    //            name: 'simon',
    //            password: '123456'
    //        },
    //        onsuccess: function (responseText, xhr) {
    //            console.log(responseText);
    //        }
    //    }
    //);

    isIE();
    // 判断是否为IE浏览器，返回-1或者版本号
    function isIE() {
        var version=window.navigator.userAgent;
        var isIe = version.match(/msie ([\d.]+)/)||version.match(/rv:[\d.]+]/);

        if(isIe) {
            return isIe;
        }
        else
            return -1;
    }

// 设置cookie
    setCookie("userName","liujuping","135");
    function setCookie(cookieName, cookieValue, expiredays) {
        var exDate=new Date();
        exDate.setDate(exDate.getDate()+expiredays);
        document.cookie=cookieName+"="+ escape(cookieValue) + ((expiredays==null)? "3" :";expires="+exDate.toUTCString());
    }

    //console.log(getCookie("userName"));

// 获取cookie值
    function getCookie(cookieName) {
        rg = new RegExp(cookieName + '=[^;]+');
        if(rg.test(document.cookie)) {
            return rg.exec(document.cookie)[0];
        }
    }

    $.on = function(selector, event, listener) {
        // 给一个element绑定一个针对event事件的响应，响应函数为listener
        if(selector.addEventListener) {
            selector.addEventListener(event,listener,false);
        }
        else if(selector.attachEvent) {    //IE
            selector.attachEvent("on"+event,listener);
        }
        else {
            selector["on"+event]=listener;
        }
    };
    $.click = function(selector, listener) {
        // 实现对click事件的绑定
        $.on(selector,"click",listener);
    };
    $.un=function(selector, event, listener) {
        // 移除element对象对于event事件发生时执行listener的响应
        if(selector.removeEvent) {
            selector.removeEventListener(event,listener,false);
        }
        else if(selector.detachEvent) {
            selector.detachEvent("on"+event,listener);
        }
        else {
            selector["on"+event]=null;
        }

    };
    $.enter=function(element, listener){
        // 实现对于按Enter键时的事件绑定
        document.onkeydown=function(e){
            if(e&& e.keyCode==13) {
                listener();
            }
        }
    };
    $.delegate=function(selector, tag, event, listener) {
        $.on(selector,event,function(e){
            var event = e||window.event;
            var target = e.srcElement? e.srcElement: e.target;
            var name=target.nodeName.toLowerCase();
            if(name==tag) {
                $.on(target,event,listener());
            }
        });
    };

    //$.click("#btn", function(){
    //    $("#list").innerHTML = '<li>new item</li>';
    //});
    //$.delegate('#list', "li", "click", function(){
    //    console.log("clickHandle");
    //});
    //
    //$.enter("document",function(){
    //    console.log("enter")
    //});
    //
    //$.on($("#doma"), "click", function(){
    //    console.log("clicklisterner"+" "+event.type);
    //});

    function $(selector) {
        // 实现一个简单的Query
        return document.querySelector(selector);
    }

    //$("#adom"); // 返回id为adom的DOM对象
    //$("a"); // 返回第一个<a>对象
    //$(".classa"); // 返回第一个样式定义包含classa的对象
    //$("[data-log]"); // 返回第一个包含属性data-log的对象
    ////$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
    //$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

    // 为element增加一个样式名为newClassName的新样式
    function addClass(element, newClassName) {
        rg=new RegExp("(\\s|^)"+newClassName+"(\\s|$)");
        if(!rg.test(element.className)) {
            if(element.className!=="")
                element.className+=" ";
            element.className+=newClassName;
        }
    }

    // 移除element中的样式oldClassName
    function removeClass(element, oldClassName) {
        rg=new RegExp("(\\s|^)"+oldClassName+"(\\s|$)");
        if(rg.test(element.className)){
            element.className=element.className.replace(rg," ").replace(/(^\s)|(\s$)/,"");
        }
    }

    // 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
    function isSiblingNode(element, siblingNode) {
        return element.parentNode===siblingNode.parentNode;

    }

    // 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
    function getPosition(element) {
        var result={};
        result.x=element.getBoundingClientRect().left;
        result.y=element.getBoundingClientRect().top;
        return result;
    }

    // 判断是否为邮箱地址
    function isEmail(emailStr) {
        var rg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
        return rg.test(emailStr);
    }

    // 判断是否为手机号
    function isMobilePhone(phone) {
        var rg=/^\d{11}$/g;
        console.log(rg.test(phone));
    }

    // 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    function uniqArray(arr) {
        var i,j;
        for(i=0;i<arr.length-1;i++) {
            for(j=i+1;j<arr.length;j++) {
                if(arr[i]==arr[j]) {
                    arr.splice(j,1);
                }
            }
        }
        return arr;
    }

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
    function simpleTrim(str) {
        // your implement
        var result="";
        for(var i=0;i<str.length;i++) {
            if(str[i]!=" "&&str[i]!="\t") {
                result+=str[i];
            }
        }
        return result;
    }

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
    function trim(str) {
        return str.replace(/\s+/g,"");
    }

    // 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
    function each(arr, fn) {
        for(var i in arr){
            fn(arr[i],i);
        }
    }


    //// 使用示例
    //var arr = ['java', 'c', 'php', 'html'];
    //function output(item) {
    //    //console.log(item)
    //}
    //each(arr, output);  // java, c, php, html
    //
    //// 使用示例
    //var arr = ['java', 'c', 'php', 'html'];
    //function output(item, index) {
    //    //console.log(index + ': ' + item)
    //}
    //each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
    function getObjectLength(obj) {
        return Object.keys(obj).length;
    }

// 使用示例
//    var obj = {
//        a: 1,
//        b: 2,
//        c: {
//            c1: 3,
//            c2: 4
//        }
//    };

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
    function cloneObject(src) {
        var i,o;
        if(typeof(src)!=="object" || src===null)
            return src;
        else if(src instanceof Array) {
            o=[];
            for(i=0;i<src.length;i++) {
                if(typeof(src[i])=="object"&&src[i]!=null) {
                    o[i]=arguments.callee(src[i]);
                }
                else {
                    o[i]=src[i];
                }
            }
        }
        else {
            o={};
            for(var key in src) {
                //console.log(src[i]);
                if(typeof(src[key])=="object" && src[key]!=null) {
                    o[key]=arguments.callee(src[key]);
                }
                else {
                    o[key]=src[key];
                }
            }
        }
        return o;
    }

// 测试用例：
//    var srcObj = {
//        a: 1,
//        b: {
//            b1: ["hello", "hi"],
//            b2: "JavaScript"
//        }
//    };

    //var abObj = srcObj;
    //var tarObj = cloneObject(srcObj);
    //
    //srcObj.a = 2;
    //srcObj.b.b1[0] = "Hello";

    //console.log(abObj.a);
    //console.log(abObj.b.b1[0]);

    //console.log(tarObj.a);      // 1
    //console.log(tarObj.b.b1[0]);    // "hello"

    // 判断arr是否为一个数组，返回一个bool值
    function isArray(arr) {
        if(arr instanceof Array)
            return true;
        else
            return false;
    }

// 判断fn是否为一个函数，返回一个bool值
    function isFunction(fn) {
        if(typeof(fn)=="function")
            return true;
        else
            return false;
    }
};