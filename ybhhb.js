function getCookie(t) {
    var e = new RegExp("(?:^| )" + t + "=([^;]*)(?:;|$)", "gi"),
        n = e.exec(document.cookie);
    return n ? unescape(n[1]) : ""
}

function getG_TK() {
    var t = getCookie("p_skey"),
        e = 5381;
    if (!t)
        return "";
    for (var n = 0; n < t.length; n++)
        e += (e << 5) + t.charCodeAt(n);
    return 2147483647 & e
}

function xyz_suburl(str) {
    url = decodeURIComponent(window.location.href).split("&")
        //console.log(url)
    xyz_data = [];

    for (var i = 0; i < url.length; i++) {
        if (url[i].indexOf(str+"=") != -1) {
            return url[i].substring(url[i].indexOf(str) + (str + "=").length)
        }
    }
}
xyz_appinf=""
var xyz_str = "app_info:\"";
xyz_xml_app = new XMLHttpRequest();
xyz_xml_app.open("get", "https://i.gtimg.cn/channel/hybird/modules/one-stroke-paint/dist/v3/js/index.js", true);
xyz_xml_app.onreadystatechange = function() {
    if (xyz_xml_app.readyState == 4) {
        xyz_js_str = xyz_xml_app.responseText;
        xyz_appinf=xyz_js_str.substr(xyz_js_str.indexOf(xyz_str) + xyz_str.length, 55);
    }
};
xyz_xml_app.send();






xyz_xml = new XMLHttpRequest();
xyz_xml.open("POST", "https://h5.qianbao.qq.com/sendRedpack/cgi/getOneStrokeSubject?g_tk=" + getG_TK(), true);
xyz_xml.onreadystatechange = function() {
    xyz_data = xyz_xml.responseText;
    //console.log(xyz_xml.readyState)
    //console.log(xyz_xml.responseText)
    if (xyz_xml.readyState == 4) {
        //xyz_data=xyz_data.replace(/\\/g,"")
        xyz_data = JSON.parse(xyz_data)
            //console.log(xyz_data.data.connects)
        xyz_dierbu(xyz_data)
    }
};
xyz_xml.send('{"uin":"' + xyz_suburl("uin") + '","gameId":' + xyz_suburl("gameId") + '}');

function xyz_dierbu(str) {
    //console.log(str)
    xyz_tjdata = { "feedSid": "", "preCode": "", "oneStrokeId": 0, "oneStrokeHbOrbit": [], "sendUin": "", "grapUin": "", "hbListId": "", "strokeType": 1 }

    xyz_tjdata.feedSid = "uin=" + xyz_suburl("uin") + "&gameId=" + xyz_suburl("gameId") + "&i=" + xyz_suburl("i")
    xyz_tjdata.preCode = xyz_suburl("pre_code");
    xyz_tjdata.oneStrokeId = xyz_suburl("gameId");

    var HbOrbit = str.data.connects;
    //HbOrbit = HbOrbit.replace(/\\/g, "");
    //console.log(HbOrbit);
    HbOrbit = JSON.parse(HbOrbit);
    xyz_tjdata.oneStrokeHbOrbit = HbOrbit
    xyz_tjdata.sendUin = xyz_suburl("uin")
    if (getCookie("uin").indexOf("o0")) {
        xyz_tjdata.grapUin = getCookie("uin").substring(getCookie("uin").indexOf("o0") + 2)
    } else {
        xyz_tjdata.grapUin = getCookie("uin").substring(getCookie("uin").indexOf("o") + 1)
    }
    xyz_tjdata.hbListId = xyz_suburl("listid");
    //console.log(xyz_tjdata)



    xyz_xml = new XMLHttpRequest();
    xyz_xml.open("POST", "https://h5.qianbao.qq.com/oneStrokePaintHb/cgi/checkOneStrokePaint?g_tk=" + getG_TK(), true);
    xyz_xml.onreadystatechange = function() {
        xyz_data = xyz_xml.responseText;
        if (xyz_xml.readyState == 4) {
            
            xyz_data = JSON.parse(xyz_data)
            xyz_qqgg = xyz_data.data;
            var xyz_goto = "jsbridge://qw_pay/qWalletBridge?p="
            jsbridge_json = {}
            jsbridge_json.gotoTenPayView = 1;
            jsbridge_json.come_from = 1;
            jsbridge_json.app_info = xyz_appinf;
            jsbridge_json.action = "graphb";
            jsbridge_json.closeWebView = 1;
            jsbridge_json.action = "graphb";
            jsbridge_json.params = {};
            jsbridge_json.params.listid = xyz_suburl("listid");
            jsbridge_json.params.feedsid = "uin=" + xyz_suburl("uin") + "&gameId=" + xyz_suburl("gameId") + "&i=" + xyz_suburl("i");
            jsbridge_json.params.token = xyz_qqgg;
            if (getCookie("uin").indexOf("o0")) {
                jsbridge_json.params.uin = getCookie("uin").substring(getCookie("uin").indexOf("o0") + 2)
            } else {
                jsbridge_json.params.uin = getCookie("uin").substring(getCookie("uin").indexOf("o") + 1)
            }
            jsbridge_json.callback = "__MQQ_CALLBACK_AUTO_6";
            xyz_time = new Date().getTime();
            xyz_goto = xyz_goto + encodeURIComponent(JSON.stringify(jsbridge_json)) + "&mqq_tt=" + xyz_time
            console.log(xyz_goto);
            window.location.href = xyz_goto;
        }
    };
    xyz_xml.send(JSON.stringify(xyz_tjdata));

}
