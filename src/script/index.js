class index {
    constructor() {
        this.loutinav = $('#loutinav');
        this.loutili = $('#loutinav li').not('.last');
        this.louceng = $('#main .area')
        this.last = $('#loutinav .last')
        this.header = $('.header')
        this.dl1 = $('.header .wrap .userlogin')
        this.dl2 = $('.header .wrap .userhaslogin')
        this.email = $('.login_account #ipt1')
        this.span = $('.header .userhaslogin dt a span')
        this.exit = $('.header .userhaslogin dd .exit')
        this.li=$('#main .dota2_area .wrap .tempWrap .main')
        this.try=$('#main .dota2_area .title_main .try')
        // this.ptype=$('#main .dota2_area .title_main .ptype')
        // this.bigpic=$('#main .dota2_area .bigpic')
        // 渲染第二模块
        this.li1=$('#main .ws_zb .wrap .tempWrap .main')
        // 渲染第三模块
        this.li2=$('#main .game_zb .wrap .tempWrap .main')
        // 渲染第四模块
        this.li3=$('#main .csgo_zb .wrap .tempWrap .main')
        
        // 左右按钮
        this.prev=$('.header_slide .bd .prev')
        this.next=$('.header_slide .bd .next')
        this.a=$('.header_slide .hd a')
        this.lunboul=$('.header_slide .bd .tempWrap .super_slide')
        this.index=0
    }
    init() {
        this.show();
        this.xuanran('Dota2专区',this.li);
        this.xuanran('外设专区',this.li1);
        this.xuanran('游戏周边',this.li2);
        this.xuanran('CSGO正版周边',this.li3);
        this.nav();
        this.lunbo();
        // this.xuanran2();
    }
    nav(){
        let _this = this;
        // 1.滚轮下滑，显示楼梯nav
        $(window).on('scroll', function () {
            let $top = $(this).scrollTop();
            if ($top > 0) {
                _this.header.css({
                    position: 'fixed',
                    top: 0,
                })
            } else {
                _this.header.css({
                    position: 'static',
                })
            }
            if ($top >= 700) {
                _this.loutinav.show();
            } else {
                _this.loutinav.hide();
            }

            // 4.滑动滚轮，使楼梯与楼层对应
            _this.louceng.each(function (index, element) {
                //每一个楼层的top值，固定的值。
                let $loucengtop = _this.louceng.eq(index).offset().top + $(element).height() / 2;
                if ($loucengtop > $top) {
                    _this.loutili.removeClass('active');
                    _this.loutili.eq(index).addClass('active');
                    return false;
                }
            })
        })
        // 2.点击左侧楼梯，显示对应的层次
        this.loutili.on('click', function () {
            $(this).addClass('active').siblings('li').removeClass('active');
            // 获取每一个楼层的top值
            let $loucengtop = _this.louceng.eq($(this).index()).offset().top;
            $('html,body').animate({
                scrollTop: $loucengtop
            })

        })
        // 3.回到顶部
        this.last.on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            })
        })
    }

    show() {
        if (localStorage.getItem('email')) {
            this.dl1.addClass('hide').siblings('dl').removeClass('hide');
            // this.dl2.removeClass('hide'); 
            console.log()
            this.span.html(localStorage.getItem('email'))
        } else {
            this.dl2.addClass('hide').siblings('dl').removeClass('hide');
        }
        this.exit.on('click', function () {
            localStorage.removeItem('email')
            _this.dl2.addClass('hide').siblings('dl').removeClass('hide');
        })
    }
    // 轮播图
    lunbo(){
        let _this=this
        this.next.on('click',function(){
            _this.index++;
            if(_this.index==2){
                _this.index=0
            }
            _this.tabswitch()
        })
        this.prev.on('click',function(){
            _this.index--;
            if(_this.index==-1){
                _this.index=1
            }
            console.log(_this.index)
            _this.tabswitch()
        })
        
        this.a.on('click',function(){
            _this.index=$(this).index()
            _this.tabswitch()
        })
    }
    // 轮播里的切换
    tabswitch(){
        if(this.index==this.a.size()-1){
            this.lunboul.stop(true).animate({
                left:'-'+this.lunboul.width()/2+'px'
            })
            this.a.eq(this.index).addClass('on').siblings('a').removeClass('on')
        }
        if(this.index==0){
            this.lunboul.stop(true).animate({
                left:'0'
            })
            this.a.eq(this.index).addClass('on').siblings('a').removeClass('on')
        }
    }


    
    // 渲染主要内容
    xuanran(ptype,target) {
        let _this=this;
        $.ajax({
            type: 'post',
            url: '../php/aindex.php',
            dataType: 'json',
            data:{
                ptype:ptype
            }
        }).done(function (datalist) {
            let strhtml = ``;
            $.each(datalist, function (index, value) {
                    strhtml += `
                    <div class="product-item list in">
                            <a href="detail.html?sid=${value.sid}" target="">
                                            <img src="${value.url}"
                                                alt="" title="DOTA2 - 扭蛋手办 II">
                            </a>
                                <p class="name ellipsis" title="DOTA2 - 扭蛋手办 II">
                                        ${value.title}
                                </p>
                            <p class="price">￥${value.price}
                        </p>
                     </div>
                    ` 
            })
            target.html(strhtml);
        })
    }

}
new index().init()