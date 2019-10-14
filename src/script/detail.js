// class de{
//     constructor(){
//         this.bdli=$('.bd #tempWrap_ul li')
//         this.hdli=$('.hd li');
//         this.liimg=$('#tempWrap_ul li img');
//         // this.di=$('.hd')
//         // this.aA=$('.wrap_dota2-top-nav a')
//     }

//     init(){
//         this.first();
//     }
//     first(){
//         let _this=this;
//         this.hdli.on('click',function(){

//             $(this).addClass('on').siblings('.hd li').removeClass('on');
//         //    _this.bdul.style.left= -($(this).index('.hd li')-0)*430+'px'
//             _this.bdli.eq($(this).index('.hd li')).addClass('show').siblings('.bd li').removeClass('show');
//         })
//     }
// }
// new de().init()

const tologin = $('.wrap_dota2-top-col .dota2_user_info .wrap_dota2-after-login')
const haslogin = $('.wrap_dota2-top-col .dota2_user_info .wrap_dota2-login')
const email = $('.login_account #ipt1')
const span = $('.wrap_dota2-top-col .dota2_user_info .wrap_dota2-login .needLogin span')
const exit = $('.wrap_dota2-top-col .dota2_user_info .wrap_dota2-login .exit')
const goods_detail = $('.goods_detail')




function toLogin() {
    if (localStorage.getItem('email')) {
        // console.log(tologin[0])
        tologin.hide()
        haslogin.show()
        span.html(localStorage.getItem('email'))
    } else {
        haslogin.hide()
        //haslogin.addClass('hide').siblings('dl').removeClass('hide');
    }
    exit.on('click', function () {
        localStorage.removeItem('email')
        tologin.show()
    })
}
// 渲染
function render() {
    getid=location.search.split('=')
    // console.log(getid)
    $.ajax({
        type: 'post',
        url: '../php/detail.php',
        dataType: 'json',
        data: {
            sid: getid[1]
        }
    }).done(function (datalist) {
        let strhtml = ``;
        strhtml += `
        <div class="wrap cf">
        <div class="gallery f_left">
            <div class="picFocus">
                <div class="bd">
                    <div class="tempWrap">
                        <ul id="tempWrap_ul">
                            <li class="show">
                            <img id="img1"
                                src="${datalist[0].url}"
                                width="430" height="430">
                             <div id='sf'></div>
                             </li>   
                        </ul>
                        <div id='bf'>
                            <img src='' id='bpic'>
                        </div>
                    </div>
                </div>
                <div class="hd">
                    <ul>

                        
                    </ul>
                    
                </div>
            </div>
        </div>
        <div class="property f_left">
            <div class="title">
                <h1>${datalist[0].title}</h1>
                <p>${datalist[0].title_detail}</p>
            </div>
            <p id="productShowPrice" class="price">¥ ${datalist[0].price}
            </p>
            <table>
                <tbody>
                    <tr>
                        <th>库存:</th>
                        <td>
                            <div class="meta">
                                <!-- <span class="from">上海</span>至<span class="to shippingTo" title="北京">北京<i></i></span> -->
                                <!-- <font>库存：<span class="shippingFee"></span></font> -->
                                <span>${datalist[0].sailnumber}件</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <table style="margin-left: -4px;" id="">
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>数量：</th>
                        <td>
                            <span class="amount number-input">
                                <span class="reduce disable"></span>
                                <input id="buyNumber" type="text" value="1" min="1" stock="6" maxlength="3"
                                    autocomplete="off">
                                <span class="plus"></span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btns">
                <a href="" class="buy btn_buy">立即购买</a>
                <a href="cart.html" class="add btn_addCart"><span></span>加入购物车</a>
            </div>
        </div>
    </div>`
        goods_detail.html(strhtml)
        const ul = $('.gallery .picFocus .hd ul')
        var arr = []
        var arrbigpic=[]
        arr = datalist[0].urls.split(',')
        arrbigpic=datalist[0].bigpic.split(',')
        console.log(arrbigpic)
        let lihtml=''
        for (let i = 0; i < arr.length; i++) {
            lihtml+=`<li class=""><img src="${arr[i]}" width="100" height="100" alt="" title="DOTA2 - 扭蛋手办 II"></li>`
        }
        ul.html(lihtml)

        // 点击li的图片大图切换
        const li=$('.gallery .picFocus .hd ul li')
        const bigpic=$('.gallery .picFocus .show img')
        li.on('click',function () {
            bigpic.hide();
            console.log(arrbigpic[$(this).index()])
             bigpic.attr('src',arrbigpic[$(this).index()]).show().eq(li.index())
        })


        // 点击+ -添加减少数量
        const add=$('.property .amount .plus')
        const number=$('.property .amount input')
        const reduce=$('.property .amount .reduce')
        add.on('click',function(){
            number.attr('value',Number(number.val())+1)
        })
        reduce.on('click',function(){
            number.attr('value',Number(number.val())-1)
            if(number.val()<=1){
                number.attr('value',1)    
            }
        })


        // 鼠标移入显示放大镜
        const sf=$('.picFocus .bd .tempWrap  .show #sf')//小放
        const spic=$('.gallery .picFocus .show ')//小图
        const bf=$('.picFocus .bd .tempWrap #bf')//大放
        const maxpic=$('.picFocus .bd .tempWrap #bpic')//大图
        const wrap=$('.gallery')

        spic.hover(function(){
            sf.show()
            bf.show()
            maxpic.attr('src',bigpic[0].src)
            sf.css('width',spic[0].offsetWidth * bf[0].offsetWidth / maxpic[0].offsetWidth)
            sf.css('height',spic[0].offsetHeight * bf[0].offsetHeight / maxpic[0].offsetHeight)
            let bili = bf[0].offsetWidth / sf[0].offsetWidth;
            $(this).on('mousemove',function(ev){
                 var ev=ev||window.event;
                 let l = ev.clientX - wrap[0].offsetLeft - sf[0].offsetWidth / 2;
                 let t = ev.clientY - wrap[0].offsetTop - sf[0].offsetHeight / 2;
                if (l <= 0) {
                    l = 0;
                } else if (l >= spic[0].offsetWidth - sf[0].offsetWidth) {
                    l = spic[0].offsetWidth - sf[0].offsetWidth - 2;
                }
                if (t <= 0) {
                    t = 0;
                } else if (t >= spic[0].offsetHeight - sf[0].offsetHeight) {
                    t = spic[0].offsetHeight - sf[0].offsetHeight - 2;
                }


                sf.css('left',l)
                sf.css('top',t)
                maxpic.css('left',-l*bili)
                maxpic.css('top',-t*bili)
            })
            
            
        },function(){
            sf.hide()
            bf.hide()
        })





    })

    // console.log(bigpic[0])



}

toLogin()
render()




