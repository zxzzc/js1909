class register {
    constructor() {
        this.input = $('.ibox input')
        this.iI = $('.func_tabpage .ibox i')
        this.colorli=$('.pwlevel li')
        this.oform=$('.func_tabpage .oform')
        this.checked=$('.func_tabpage .cbox .acceptcb')
        this.passlock1 = true;
        this.emaillock = true;
        this.chinalock = true;
        this.cartidlock = true;
        this.passlock = true;
    }
    init() {
        this.check();
        this.submit();
    }
    check() {
        let _this = this;
        // 邮箱
        $(this.input[0]).on('blur', function () {
            var reg = /(\w[\w\-]*\w)\@(\w[\w\-]*\w)\.(\w[\w\-]*\w)/
            // if(_this.input.value!=''){
            // }
            if (reg.test($(this).get(0).value)) {
                $.ajax({
                    type:'post',
                    url:'../php/register.php',
                    data:{
                        email:$(this).get(0).value
                    },
                }).done(function(data){
                    if(!data){
                        $(_this.iI[0]).html('√');
                        $(_this.iI[0]).css('color','green');
                        _this.emaillock = true;
                    }else{
                        $(_this.iI[0]).html('邮箱已重复');
                        $(_this.iI[0]).css('color','blue');
                        _this.emaillock = false;
                    }
                })
                    
                } else {
                    $(_this.iI[0]).html('请输入一个正确的邮箱地址');
                    $(_this.iI[0]).css('color','red');
                    _this.emaillock = false;
                }
                
                
        })
        // 密码
        $(this.input[1]).on('blur', function () {
            if ($(this).get(0).value.length >= 8 && $(this).get(0).value.length <=16 ) {
                let regnum = /[0-9]+/g;  //数字
                let reguppercase = /[A-Z]+/g;  //大写字母
                let reglowercase = /[a-z]+/g;  //小写字母
                let count = 0;//计算种类
                if (regnum.test($(this).get(0).value)) {
                    count++;
                }
                if (reguppercase.test($(this).get(0).value)) {
                    count++;
                }
                if (reglowercase.test($(this).get(0).value)) {
                    count++;
                }
                switch (count) {
                    case 1:
                        $(_this.colorli[0]).html('密码强度弱')
                        $(_this.colorli[0]).addClass('cur').siblings('li').removeClass('cur');
                        _this.passlock = false;
                        break;
                    case 2:
                        $(_this.colorli[1]).html('密码强度中')
                        $(_this.colorli[1]).addClass('cur').siblings('li').removeClass('cur');
                        _this.passlock = true;
                        break;
                    case 3:
                        $(_this.colorli[2]).html('密码强度高')
                        $(_this.colorli[2]).addClass('cur').siblings('li').removeClass('cur');
                        _this.passlock = true;
                        break;
                }
                $(_this.iI[1]).html('');
            }else{
                $(_this.iI[1]).html('密码长度不对');
                $(_this.iI[1]).css('color','red');
                _this.passlock=false;
            }
        })
        //重复密码
        $(this.input[2]).on('blur',function(){
            if($(this).get(0).value!=''){
                if ($(this).get(0).value==$(_this.input[1]).get(0).value) {
                    $(_this.iI[2]).html('√');
                    _this.passlock1=true;
                } else {
                    $(_this.iI[2]).html('密码输入错误');
                    $(_this.iI[2]).css('color','red');
                    _this.passlock1=false;
                }
            }else{
                $(_this.iI[2]).html('密码不能为空');
                $(_this.iI[2]).css('color','red');
                _this.passlock1=false;
            }
            })
            
        //姓名
        $(this.input[3]).on('blur',function(){
            var reg = /^[\u4e00-\u9fa5]{2,4}$/
            if (reg.test($(this).get(0).value)) {
                $(_this.iI[3]).html('√');
                _this.chinalock=true;
            } else {
                $(_this.iI[3]).html('请输入一个正确的名字');
                $(_this.iI[3]).css('color','red');
                _this.chinalock=false;
            }
        })
        //身份证
        $(this.input[4]).on('blur',function(){
            var reg = /^\d{6}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[0-1])\d{3}[\d\x\X]$/
            if (reg.test($(this).get(0).value)) {
                $(_this.iI[4]).html('√');
                _this.cartidlock=true
            } else {
                $(_this.iI[4]).html('请输入一个正确的身份证号');
                $(_this.iI[4]).css('color','red');
                _this.cartidlock=false
            }
        })
        
        
    }
    //提交表单
        submit() {
            let _this=this
            $(this.oform).on('submit',function(){
                if(!_this.emaillock || !_this.passlock || !_this.passlock1|| !_this.chinalock|| !_this.cartidlock){
                    return false;
                }else if(!_this.checked.prop('checked')){
                    alert('请勾选用户协议')
                    return false;
                }
            })
        }
}
new register().init()