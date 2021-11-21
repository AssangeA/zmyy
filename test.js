const request = require("request");
const querystring = require("querystring")

const url = "https://cloud.cn2030.com/sc/wx/HandlerSubscribe.ashx",
    headers = {
        "host": "cloud.cn2030.com",
        "content-type": "application/json;charset=UTF-8",
        "connection": "keep-alive",
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac",
        "referer": "https://servicewechat.com/wx2c7f0f3c30d99445/89/page-frame.html",
        "accept-language": "zh-cn",
        "accept-endoding": "gzip,deflate,brr",
        "acceept": "*/*",
        /*------------------最新Cookie----------------*/
        "Cookie": "ASP.NET_SessionId=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mzc1MDM2MTUuNjkzMjQ3NiwiZXhwIjoxNjM3NTA3MjE1LjY5MzI0NzYsInN1YiI6IllOVy5WSVAiLCJqdGkiOiIyMDIxMTEyMTEwMDY1NSIsInZhbCI6Imh4UFJBQUlBQUFBUVl6STFNVGhpWldFeE9UUTJaamxsTnh4dmNYSTFielZPV2t3dGNta3pVMkpFYmpaMU1XczJRbmRVY2tGQkFCeHZcclxuVlRJMldIUTVNakUxTldKU1EzVjNWR2xTVG5wd2FtNU5kbXhORGpFeE55NHhOekl1TWpVdU1qQXhBQUFBQUFBQUFBPT0ifQ.y3JnCIjpeAkQ8t9rRKb2s-9ASZyF-z2vTrWFnkv8oaw",
    },
    /*----------------------------------------*/
    //九价=1
    pid = 12,
    /*-----------------------------------------*/
    //医院id
    id = 3053,
    /*--------------验证码请求参数----------------*/
    mxid = "hxPRACaHAACmZTQB";


//主函数
(async function main() {

    //获取可预约日期
    // let dateList = await getReserveDate();
    // dateList = JSON.parse(dateList)
    // let reserveDate = "";
    // for (let date of dateList.list) {
    //     if (date.enable) {
    //         reserveDate = date.date;
    //         break;
    //     }
    // }
    //获取验证码
    // let Code = await getReserveByDate(reserveDate)
    // console.log(1, Code);
    // let code1 = await getCode();
    // console.log(2,code1);

    let res = await getReserveByDate("2021-12-08");
    console.log('!',res);

})()









/**
 * 获取所有医院
 */
async function getAllHospital() {
    let params = {
        act: "CustomerList",
        city: "[' ',' ',' ']",
        lat: 30.570199966430664,
        lng: 104.06475830078125,
        id: 0,
        cityCode: 0,
        product: 1
    };
    return await requestGet(params, headers)
}

/**
 * 查询可预约日期接口
 */
async function getReserveDate() {
    let params = {
        act: "GetCustSubscribeDateAll",
        pid,
        id,
        mouth: '202111'
    }
    return await requestGet(params, headers)

}

/**
 * 根据日期请求预约数据 
 */
async function getReserveByDate(date) {
    let param = {
        act: "GetCustSubscribeDateDetail",
        pid:pid,
        id:id,
        scdate: date
    }
    return await requestGet(param, headers);
}

/**
 * 请求验证码
 */

async function getCode() {
    let params = {
        act: "GetCaptcha",
        mxid,
    }
    return await requestGet(params, headers);
}


//封装get
function requestGet(params, headers) {
    let paramsStr = paramsJoint(params)
    console.log(paramsStr);
    return new Promise((resolve, reject) => {
        request({
            url: url + paramsStr,
            timeout:10000,
            methods: "GET",
            headers: headers,
        }, (error, res, body) => {
            if (res && res.statusCode == 200) {
                console.log(res.body);
                resolve(body)
            }
            if (error) {
                reject(error)
            }
        })

    })

}

// 拼接参数
function paramsJoint(obj) {
    let result = '';
    let item;
    for (item in obj) {
        if (obj[item] || String(obj[item])) {
            result += `&${item}=${obj[item]}`;
        }
    }
    if (result) {
        result = '?' + result.slice(1);
    }
    return result;
}