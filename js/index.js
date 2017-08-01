define([
    'jquery', 'members', 'force-vector', 'LeanCloud', 'TimeKit',
    'EasyWebUI', 'EasyWebApp', 'fancybox'
],  function ($, members, Force_Vector, LeanCloud, TimeKit) {

    LeanCloud.init({
        appId:     '8H9ovR4htxgVoqdf0BO8Stac',
        appKey:    'iNTx6f6blTD05YJFL0xuJR7U'
    });

    self.localStorage.setItem('debug', 'leancloud*');


$(document).ready(function () {


    $('.row h1').scrollFixed();


    $('#cf-events > ul').view('ListView').render(
        $.map(Array( 6 ),  function () {

            return  { };
        })
    );

    if (self.screen.availWidth >= 900) {

        $('#Skill').on(
            'mouseover',
            '.landing-skill-icon, .img-awesome-padding',
            function () {
                var $_This = $(this);

                if (! $_This.hasClass('flip'))  $_This.addClass('flip');
            }
        ).on(
            'animationend webkitAnimationEnd',
            '.landing-skill-icon, .img-awesome-padding',
            function () {
                $(this).removeClass('flip');
            }
        ).find('.col-xs-3 > :first-child').addClass('animated');

        $('.members').empty();

        Force_Vector(
            '.members',
            document.documentElement.clientWidth * 0.5,
            document.documentElement.clientHeight * 7 / 8,
            members.list
        );
    } else
        $('.members').view('ListView').render( members.list );


/* ---------- fancybox ---------- */

    $('.fancybox').fancybox({
        openEffect:     'elastic',
        closeEffect:    'elastic',
        helpers:        {
            title:    {type: 'inside'}
        }
    });

/* ---------- 成员作品集 ---------- */

    Promise.resolve(
        LeanCloud.Cloud.run('github',  {URI: 'orgs/FreeCodeCamp-Chengdu/members'})
    ).then(function () {

        return  Promise.all($.map(arguments[0],  function () {

            return  LeanCloud.Cloud.run('github', {
                URI:    'users/' + arguments[0].login + '/repos'
            });
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

    var $_Content = $('body > .container > .row > :first-child');

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

    $('.row h1 i.fa').click( NavToggle );

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