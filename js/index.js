define(['jquery', 'EasyWebUI', 'EasyWebApp'],  function ($) {


    $.ajaxPrefilter('json',  function (option, _, XHR) {

        if (option.url.indexOf('api.github.com')  >  0)
            XHR.setRequestHeader(
                'Authorization',  'token 39ff883676bf43c5723e92701487a020ad1abfb2'
            );
    });

$(document).ready(function () {

    $('.row h1').scrollFixed();


/* ---------- 温馨提示 ---------- */

    var XHR = new (self.XDomainRequest || self.XMLHttpRequest)();

    XHR.open('GET', 'https://zh.wikipedia.org/');

    XHR.onload = function () {

        if (this.status < 400)  $().alert('close');
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
        src:     '/members'
    },  function (event, view) {

/* ---------- 成员作品集 ---------- */

        Promise.all(Array.from(view,  function (item) {

            return  iWebApp.load( item );

        })).then(function () {

            view.sort(function (A, B) {

                return  A.repoCount - B.repoCount;
            });
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

        var section = document.elementFromPoint(
                $_Content.offset().left + parseFloat(
                    $_Content.css('padding-left')
                ),
                $( this ).height() / 2
            );

        if (section.parentNode !== $_Content[0])
            section = $( section ).parentsUntil( $_Content ).slice(-1)[0];

        if (! section)  return;

        $_NavItem.removeClass('active');

        $('a[href="#' + section.id + '"]').addClass('active');
    }

    NavLinkage();

    $( self ).on('load scroll resize',  $.throttle( NavLinkage ));
});
});
