 var textType = function(el, runText, periode){
        this.runText = runText;
        this.el =el;
        this.loopNum = 0;
        this.periode = parseInt(periode, 20) || 1000;
        this.txt = ' ';
        this.tick();
        this.isDeleting = false;
    };
    textType.prototype.tick = function(){
        var i = this.loopNum % this.runText.length;
        var fullText = this.runText[i];
        if(this.isDeleting){
            this.txt = fullText.substring(0, this.txt.length - 1);
        }else{
            this.txt = fullText.substring(0, this.txt.length + 1);
        }
        
        this.el.innerHTML = '<span class="rtx">'+this.txt+'</span>';
        var that = this;
        var dell = 50 - Math.random() + 10;
        if(this.isDeleting) { dell /= 1; }
        if(!this.isDeleting && this.txt === fullText){
            dell = this.periode;
            this.isDeleting = true;
        }else if(this.isDeleting && this.txt === ''){
            this.isDeleting = false;
            this.loopNum++;
            dell = 200;
        }
        setTimeout(function(){
            that.tick();
        }, dell);
    };
    window.onload = function(){
        var elements = document.getElementsByClassName('title_run');
        for(var i = 0; i<elements.length; i++){
            var runText = elements[i].getAttribute('data-type');
            var periode = elements[i].getAttribute('data-period');
            if(runText){
                new textType(elements[i], JSON.parse(runText), periode);
            }
        }
        
        var css = document.createElement('style');
        css.type = "text/css";
        // css.innerHTML = ".title_run > .rtx {border-right: 1px solid #3F68E8}";
        document.body.appendChild(css);
    };
    
    function showTime() {
    var a_p = "";
    var today = new Date();
    var curr_hour = today.getHours();
    var curr_minute = today.getMinutes();
    var curr_second = today.getSeconds();

    if (curr_hour < 12) {
        a_p = "AM";
    } else {
        a_p = "PM";
    }

    if (curr_hour == 0) {
        curr_hour = 12;
    }

    // if (curr_hour == 12) {
    //     curr_hour = curr_hour + 12;
    // }

    curr_hour = checkTime(curr_hour);
    curr_minute = checkTime(curr_minute);
    curr_second = checkTime(curr_second);
    document.getElementById('time').innerHTML = "<i class='mdi mdi-clock'></i>" + "&nbsp;" + "&nbsp;" + curr_hour + ":" + curr_minute + ":" + curr_second + " " + a_p;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

setInterval(showTime, 500);
    