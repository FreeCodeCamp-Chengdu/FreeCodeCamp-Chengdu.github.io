define(['jquery', 'EasyWebUI', 'EasyWebApp', 'FancyBox'],  function ($) {


    $.ajaxPrefilter('json',  function (option, _, XHR) {

        if (option.url.indexOf('api.github.com')  >  0)
            XHR.setRequestHeader(
                'Authorization',  'token 39ff883676bf43c5723e92701487a020ad1abfb2'
            );
    });

$(document).ready(function () {

    $('.row h1').scrollFixed();


/* ---------- 温馨提示 ---------- */

    var $_Alert = $('.row .alert');

    $_Alert.on('click',  'button, a',  function () {

        $_Alert.removeClass('in');

    }).on('transitionend webkitTransitionEnd',  function () {

        $_Alert.hide();
    });

    var XHR = new (self.XDomainRequest || self.XMLHttpRequest)();

    XHR.open('GET', 'https://zh.wikipedia.org/');

    XHR.onabort = XHR.ontimeout = XHR.onload = XHR.onerror = function () {

        if ((! this.status)  ||  (this.status > 399))
            $_Alert.show().addClass('in');
    };

    XHR.send();


/* ---------- 技能矩阵 ---------- */

    if (self.screen.availWidth >= 900)
        $('#cf-intro > ul').on('mouseover',  'li > i',  function () {

            if (! this.classList.contains('animated'))
                $( this ).addClass('animated flip');

        }).on('animationend webkitAnimationEnd',  'li > i',  function () {

            $( this ).removeClass('animated flip');
        });


    var iWebApp = $('#EWA_box').iWebApp();

    iWebApp.on({
        type:    'ready',
        src:     'index.json'
    },  function () {

/* ---------- 活动集锦 ---------- */

        $('.fancybox').fancybox({
            openEffect:     'elastic',
            closeEffect:    'elastic',
            helpers:        {
                title:    {type: 'inside'}
            }
        });
    }).on({
        type:    'ready',
        src:     '/members'
    },  function (event, view) {

/* ---------- 成员作品集 ---------- */

        Promise.all(Array.from(view,  function (item) {

            return  iWebApp.load( item );

        })).then(function () {

            view.sort(function (A, B) {

                return  A.repoCount - B.repoCount;

            }).$_View.addClass('loaded');
        });
    });

/* ---------- 滑动导航栏 ---------- */
//
//    [Author]    https://github.com/TechQuery
//

    /* ----- 页面平滑滚动 ----- */

    var $_NavItem = 'li > a[href^="#"]';

    var $_NavBar = $('#cf-navbar').on('click',  $_NavItem,  function () {

            arguments[0].preventDefault();

            $($.browser.webkit ? 'body' : 'html').scrollTo(
                this.getAttribute('href')
            );
        });


    /* ----- 显示 / 隐藏 ----- */

    var $_Content = $('body > .row > :first-child');

    var Content_Width = $_Content.width();

    function NavToggle() {

        $_NavBar.fadeToggle(100,  function () {

            var iHidden = (this.style.display === 'none');

            if ( $.browser.phone ) {

                if (! iHidden)  this.focus();
            } else
                $_Content.animate({
                    width:    iHidden ? '100%' : Content_Width
                }, 100);
        });
    }

    $('.row h1 i.iconfont').click( NavToggle );

    if ( $.browser.phone )  return  $_NavBar.blur( NavToggle );


    /* ----- 页面滚动联动 ----- */

    $_NavItem = $_NavBar.find( $_NavItem );

    function NavLinkage() {

        var Current_Section = this.document.elementFromPoint(
                $_Content.offset().left + 10,  $( this ).height() / 2
            );

        if (! (Current_Section || '').id)
            Current_Section = $( Current_Section ).parents('*[id]')[0];

        if (! Current_Section)  return;

        $_NavItem.removeClass('active');

        $('a[href="#' + Current_Section.id + '"]').addClass('active');
    }

    NavLinkage();

    $( self ).on('load scroll resize', NavLinkage);
});
});
