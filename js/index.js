define([
    'jquery', 'TimeKit', 'skill', 'EasyWebUI', 'EasyWebApp', 'fancybox'
],  function ($, TimeKit, skill) {

$(document).ready(function () {

    $('.row h1').scrollFixed();


/* ---------- 技能矩阵 ---------- */

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


    var $_Skill = $('#cf-intro > ul');

    $_Skill.view('ListView').render( skill.list );

    $('#cf-events > ul').view('ListView').render(
        $.map(Array( 6 ),  function () {

            return  { };
        })
    );

    if (self.screen.availWidth >= 900)
        $_Skill.on('mouseover',  'li > i',  function () {

            if (! this.classList.contains('animated'))
                $( this ).addClass('animated flip');

        }).on('animationend webkitAnimationEnd',  'li > i',  function () {

            $( this ).removeClass('animated flip');
        });

/* ---------- 活动集锦 ---------- */

    $('.fancybox').fancybox({
        openEffect:     'elastic',
        closeEffect:    'elastic',
        helpers:        {
            title:    {type: 'inside'}
        }
    });

/* ---------- 成员作品集 ---------- */

    Promise.resolve(
        $.getJSON('//api.github.com/orgs/FreeCodeCamp-Chengdu/members')
    ).then(function () {

        return  Promise.all($.map(arguments[0],  function () {

            return $.getJSON(
                '//api.github.com/users/' + arguments[0].login + '/repos'
            );
        }));
    }).then(function () {

        return  $.map(arguments[0],  function (_This_) {

            var data = _This_[0].owner;

            data.repos = $.map(_This_,  function (_This_) {

                if (_This_.fork || !(
                    _This_.forks_count +
                    _This_.watchers_count +
                    _This_.stargazers_count
                ))
                    return;

                delete _This_.owner;

                _This_.passedTime = TimeKit.passed(
                    _This_.pushed_at = new Date( _This_.pushed_at )
                );

                return _This_;

            }).sort(function (A, B) {

                return  (new Date( B.pushed_at ) - new Date( A.pushed_at ))  ||
                    (B.stargazers_count - A.stargazers_count)  ||
                    (B.watchers_count - A.watchers_count)  ||
                    (B.forks_count - A.forks_count);
            });

            return data;

        }).sort(function (A, B) {

            return  A.repos.length - B.repos.length;
        });
    }).then(function () {

        $('#cf-gallery div').addClass('loaded')
            .view('ListView').render( arguments[0] );
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
