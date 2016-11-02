/**
 * Created by yasic on 16-9-3.
 */
if (window.screen.availWidth > 900){
    var data = {
        "nodes" : [
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
        ],
        /*"links": [
         {"source":1,"target":0},    {"source":2,"target":1},
         {"source":3,"target":2},    {"source":4,"target":3},
         {"source":5,"target":4},    {"source":6,"target":0},
         {"source":7,"target":6},    {"source":8,"target":7},
         {"source":9,"target":8},    {"source":10,"target":9},
         {"source":11,"target":0},    {"source":12,"target":11},
         {"source":13,"target":12},    {"source":14,"target":13},
         {"source":15,"target":14},    {"source":16,"target":0},
         {"source":17,"target":16},    {"source":18,"target":17},
         {"source":19,"target":18},
         ],*/
        "links": [
            {"source":1,"target":0},    {"source":2,"target":1},
            {"source":3,"target":2},    {"source":4,"target":3},
            {"source":5,"target":4},    {"source":6,"target":5},
            {"source":7,"target":6},    {"source":8,"target":7},
            {"source":9,"target":8},    {"source":10,"target":9},
            {"source":11,"target":10},    {"source":12,"target":11},
            {"source":13,"target":12},    {"source":14,"target":13},
            {"source":15,"target":14},    {"source":16,"target":15},
            {"source":17,"target":16},    {"source":18,"target":17},
            {"source":19,"target":18},    {"source":0,"target":19},
        ]
        /*"links": [
         {"source":1,"target":0},    {"source":2,"target":0},
         {"source":3,"target":0},    {"source":4,"target":0},
         {"source":5,"target":0},    {"source":6,"target":0},
         {"source":7,"target":0},    {"source":8,"target":0},
         {"source":9,"target":0},    {"source":10,"target":0},
         {"source":11,"target":0},    {"source":12,"target":0},
         {"source":13,"target":0},    {"source":14,"target":0},
         {"source":15,"target":0},    {"source":16,"target":0},
         {"source":17,"target":0},    {"source":18,"target":0},
         {"source":19,"target":0},
         ]*/
    }

    var width = document.documentElement.clientWidth * 0.5,
        height = document.documentElement.clientHeight * 7/8;

    var svg = d3.select("body").select(".members").append("svg")
        .attr("width", width)
        .attr("height", height)


    var force = d3.layout.force()
        .size([width, height * 7/8])
        .linkDistance(height/3)
        .linkStrength(0.8)
        .theta(0.1)
        .charge([-500])
        .nodes(data.nodes)
        .links(data.links)
        .start();

    var color=d3.scale.category20c();

    /*var index = 0;

     var defs = svg.selectAll("defs")
     .data(data.nodes)
     .enter()
     .append("defs");

     var rects = defs.selectAll("rect")
     .data([1])
     .enter()
     .append("rect")
     .attr("id", function(d){return "rect-" + d.name})
     .attr("x", "25%")
     .attr("y", "15%")
     .attr("width", img_width)
     .attr("height", img_height)
     .attr("rx", "100");

     var clipPath = rects.selectAll("clipPath")
     .data([1])
     .enter()
     .append("clipPath")
     .attr("width", img_width)
     .attr("height", img_height);

     clipPath.selectAll("use")
     .data(data.nodes)
     .enter()
     .append("use")
     .attr("xlink:href", function (d) {
     return "#" + d.name;
     });*/

    var node = d3.select("members-city")
        .append("svg:image")
        .attr("class", "circle").attr("xlink:href", "https://avatars2.githubusercontent.com/u/11681135?v=3&s=460")
        .attr("x", "20px").attr("y", "20px")
        .attr("width", "16px")
        .attr("height", "16px");

    var link = svg.selectAll(".link")
            .data(data.links)
            .enter()
            .append("line")
            .style("stroke","#ccc")
            .style("stroke-width",1)
        ;


    /*var node = svg.selectAll(".node")
     .data(data.nodes)
     .enter()
     .append("circle")
     .attr("fill", function(d,i){ return color(i);})
     .attr("r", 5)
     .attr("stroke","black")
     .attr("stroke-width",1).call(force.drag());*/

    var img_width = 40;
    var img_height = 40;

    var nodes_img = svg.selectAll("image")
        .data(data.nodes)
        .enter()
        .append("image")
        .attr("width", img_width)
        .attr("height",img_height)
        .attr("class", "member-image")
        .attr("xlink:href",function(d){
            return d.imgurl;
        })
        .attr("shape", "circle")
        .call(force.drag);

    var text_dx = 20;
    var text_dy = 20;

    var nodes_text = svg.selectAll(".nodetext")
        .data(data.nodes)
        .enter()
        .append("text")
        .attr("class","nodetext")
        .attr("dx",text_dx)
        .attr("dy",text_dy)
        .text(function(d){
            return d.name;
        });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        nodes_img.attr("x",function(d){ return d.x - img_width/2; });
        nodes_img.attr("y",function(d){ return d.y - img_height/2; });

        nodes_text.attr("x",function(d){ return d.x });
        nodes_text.attr("y",function(d){ return d.y + img_height/2; });

        /*defs.attr("x",function(d){ return d.x - img_width/2 });
         defs.attr("y",function(d){ return d.y + img_height/2; })*/

    });
}