window.onload = function(){
    var iconArr = document.querySelectorAll('#cf-intro .landing-skill-icon,#cf-intro .img-awesome-padding');
    iconArr.forEach(function(el){
        el.className += ' animated';
        el.addEventListener("mouseover", function(){
            if (this.className.indexOf('flip') === -1){
                this.className += ' flip';
            }
        }, false);
        el.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
            this.className = this.className.replace('flip', ' ');
        })
    })
}