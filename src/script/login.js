class login{
    constructor(){
        // this.input=$('.login_account #ipt')
        this.email=$('.login_account #ipt1')
        this.password=$('.login_account #ipt2')
        this.loginbtn=$('.login_account #btn_login #gologin')
        this.span=$('.header .userhaslogin dt a span')
        this.dl1=$('.header .wrap .userlogin')
        this.dl2=$('.header .wrap .userhaslogin')
        this.needlogin=$('.header .wrap .userlogin .needLogin')
    }
    init(){
        // this.gologin();
        let _this=this
        this.loginbtn.on('click',function(){
        //    alert(1);
            _this.gologin()
        })
    }
    gologin(){
        let _this=this
        $.ajax({
            type:'post',
            url:'http://localhost/h51909/item/php/login.php',
            data:{
                email:this.email.val(),
                password:this.password.val(),
            }
        }).done(function(data){
            if(data){
                // console.log(_this.needlogin)
                // console.log(_this.dl2);
                // console.log(_this.dl1)
                // _this.dl1.addClass('hide').siblings('dl').removeClass('hide');
                // _this.needlogin.addClass('hide')
                // _this.dl2.removeClass('hide');
                // alert(1);
                // $('.header .wrap .userlogin').hide();
                // _this.needlogin.hide()
                // _this.dl2.show();
                // _this.span.html()=_this.email.val();
                location.href='index.html';
                localStorage.setItem('email',_this.email.val())
                
                
                // alert(1);
            }else{
                alert('邮箱或着密码错误')
            }
        })
    }
}
new login().init()