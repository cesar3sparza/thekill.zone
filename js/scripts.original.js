//load the gamestage
$(document).load(gamestage());
//show the intro screen
var introcenter = ($('#gamestage').width() / 2) - ($('#intro').width() / 2) ;
//display the start button
var buttoncenter = ($('#intro').width() / 2) - ($('.startButton').width() / 2) ;

//position the intro button
$('#intro').css({
    marginLeft:introcenter,
    marginTop:150
}); 

//position the start button
$('.startButton').css({
    marginLeft:buttoncenter,
    marginTop:15
}); 

function startgame(){
    $('#intro').remove();
    $('.explosion').remove();
    $('.endgamescreen').remove();
    $('#gamestage').append('<div id="ship">');
    var dronetimer = setInterval(enemydrone, 4000);
    //run bgframe() over and over again
    var frametimer = setInterval(bgframe,10);
    
    $('body').append($('<div>').addClass('scoreboard'));
    var scoreboardleft = $('#gamestage').position().left;
    $('.scoreboard').css({
        marginLeft: scoreboardleft
    });
    $('.scoreboard').append('<h1>').addClass('score');
    
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
               } else if(recthit(shotfired,enemy) == true){
                    addscore();
                    droneexplode();
                    $(this).remove();
               }

            }); //end second enemydrone().each
    }); //end first enemydrone().each
    
} //end collision()

setInterval(collision,10);
    
}

var currentScore = 0;
function addscore(){
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
    $('#gamestage').append(explode);
    $(explode).css({
        top: dronedeathTop,
        left: dronedeathLeft
    });
}


function gamestage(){

//determine #gamestage center and store in variable
// var gsplace = ( ( $(window).width() / 2 ) - ( $('#gamestage').width() / 2));
    
//center the gamestage    
$('#gamestage').css({
            left:0,
            top: 10
            });
    }
    
//direction variable
    var dir = {
        up: false,
        down: false,
        left: false,
        right: false
    }
    
    var speed = 3.5;//speed of the ship movement (px)
    
    //keyboard event for turning the directions on and off
    $(document).keydown(function(e){
    
        console.log(e.which);
        
        //up 38
        if( e.which == 38 ){
            dir.up = true; //turn 'on' the up direction
        }
        //down 40
        if( e.which == 40 ){
            dir.down = true; //turn 'on' the up direction
        }
        //left 37
        if( e.which == 37 ){
            dir.left = true; //turn 'on' the up direction
        }
        //right 39
        if( e.which == 39 ){
            dir.right = true; //turn 'on' the up direction
        }
    
    });//end keydown
    
    $(document).keyup(function(e){
    
        //console.log(e.which);
        
        //up 38
        if( e.which == 38 ){
            dir.up = false; //turn 'on' the up direction
        }
        //down 40
        if( e.which == 40 ){
            dir.down = false; //turn 'on' the up direction
        }
        //left 37
        if( e.which == 37 ){
            dir.left = false; //turn 'on' the up direction
        }
        
        //right 39
        if( e.which == 39 ){
            dir.right = false; //turn 'on' the up direction
        }
        
        //spacebar 32
        if( e.which == 32 ){
            //decrease speed variable
            speed = 2;
        }
    
    });//end keyup
    

    //setup movement function
    //this function will run over and over at a regular interval
    function shipmove(){
    
        
        
        //output the dir variables 
        //console.log( '1'+dir.up +','+ dir.down );
        //console.log( '2'+dir.left +','+ dir.right );
        
        var newtop = 0;
        var newleft = 0;
        
        //check directions and add or subtract to addtop/addleft
        
        if( dir.up == true ){
            if($('#ship').position().top > 50 ){
            newtop -= speed;
                  }
        }
        if( dir.down == true ){
            if($('#ship').position().top < $('#gamestage').height() - $('#ship').height() ){
            newtop += speed;
            }
        }
        if( dir.left == true ){
            //if ship hasn't reached the edge of the gamestage, allow move left
            if($('#ship').position().left > -($('#ship').width() / 4 ) ){
            newleft -= speed;
            }
        }
        if( dir.right == true ){
            //if ship hasn't reached the edge of the gamestage, allow move right
            if( $('#ship').position().left <  $('#gamestage').width() / 1.15){
            newleft += speed;
            }
            
        }
        
        $('#ship').css({
            top:'+='+newtop,
            left:'+='+newleft
        });
        
    }//end shipmove()


    //run the shipmove function at an interval
    setInterval(shipmove, 30/1000);
    
    //add a click function to shoot bullets
    $(document).keydown(function(e){
        console.log(e.which);
        
        if(e.which == 83){
        //create a new div and give it a class of bullet
        var bullet = $('<div>').addClass('bullet');
        
        //add starting top and left value to bullet
        var shiptop = $('#ship').position().top - 80;
        var shipleft = $('#ship').position().left + ( $('#ship').width() / 2.29 );
        
            bullet.css({
                top:shiptop,
                left:shipleft
            });
        
        //add a new bullet div to #gamestage
        $('#gamestage').append(bullet);
        
        //animate bullets
        bullet.animate({
            top:0
        },600,function(){
            //animate callback runs when the animation is complete
            $(this).remove();
            $(explosion).remove();
        });//end .bullet animate
        }//end if loop
    });//end of keydown function
    
    
    var bgpos = 0;
    
    function bgframe(){
    //this will be a single frame of the background moving
    
        //add 2 to bgpos
        bgpos +=2;
        
        $('#gamestage').css({
            'background-position':'0px '+bgpos+'px'
               });
    
    }   //end bgframe()

    function enemydrone(){
        // create the startingpoint and path variables
        var randomSpoint = Math.random() * ($('#gamestage').width() - $('.enemydrone').width() );
        var randompath = Math.random() * ($('#gamestage').width());
        
        //append the .enemydrone to #gamestage
        var createenemy = $('<div>').addClass('enemydrone');
        $('#gamestage').append(createenemy);
        $('.explosion').remove();
        // assign enemydrone random startingpoint 
        $('.enemydrone').css({
                top:-320,
                left:randomSpoint
                         });
        
        // assign a flightpath
        $('.enemydrone').animate({
            top:1000,
            left:randompath
        },2400,function(){
            //remove the drone div when it reaches end of path
            $(this).remove();
        });
        
} //end enemydrone()

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
    
}//end recthit() 

function gameover(){
    $('.explosion').remove();
    $('#gamestage').append($('<div>').addClass('endgamescreen'));
    $('.endgamescreen').append('<h1>gameOver</h1>');
    $('.endgamescreen').append('<p>playAgain?</p>');
    $('.endgamescreen').append('<input type="button" value="playAgain" class="startButton" onclick="startgame()">');
    $(document).keydown(function(e){
        if(e.which == 13) {
            startgame();
        }
    });


    var buttoncenter = ($('.endgamescreen').width() / 2) - ($('.startButton').width() / 2) ;
$('.startButton').css({
    marginLeft:buttoncenter,
    marginTop:15
}); 
}