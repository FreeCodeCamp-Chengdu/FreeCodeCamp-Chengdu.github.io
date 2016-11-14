window.onload = function () {
    if (window.screen.availWidth < 900){
        var iconArr = document.querySelectorAll('#cf-intro .landing-skill-icon,#cf-intro .img-awesome-padding');
        /*iconArr.forEach(function (el) {
         el.className += ' animated';
         el.addEventListener("mouseover", function () {
         if (this.className.indexOf('flip') === -1) {
         this.className += ' flip';
         }
         }, false);
         el.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
         this.className = this.className.replace('flip', ' ');
         })
         });*/

        var members = [
            /*{
                "name": "余烜",
                "imgurl": "https://avatars2.githubusercontent.com/u/11681135?v=3&s=460",
                "url": ""
            },
            {"name": "王嘉琨", "imgurl": "./img/members/wangjiakun.jpg"},
            {"name": "肖鹏", "imgurl": "./img/members/xiaopeng.jpg"},
            {"name": "姜玉珍", "imgurl": "./img/members/jiangyuzhen.jpg"},
            {"name": "李春霖", "imgurl": "./img/members/lichunlin.jpg"},
            {"name": "刘小东", "imgurl": "./img/members/liuxiaodong.jpg"},
            {"name": "魏杨", "imgurl": "./img/members/weiyang.jpg"},
            {"name": "赵小强", "imgurl": "./img/members/zhaoxiaoqiang.jpg"},
            {"name": "肖彰瑾", "imgurl": "./img/members/xiaozhangjin.jpg"},
            {"name": "YaYa", "imgurl": "./img/members/yaya.jpg"},
            {"name": "凡小东", "imgurl": "./img/members/fanxiaodong.jpg"},
            {"name": "吉祥", "imgurl": "./img/members/jixiang.jpg"},
            {"name": "阿KinG", "imgurl": "./img/members/aking.jpg"},
            {"name": "Quiz42小考", "imgurl": "./img/members/quiz42xiaokao.jpg"},
            {"name": "王丹文", "imgurl": "./img/members/wangdanwen.jpg"},
            {"name": "levimin", "imgurl": "./img/members/levimin.jpg"},
            {"name": "陈科", "imgurl": "./img/members/chenke.jpg"},
            {"name": "莉莉安", "imgurl": "./img/members/lilian.jpg"},
            {"name": "吴其凡", "imgurl": "./img/members/wuqifan.jpg"},
            {"name": "周真", "imgurl": "./img/members/zhouzhen.jpg"},
            {"name": "李欣", "imgurl": "./img/members/lixin.jpg"},
            {"name": "袁伟", "imgurl": "./img/members/yuanwei.jpg"},
            {"name": "陈曦", "imgurl": "./img/members/chenxi.jpg"},
            {
                "name": "Aperture leaf",
                "imgurl": "./img/members/apertureleaf.jpg"
            },
            {"name": "恩娇", "imgurl": "./img/members/enjiao.jpg"},
            {"name": "莱昂", "imgurl": "./img/members/laiang.jpg"},
            {"name": "徐顺安", "imgurl": "./img/members/xushunan.jpg"},
            {"name": "unofficial", "imgurl": "./img/members/unofficial.jpg"},
            {"name": "书香剑墨", "imgurl": "./img/members/shuxiangmojian.jpg"},
            {"name": "我是小禾", "imgurl": "./img/members/woshixiaohe.jpg"},
            {"name": "king", "imgurl": "./img/members/king.jpg"},
            {"name": "晋剑", "imgurl": "./img/members/jinjian.jpg"},
            {"name": "Miya", "imgurl": "./img/members/miya.jpg"},
            {"name": "王峰", "imgurl": "./img/members/wangfeng.jpg"}*/
            {"name": "余烜Yasic", "imgurl": "https://avatars2.githubusercontent.com/u/11681135?v=3&s=460",},
            {"name": "王嘉琨", "imgurl": "./img/members/wangjiakun.jpg"},
            {"name": "肖鹏", "imgurl": "./img/members/xiaopeng.jpg"},
            {"name": "姜玉珍", "imgurl": "./img/members/jiangyuzhen.jpg"},
            {"name": "李春霖", "imgurl": "./img/members/lichunlin.jpg"},
            {"name": "魏杨", "imgurl": "./img/members/weiyang.jpg"},
            {"name": "赵小强", "imgurl": "./img/members/zhaoxiaoqiang.jpg"},
            {"name": "凡小东", "imgurl": "./img/members/fanxiaodong.jpg"},
            {"name": "吉祥", "imgurl": "./img/members/jixiang.jpg"},
            {"name": "Quiz42小考", "imgurl": "./img/members/quiz42xiaokao.jpg"},
            {"name": "王丹文", "imgurl": "./img/members/wangdanwen.jpg"},
            {"name": "levimin", "imgurl": "./img/members/levimin.jpg"},
            {"name": "陈科", "imgurl": "./img/members/chenke.jpg"},
            {"name": "莉莉安", "imgurl": "./img/members/lilian.jpg"},
            {"name": "李欣", "imgurl": "./img/members/lixin.jpg"},
            {"name": "陈曦", "imgurl": "./img/members/chenxi.jpg"},
            {"name": "恩娇", "imgurl": "./img/members/enjiao.jpg"},
            {"name": "晋剑", "imgurl": "./img/members/jinjian.jpg"},
            {"name": "Miya", "imgurl": "./img/members/miya.jpg"},
            {"name": "王峰", "imgurl": "./img/members/wangfeng.jpg"}
        ];

        function addHtml(o) {
            var html = '<div class="col-xs-6 col-sm-3">' +
                '<div class="thumbnail member">' +
                '<img src=' + o.imgurl + ' alt="">' +
                '<div class="caption text-center">' +
                ' <h3>' + o.name + '</h3>' +
                '</div>' +
                '</div>' +
                '</div>';
            $(html).appendTo($(".members"));
        }

        for (var i = 0; i < members.length; i++) {
            addHtml(members[i]);
        }
    }
}



$(document).ready(function () {

/* ---------- 滑动导航栏 ---------- */
//
//    [Author]    https://github.com/TechQuery
//

    /* -----  fancybox  ----- */
    $('#cf-events').each(function(i){
        $(this).find('img').each(function(){
            if ($(this).parent().hasClass('fancybox')) return;

            var alt = this.alt;

            if (alt) $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
        });

        $(this).find('.fancybox').each(function(){
            $(this).attr('rel', 'article' + i);
        });
    });

    if ($.fancybox){
        $('.fancybox').fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            helpers: {
                title: {
                    type: 'inside'
                }
            }
        });
    }
    /* ----- 页面平滑滚动 ----- */

    var $_NavItem = 'li > a[href^="#"]';

    var $_NavBar = $('#cf-navbar').on('click',  $_NavItem,  function () {

            arguments[0].preventDefault();

            $($.browser.webkit ? 'body' : 'html').scrollTo(
                this.getAttribute('href')
            );
        });


    /* ----- 显示 / 隐藏 ----- */

    var $_Content = $('body > .container > .row > :first-child'),
        isPhone = (screen.width <= 720);

    var Content_Width = $_Content.width();

    function NavToggle() {
        $_NavBar.fadeToggle(100,  function () {

            var iHidden = (this.style.display == 'none');

            if (isPhone) {
                if (! iHidden)  this.focus();
                return;
            }

            $_Content.animate({
                width:    iHidden ? '100%' : Content_Width
            }, 100);
        });
    }

    $('#cf-intro h1 i.fa').click(NavToggle);

    if (isPhone)  return $_NavBar.blur(NavToggle);


    /* ----- 页面滚动联动 ----- */

    $_NavItem = $_NavBar.find( $_NavItem );

    function NavLinkage() {
        var Current_Section = this.document.elementFromPoint(
                $_Content.offset().left + 10,  $(this).height() / 2
            );

        if (! (Current_Section || '').id)
            Current_Section = $(Current_Section).parents('*[id]')[0];

        if (! Current_Section)  return;

        $_NavItem.removeClass('active');

        $('a[href="#' + Current_Section.id + '"]').addClass('active');
    }

    NavLinkage();

    $(window).on('load scroll resize', NavLinkage);
});
