class cart{
    constructor(){
        this.chooseAll=$('.selectall');
        this.choose=$('.select')
    }
    init(){
        this.selector()
    }
    // 全选物品
    selector(){
        let _this=this;
        this.chooseAll.on('click',function(){
            if($(this).prop('checked')){
                _this.choose.prop('checked',true)
            }else{
                _this.choose.prop('checked',false)
            }
        })
        this.choose.on('click',function(){
            // console.log($('.select:checked').length)
            if($('.select:checked').length==_this.choose.length){
                _this.chooseAll.prop('checked',true)
            }else{
                _this.chooseAll.prop('checked',false)
            }
        })
    }
    
}
new cart().init();