class de{
    constructor(){
        this.bdli=$('.bd #tempWrap_ul li')
        this.hdli=$('.hd li');
        this.liimg=$('#tempWrap_ul li img');
        // this.di=$('.hd')
        // this.aA=$('.wrap_dota2-top-nav a')
    }
    
    init(){
        this.first();
    }
    first(){
        let _this=this;
        this.hdli.on('click',function(){

            $(this).addClass('on').siblings('.hd li').removeClass('on');
        //    _this.bdul.style.left= -($(this).index('.hd li')-0)*430+'px'
            _this.bdli.eq($(this).index('.hd li')).addClass('show').siblings('.bd li').removeClass('show');
        })
    }
}
new de().init()
