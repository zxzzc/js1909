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
    }
    init() {
        this.show();
        this.xuanran();
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

    xuanran() {
        let _this=this;
        $.ajax({
            type: 'post',
            url: 'http://localhost/h51909/item/php/aindex.php',
            dataType: 'json'
        }).done(function (datalist) {
            let strhtml = `
            <div class="area_slide dota_slide f_left in">
            <div class="hd"><a href="" class="on"></a></div>
            <div class="bd">
                <div class="tempWrap">
                    <ul class="cf">
                        <li>
                            <a href="" target="">
                                <img
                                    src="http://img.shop.wanmei.com/upload/moduleScroll/2018-06-11/7cef96d122b64cf7976e4233ef0bbc07.jpg">
                            </a>
                        </li>
                    </ul>
                </div>
                <a class="prev" href=""><span></span></a>
                <a class="next" href=""><span></span></a>
            </div>
        </div>
           
            `;
            $.each(datalist, function (index, value) {
                strhtml += `
                <div class="product-item list in">
                        <a href="detail.html" target="">
                                        <img src="${value.url}"
                                            alt="" title="DOTA2 - 扭蛋手办 II">
                        </a>
                            <p class="name ellipsis" title="DOTA2 - 扭蛋手办 II">
                                    ${value.title}
                            </p>
                        <p class="price">${value.price}
                    </p>
                 </div>
                
                `
            })
            // console.log(_this.li)
            // alert(_this.li)
             _this.li.html(strhtml);
        })
    }

}
new index().init()