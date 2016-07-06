window.onload = function () {
    var iconArr = document.querySelectorAll('#cf-intro .landing-skill-icon,#cf-intro .img-awesome-padding');
    iconArr.forEach(function (el) {
        el.className += ' animated';
        el.addEventListener("mouseover", function () {
            if (this.className.indexOf('flip') === -1) {
                this.className += ' flip';
            }
        }, false);
        el.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
            this.className = this.className.replace('flip', ' ');
        })
    });
    for (var i = 0; i < members.length; i++) {
        addHtml(members[i]);
    }
}
var members = [
    {
        "name": "余烜",
        "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/7ed34dab193b23402247afda9e9c37ea.jpg",
        "url": ""
    },
    {"name": "王嘉琨", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/b174f68d29079bf683b583ecb556af01.jpg"},
    {"name": "肖鹏", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/22a12f8c793b3613798b261fe2cb55b4.jpg"},
    {"name": "姜玉珍", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/92f98bdd25c728d04793f2e6072233ce.jpg"},
    {"name": "李春霖", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/333bae94478c8b18861da331591e0e27.jpg"},
    {"name": "刘小东", "imgurl": "http://img1.touxiang.cn/uploads/20121102/02-071248_231.jpg"},
    {"name": "魏杨", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/3f1cb17a109d0dfeb0bef177ed048f42.jpg"},
    {"name": "赵小强", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/0c72c64aec98ffb8731ba63e7c413fa5.jpg"},
    {"name": "肖彰瑾", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/16096c9767657c3758dd724bf3308918.jpg"},
    {"name": "YaYa", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/6e8b49981de9d11df026ff1305f570e3.jpg"},
    {"name": "凡小东", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/091fa33b82ca4092bb9edee4f4fcab72.jpg"},
    {"name": "吉祥", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/5ce07c00632f059a3574c67784915e07.jpg"},
    {"name": "阿KinG", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/018b0e9165f3bb5c5331be4866dbb709.jpg"},
    {"name": "Quiz42小考", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/838691853c8db33e5dd3862060dae816.jpg"},
    {"name": "王丹文", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/cb6a3c60057dc794f28d34f060dbc5c7.jpg"},
    {"name": "levimin", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/70efb6756e469732b39261546dd7a56f.jpg"},
    {"name": "陈科", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/0d3c7771fd6544c00cc85812ba1fd2d6.jpg"},
    {"name": "莉莉安", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/534402fe3e39b91f92fd9985b4ada84d.jpg"},
    {"name": "吴其凡", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/26df2a06fb73b4677d3b1eb9a02aaa24.jpg"},
    {"name": "周真", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/589a27c6c4581915240258224c43692f.jpg"},
    {"name": "李欣", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/aba78b3c0acb433766d305602eb70077.jpg"},
    {"name": "袁伟", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/e92f08d1c0bcd358f50aaf1f592c0763.jpg"},
    {"name": "陈曦", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/b77cd3117c47a63e5251bea7047c4d4c.jpg"},
    {
        "name": "Aperture leaf",
        "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/1ac41a7ee6219ac7f858d00032868462.jpg"
    },
    {"name": "恩娇", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/0e9d9fb67efbbda6794565ce812d6fcb.jpg"},
    {"name": "莱昂", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/2c1e7a7842fb1d99382667e7941107ed.jpg"},
    {"name": "徐顺安", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/330617583f8e4268f1c32df3a1b6529d.jpg"},
    {"name": "unofficial", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/80fdcdb58ffb9989290d56f9bff909e6.jpg"},
    {"name": "书香剑墨", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/d9df1709bd4b648b4778fa0666ecd3fe.jpg"},
    {"name": "我是小禾", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/7b153aafc729e2227bfb7d315cedf2d3.jpg"},
    {"name": "king", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/7d7c794eae8cc0e583a81cd1d9656775.jpg"},
    {"name": "晋剑", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/6bcf16b9a250f2687b37dd9bf18c46b7.jpg"},
    {"name": "Miya", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/5170bc9022d3cd12fea5299257fc0fc9.jpg"},
    {"name": "王峰", "imgurl": "http://diycode.b0.upaiyun.com/photo/2016/9f4177773cbbdf42916a68199839f1cb.jpg"}
];

function addHtml(o) {
    var html = '<div class="col-sm-3">' +
        '<div class="thumbnail member">' +
        '<img src=' + o.imgurl + ' alt="">' +
        '<div class="caption text-center">' +
        ' <h3>' + o.name + '</h3>' +
        '</div>' +
        '</div>' +
        '</div>';
    $(html).appendTo($(".members"));
}
