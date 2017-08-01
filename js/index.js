define([
    'jquery', 'members', 'force-vector', 'EasyWebUI', 'EasyWebApp', 'fancybox'
],  function ($, members, Force_Vector) {

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


/* -----  fancybox  ----- */

    $('.fancybox').fancybox({
        openEffect:     'elastic',
        closeEffect:    'elastic',
        helpers:        {
            title:    {type: 'inside'}
        }
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