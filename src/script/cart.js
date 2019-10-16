const dl1 = $('.header .wrap .userlogin')
const dl2 = $('.header .wrap .userhaslogin')
const email = $('.login_account #ipt1')
const span = $('.header .userhaslogin dt a span')
const exit = $('.header .userhaslogin dd .exit')
const content2 = $('.cart_list #cartForm .total_bar')

const chooseAll = $('.selectall');
// const choose = $('.select')
const content = $('.cart_list #cartForm #content')


let cartnull=$('.cart_null')


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
        let strhtml='';
        $.each(datalist, function (index, value) {
            if (datalist[index].sid == sid) {
                strhtml += `<tr>
        <td class="state">
            <span class="checkbox">
                <input class="select" type="checkbox" name="pids" value="" >
            </span>
        </td>
        <td >
            <dl class="cf">
                <dt class="f_left"><a href="detail.html?sid=${datalist[index].sid}" target=""><img
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
        <td class='${datalist[index].sid}'><a href="#" class="del"><span></span></a></td>
    </tr>`
            }
        })

        content.html(content.html()+strhtml);

        // 全选部分
     let choose = $('.select')

     // 加减部分
     const add = $('.cart_list .amount .plus')
     const number = $('.cart_list .amount input')
     const reduce = $('.cart_list .amount .reduce')
     
     const kucun = $('.stock .kucun')
     const zongjia = $('.price .zongjia')
     const danjia = $('.price .danjia')
     const shanchu = $('#content .del')
     operation(add, number, reduce, kucun, zongjia, danjia, choose)
     quanxuan(number, zongjia, choose)
     dele(shanchu, number, zongjia, choose)
     zongji(number,choose)
     heji(zongjia,choose)


    })
     
}

// setTimeout(function(){
//     console.log($('table tr').length);
// },300)

// 点击❌按钮删除
function dele(shanchu, number, zongjia, choose) {
    let arrsid = getcookie('cookiesid').split(',');
    let arrnum = getcookie('cookienum').split(',');
    
    $.each(shanchu, function (index, value) {
        $(value).on('click', function () {
            // console.log(number.length)
            if (confirm('你确定要删除吗')) {
                $(this).parent().parent().remove()
                // let number2=$('.cart_list .amount input')
                // let choose2=$('.select')
                // console.log(number2.length)
                for (let i = 0; i < arrsid.length; i++) {
                    if (arrsid[i] == $(this).parent().attr('class')) {
                        arrsid.splice(i, 1)
                        arrnum.splice(i, 1)
                    }
                }
                addcookie('cookiesid', arrsid.toString(), 10);
                addcookie('cookienum', arrnum.toString(), 10);
                zongji(number, choose)
                heji(zongjia, choose)
                location.reload();
            }
        })
    })



}





// 总计数量部分
function zongji(number, choose) {
    let sumproduct = $('#num')
    let a = 0
    // console.log(choose.prop('checked'))
    choose.each(function (index, value) {
        if (choose.eq(index).prop('checked')) {
            a += Number(number.eq(index).val())
        }
        sumproduct.html(a)
    })
}
// 合计价格部分
function heji(zongjia, choose) {
    let checkoutprice = $('#checkoutPrice')
    // console.log(checkoutprice[0])
    let b = 0
    choose.each(function (index, value) {
        if ($(value).prop('checked')) {
            b += Number(zongjia.eq(index).html())
        }
        checkoutprice.html(b)
    })
}





// 加减部分
function operation(add, number, reduce, kucun, zongjia, danjia, choose) {
    $.each(add, function (index, value) {
        $(value).on('click', function () {
            let anum = number.eq(index).val()
            if (anum < Number(kucun.eq(index).html())) {
                anum++
                number.eq(index).val(anum)
                zongjia.eq(index).html(anum * danjia.eq(index).html())
                // sumproduct[0].innerHTML+=anum
                // zongji(sumproduct,number)
            }
            zongji(number, choose)
            heji(zongjia, choose)
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
            zongji(number, choose)
            heji(zongjia, choose)
        })
    })
}
// 全选部分
function quanxuan(number, zongjia, choose) {
    if (chooseAll.prop('checked')) {
        choose.prop('checked', true)
    } else {
        choose.prop('checked', false)
    }
    choose.on('click', function () {
        zongji(number, choose);
        heji(zongjia, choose);
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
        zongji(number, choose);
        heji(zongjia, choose);
    })
}



function cook() {
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        let arrsid = getcookie('cookiesid').split(',');
        let arrnum = getcookie('cookienum').split(',');
        for (let i = 0; i < arrsid.length; i++) {
            render(arrsid[i], arrnum[i])//给渲染传参
        }
    }else{
        cartnull.css({
            display:'block'
        })
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








