var Validator = require('../dist/validator.js');
var expect = require('chai').expect;
var assert = require('chai').assert;


var v = new Validator();

describe("validators", function () {

    it("required() 必填验证", function () {
        expect(v.required('')).to.be.false;
        expect(v.required('t')).to.be.true;
    });

    it("isUrl() URL 验证", function () {
        expect(v.isUrl('://www.ss')).to.be.false;
        expect(v.isUrl('http://baidu.com')).to.be.true;
        expect(v.isUrl('hps://www.baidu.com')).to.be.true;
    });

    it("isEmail() 邮箱验证", function () {
        expect(v.isEmail('d.s.s.d@qq.com.cn')).to.be.true;
        expect(v.isEmail('d.s-s.d@qq.com.cn')).to.be.true;
        expect(v.isEmail('d.s.s.d@qq.cosdfaasdfasdfdsaf.cn.sh.sd.dsfsdfsfd')).to.be.true;
        expect(v.isEmail('ds.sd@qq.com')).to.be.true;
        expect(v.isEmail('dss1234.sd@qq.com')).to.be.true;
        expect(v.isEmail('ds.sd@qq.com.cn')).to.be.true;
        expect(v.isEmail('wowohoo@qq.com')).to.be.true;
        expect(v.isEmail('wowo.o@qq.com')).to.be.true;
        expect(v.isEmail('wowo@123.sd')).to.be.true;
        expect(v.isEmail('wowo@123.23')).to.be.true;
        expect(v.isEmail('wowo.oqqcom')).to.be.false;
        expect(v.isEmail('wowo@123')).to.be.false;
        expect(v.isEmail('wowo@asdf.中国')).to.be.false;
        expect(v.isEmail('wowo@中国.com')).to.be.false;
        expect(v.isEmail('中@qq.com')).to.be.false;
        expect(v.isEmail('wowo@中国.com')).to.be.false;
        expect(v.isEmail('中@qq.com')).to.be.false;
        expect(v.isEmail('email-test@universal-acceptance-test.icu')).to.be.true;
        expect(v.isEmail('email-test@universal-acceptance-test.international ')).to.be.true;
        expect(v.isEmail('อีเมลทดสอบ@ยูเอทดสอบ.ไทย')).to.be.true;
        expect(v.isEmail('อีเมลทดสอบ@สวัสดีครับ.องค์กร.ไทย')).to.be.true;
    });

    it("isIp() IP验证", function () {
        expect(v.isIp('01.01.01.0')).to.be.true;
        expect(v.isIp('192.168.1.1')).to.be.true;
        expect(v.isIp('192.168.23.3')).to.be.true;
        expect(v.isIp('192.168.23.3.32.1')).to.be.true;
        expect(v.isIp('192.168.23.3.32')).to.be.false;
        expect(v.isIp('192.168.23.3.32.1.2')).to.be.false;
        expect(v.isIp('192.168.23.3.32.1.wq2')).to.be.false;
        expect(v.isIp('192.168.2.wq2')).to.be.false;
        expect(v.isIp('192.168.1')).to.be.false;
        expect(v.isIp('192.168')).to.be.false;
        expect(v.isIp('192')).to.be.false;
        expect(v.isIp('192.168.1.1233')).to.be.false;
        expect(v.isIp('192.168.1324.123')).to.be.false;
    });


    // * 13段：130、131、132、133、134、135、136、137、138、139
    // * 14段：145、147
    // * 15段：150、151、152、153、155、156、157、158、159
    // * 17段：170、176、177、178
    // * 18段：180、181、182、183、184、185、186、187、188、189
    // * 国际码 如：中国(+86)
    it("isPhone() 手机号码验证", function () {
        expect(v.isPhone('13688889890')).to.be.true;
        expect(v.isPhone('13012341233')).to.be.true;
        expect(v.isPhone('+8613688889890')).to.be.true;
        expect(v.isPhone('+23613688889890')).to.be.true;
        expect(v.isPhone('19088889890')).to.be.false;
    });

    // 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)
    it("isTel() 座机号码验证", function () {
        expect(v.isTel('086-021-4433432-233')).to.be.true;
        expect(v.isTel('+086-021-4433432-233')).to.be.true;
        expect(v.isTel('+086-021-4433432-23')).to.be.false;
        expect(v.isTel('+086-021-4433432-2333')).to.be.true;
        expect(v.isTel('+086-021-4433432-1')).to.be.false;
        expect(v.isTel('13012341233')).to.be.false;
    });

    // 货币金额
    it("isMoney() 货币金额验证", function () {
        expect(v.isMoney('086-021-4433432-233')).to.be.false;
        expect(v.isMoney('5.00')).to.be.true;
        expect(v.isMoney('5')).to.be.true;
        expect(v.isMoney('05.00')).to.be.false;
        expect(v.isMoney('05.002')).to.be.false;
        expect(v.isMoney('12,000,000,000')).to.be.false;
    });

    // 是否为26个字母
    it("isEnglish() 是否为26个字母", function () {
        expect(v.isEnglish('086-021-4433432-233')).to.be.false;
        expect(v.isEnglish('dsf123')).to.be.false;
        expect(v.isEnglish('Hello Wold')).to.be.false;
        expect(v.isEnglish('Hello')).to.be.true;
    });

    // 判断是否为中文
    it("isChinese() 判断是否为中文", function () {
        expect(v.isChinese('086-021-4433432-233')).to.be.false;
        expect(v.isChinese('dsf123')).to.be.false;
        expect(v.isChinese('Hello Wold')).to.be.false;
        expect(v.isChinese('中文')).to.be.true;
        expect(v.isChinese('中文！')).to.be.true;
        expect(v.isChinese('中文！“我家”')).to.be.true;
        expect(v.isChinese('中文！“我家”！，。、（）【】‘’《》；')).to.be.true;
    });

    // 判断百分值
    it("isPercent() 判断是否为中文", function () {
        expect(v.isPercent('100')).to.be.true;
        expect(v.isPercent('100.23')).to.be.true;
        expect(v.isPercent('100.12')).to.be.true;
        expect(v.isPercent('23.12')).to.be.true;
        expect(v.isPercent('1.99')).to.be.true;
        expect(v.isPercent('1.2')).to.be.true;
        expect(v.isPercent('0.2')).to.be.false;
        expect(v.isPercent('101')).to.be.false;
        expect(v.isPercent('01')).to.be.false;
        expect(v.isPercent(-101)).to.be.false;
    });

});
