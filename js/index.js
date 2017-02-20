define([
    'jquery', 'members', 'member.animation', 'jQuery+', 'fancybox'
],  function ($, members) {

$(document).ready(function () {

    if (self.screen.availWidth >= 900)
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
    else
        $('.members').append($.map(members.list,  function (_This_) {
            return  "\n" +
                '<div class="col-xs-6 col-sm-3">' +
                    '<div class="thumbnail member">' +
                        '<img src="' + _This_.imgurl + '">' +
                        '<div class="caption text-center">' +
                            '<h3>' + _This_.name + '</h3>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        }).join(''));


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

    $('.fancybox').fancybox({
        openEffect: "elastic",
        closeEffect: "elastic",
        helpers: {
            title: {
                type: 'inside'
            }
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
});