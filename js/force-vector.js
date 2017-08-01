/**
 * Created by yasic on 16-9-3.
 *
 * Optimized by TechQuery on 17-8-1
 */

define(['d3'],  function (d3) {

    return  function ($_Root, width, height, list) {

        var data = {
                nodes:    list,
                links:    $.map(list,  function (_, index) {

                    return {
                        source:    index,
                        target:    list[index + 1]  ?  (index + 1)  :  0
                    };
                })
            };

    var svg = d3.select("body").select( $_Root ).append("svg")
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

    var color = d3.scale.category20c();

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
            .style("stroke-width",1);

    /*var node = svg.selectAll(".node")
     .data(data.nodes)
     .enter()
     .append("circle")
     .attr("fill", function(d,i){ return color(i);})
     .attr("r", 5)
     .attr("stroke","black")
     .attr("stroke-width",1).call(force.drag());*/

    var img_width = 40,  img_height = 40;

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

    var nodes_text = svg.selectAll(".nodetext")
        .data(data.nodes)
        .enter()
        .append("text")
        .attr("class","nodetext")
        .attr('dx', 20)
        .attr('dy', 20)
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
    };
});