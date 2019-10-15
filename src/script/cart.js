const dl1 = $('.header .wrap .userlogin')
const dl2 = $('.header .wrap .userhaslogin')
const email = $('.login_account #ipt1')
const span = $('.header .userhaslogin dt a span')
const exit = $('.header .userhaslogin dd .exit')
const content2 = $('.cart_list #cartForm .total_bar')

const chooseAll = $('.selectall');
// const choose = $('.select')
const content = $('.cart_list #cartForm #content')
const sumproduct=$('.cart_list .total_bar #num')


// function weituo(){
//     content.on('click',function(ev){
//         // alert(1)
//         var ev=ev||window.event
//         var element=ev.target||ev.srcElement
//         if(element.nodeName=='INPUT'){
//             // console.log(chooseAll.length)
//             // alert(1)
//             // console.log(1)
//             // $('element').on('click',function(){
//             //     console.log(1)
//             // console.log($('this:checked')[0])
//              console.log($(element)[0]:checked)
//             //     if($('element:checked').length==$('element').length){
//             //         chooseAll.prop('checked',true)
//             //     }else{
//             //         chooseAll.prop('checked',false)
//             //     }
//             // })
//         }   
//     })
// }
// weituo()



// this.choose.on('click', function () {
//             // console.log($('.select:checked').length)
//             if ($('.select:checked').length == _this.choose.length) {
//                 _this.chooseAll.prop('checked', true)
//             } else {
//                 _this.chooseAll.prop('checked', false)
//             }
//         })


// this.chooseAll.on('click', function () {
//             if ($(this).prop('checked')) {
//                 _this.choose.prop('checked', true)
//             } else {
//                 _this.choose.prop('checked', false)
//             }
//         })




// 头部显示登陆注册或着登陆上显示账户
function show() {
    if (localStorage.getItem('email')) {

        dl1.hide()
        dl2.show()
        // dl2.removeClass('hide'); 
        // console.log()
        span.html(localStorage.getItem('email'))
    } else {
        // dl2.addClass('hide').siblings('dl').removeClass('hide');
        dl2.hide()
    }
    exit.on('click', function () {
        localStorage.removeItem('email')
        // _dl2.addClass('hide').siblings('dl').removeClass('hide');
        dl2.hide()
        dl1.show()
    })
}
show()

// 渲染
function render(sid, num) {
    // let _this = this
    $.ajax({
        url: '../php/cart.php',
        dataType: 'json',
    }).done(function (datalist) {
        // console.log(datalist)
        $.each(datalist, function (index, value) {
            if (datalist[index].sid == sid) {
                let strhtml = ``;
                strhtml += `<tr>
        <td class="state">
            <span class="checkbox">
                <input class="select" type="checkbox" name="pids" value="" >
            </span>
        </td>
        <td>
            <dl class="cf">
                <dt class="f_left"><a href="" target=""><img
                            src="${datalist[index].url}"
                            alt="" title=""></a></dt>
                <dd class="f_left">
                    <h1 class="cf">
                        <a href="" class="name ellipsis2" target=""
                            title="">
                            ${datalist[index].title}</a>
                    </h1>
                </dd>
            </dl>
        </td>
        
        <td>
            <input id="" type="hidden">
            <span class="amount number-input"><span class="reduce disable"></span><input id="" name="" type="text" value="${num}" min="1" maxlength="3" autocomplete="off"><span
                    class="plus"></span></span>

            <p class="stock">库存<font class='kucun'>${datalist[index].sailnumber}</font>件</p>
        </td>
        <td class="price">¥<font class='danjia'>${datalist[index].price}</font>
        </td>
        <td class="price">¥<font class='zongjia'>${datalist[index].price * num}</font>
        </td>
        <td><a href="" class="del"><span></span></a></td>
    </tr>`
                content[0].innerHTML += strhtml
            }
        })

        // 全选部分
        const choose = $('.select')
        quanxuan(choose)
        // 加减部分
        const add = $('.cart_list .amount .plus')
        const number = $('.cart_list .amount input')
        const reduce = $('.cart_list .amount .reduce')
        const kucun = $('.stock .kucun')
        const zongjia = $('.price .zongjia')
        const danjia = $('.price .danjia')
        operation(add, number, reduce, kucun, zongjia, danjia)




    })
}

function zongji(sumproduct,number){
    let a=0
    $.each(number,function(index,value){
        a+=Number(number[index].value)
    })
    sumproduct.html(a)
}



// 加减部分
function operation(add, number, reduce, kucun, zongjia, danjia,sumproduct) {
    $.each(add, function (index, value) {
        $(value).on('click', function () {
            let anum = number.eq(index).val()
            if (anum < Number(kucun.eq(index).html())) {
                anum++
                number.eq(index).val(anum)
                zongjia.eq(index).html(anum * danjia.eq(index).html())
                // sumproduct[0].innerHTML+=anum
                zongji(sumproduct,number)
            }
        })
    })
    $.each(reduce, function (index, value) {
        $(value).on('click', function () {
            let anum = number.eq(index).val()
            if (anum > 1) {
                anum--
                number.eq(index).val(anum)
                zongjia.eq(index).html(anum * danjia.eq(index).html())
            }
        })
    })
}
// 全选部分
function quanxuan(choose) {
    choose.on('click', function () {
        // console.log($('.select:checked').length)
        if ($('.select:checked').length == choose.length) {
            chooseAll.prop('checked', true)
        } else {
            chooseAll.prop('checked', false)
        }
    })
    chooseAll.on('click', function () {
        if ($(this).prop('checked')) {
            choose.prop('checked', true)
        } else {
            choose.prop('checked', false)
        }
    })
}



function cook() {
    // let _this = this;
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        let arrsid = getcookie('cookiesid').split(',');
        let arrnum = getcookie('cookienum').split(',');
        for (let i = 0; i < arrsid.length; i++) {
            render(arrsid[i], arrnum[i])//给渲染传参
        }
    }
}
cook()


// class cart {
//     constructor() {







//     }
//     init() {
//         this.selector()
//         this.show()
//         // this.render()
//         this.cook()
//     }

//     weituo(){

//     }








// }
// new cart().init();








