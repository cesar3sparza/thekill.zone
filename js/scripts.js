//add fire function to keydown
//explosion.remove?

$(document).load(gamestage());
var introcenter = ($('#gaamestage').width() / 2) - ($('#intro').width() / 2);
var buttoncenter = ($('#intro').width() / 2) - ($('.startButton').width() / 2);

$('#intro').css({
    marginLeft:introcenter,
    marginTop:150
});

$('.startButton').css({
    marginLeft:buttonCenter,
    marginTop:15
});

function startgame(){
    $('#intro').remove();
    $('.explosion').remove();
    $('.endgamescreen').remove();
    $('#gamestage').append('div id="ship">');
    var dronetimer = setInterval(enemydrone, 4000);
    var frametimer = setInterval(bgframe, 10);
    $('body').append($('<div>').addClass('scoreboard'));
    var scoreboardLeft = $('#gamestage').position().left;
    $('.scoreboard').css({
        marginLeft:scoreboardLeft
    });
    $('scoreboard').append('<h1>').addClass('score');

    function collision(){
    $('.enemydrone').each(function(){
        var friendly = $('#ship');
        var enemy = $('.enemydrone');
        var shotfired = $('.bullet');

        $('.enemydrone').each(function(){
            if(recthit(friendly,enemy) == true){
                shipexplode();
                droneexplode();
                $(this).remove();
                $('#ship').remove();
                clearInterval(frametimer);
                clearInterval(dronetimer);
            } else if(recthit(shotfired,enemy) == true) {
                addscore();
                droneexplode();
                $(this).remove();
            }
        });
    });
    }
    setInterval(collision,10);
}

var currentScore = 0;
function addScore(){
    currentScore += 10;
    $('.score').html(currentScore);
}

function shipexplode(){
    var shipdeathTop = $('#ship').position().top;
    var shipdeathLeft = $('#ship').position().left;
    var explode = $('<img>');
    $(explode).attr('src','img/explosion.gif');
    $(explode).addClass('explosion');
    $('#gamestage').append(explode);
    $(explode).css({
        top: shipdeathTop,
        left: shipdeathLeft
    });
    gameover();
}

function droneexplode(){
    var dronedeathTop = $('.enemydrone').position().top;
    var dronedeathLeft = $('.enemydrone').position().left;
    var explode = $('<img>').addClass('explosion');
    $(explode).css({
        top: dronedeathTop,
        left:dronedeathLeft
    });
}

function gamestage(){
    $('#gamestage').css({
        left: 0,
        top: 0
    });
}

var dir = {
    up: false,
    down: false,
    left: false,
    right: false
}

var speed = 3.5;

$(document).keydown(function(e){
    console.log(e.which);
    //up 38
    if(e.which == 38){
        dir.up = true;
    }
    //down 40
    if(e.which == 40){
        dir.down = true;
    }
    //left 37
    if(e.which == 37){
        dir.right = true;
    }
    //right 39
    if(e.which == 39){
        dir.right = true;
    }
});//end keydown

$(document).keyup(function(e){
    //up 38
    if(e.which ==38){
        dir.up = false;
    }
    //down 40
    if(e.which == 37){
        dir.left = false;
    } 
    //left 37
    if(e.which == 37){
        dir.left = false;
    }
    //right 39
    if(e.which){
        dir.right = false;
    }
});

function shipmove(){
    var newtop = 0;
    var newleft = 0;

    if(dir.up == true){
        if($('#ship').position().top > 50){
            newtop -= speed;
        }
    }
    if(dir.down == true){
        if($('#ship').position().top < $('#gamestage').height() - $('#ship').height()){
            newtop += speed;
        }
    }
    if(dir.left == true){
        if($('#ship').position().left > -($('#ship').width() / 4)){
            newleft -= speed;
        }
    }
    if(dir.right == true){
        if($('#ship').position().left < $('#gamestage').width() / 1.15){
            newleft -= speed;
        }
    }

    $('#ship').css({
        top:'+='+newtop,
        left:'+='+newleft
    });
}//end shipmove

setInterval(shipmove, 30/1000);

$(document).keydown(function(e){
    if(e.which == 83){
        var bullet = $('<div>').addClass('bullet');
        var shiptop = $('#ship').position().top - 80;
        var shipleft = $('#ship').position().left + (('#ship').width() / 2.29);

        bullet.css({
            top:shiptop,
            left:shipleft
        });

        $('#gamestage').append(bullet);

        bullet.animate({
            top: 0
        },600,function(){
            $(this).remove();
            $(explosion).remove();
        });
    }
});

var bgpos = 0;

function bgframe(){
    bgpos += 2;

    $('#gamestage').css({
        'background-position':'0px ' + bgpos + 'px'
    });
}

function enemydrone(){
    var randomSpoint = Math.random() + ($('#gamestage').width() - $('.enemydrone').width());
    randompath = Math.random() * ($('#gamestage').width());

    var createenemy = $('<div>').addClass('enemydrone');
    $('#gamestage').append(createenemy);
    $('.explosion').remove();
    $('.enemydrone').css({
        top:-320,
        left:randomSpoint
    });

    $('.enemydrone').animate({
        top:1000,
        left:randompath
    },2400,function(){
        $(this).remove();
    });
}

//collision detection algorithm
function recthit(rectone, recttwo){
    
    var r1 = $(rectone);
    var r2 = $(recttwo);
    
    var r1x = r1.position().left;
    var r1w = r1.width();
    var r1y = r1.position().top;
    var r1h = r1.height();
    
    var r2x = r2.position().left;
    var r2w = r2.width();
    var r2y = r2.position().top;
    var r2h = r2.height();
    
    if( r1y+r1h < r2y ||
        r1y > r2y+r2h ||
        r1x > r2x+r2w ||
        r1x+r1w < r2x ){
        return false;
    }else{
        return true;   
    }
    
}

function gameover(){
    $('.explosion').remove();
    $('#gamestage').append($('<div>').addClass('endgamescreen'));
    $('.endgamescreen').append('<h1>gameOver</h1>');
    $('.endgamescreen').append('<p>playAgain?</p>');
    $('endgamescreen').append('<input type="button" value="playAgain" class="startButton" onclick="startgame()">');
    $(document).keydown(function(e){
        if(e.which == 13){
            startgame();
        }
    });

    var buttoncenter = ($('.endgamescreen').width() / 2) - ($('.startButton').width() / 2);
    $('.startButton').css({
        marginLeft:buttoncenter,
        marginTop:15
    });
}