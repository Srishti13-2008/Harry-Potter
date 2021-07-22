song=""
leftwristX=0
leftwristY=0
rightwristX=0
rightwristY=0
scoreleftWrist=0
scorerightWrist=0
function preload(){
    song=loadSound("music.mp3")
}
function setup(){
    canvas= createCanvas(600,500)
    canvas.center();
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video, modelloaded)
    poseNet.on('pose', gotposes)
}
function modelloaded(){
console.log("PoseNet is Initilized")
}
function draw(){
    image(video,0,0,600,500)
    fill("#FF0000")
    stroke("#FF0000")
    if(scorerightWrist>0.2){
        circle(rightwristX,rightwristY,20)
    }
    if(rightwristY>0 && rightwristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5x"
        song.rate(0.5)
    }
    else if(rightwristY>100 && rightwristY<=200){
        document.getElementById("speed").innerHTML="speed=1x"
        song.rate(1)
    }
    else if(rightwristY>200 && rightwristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x"
        song.rate(1.5)
    }
    else if(rightwristY>300 && rightwristY<=400){
        document.getElementById("speed").innerHTML="speed=2x"
        song.rate(2)
    }
    else if(rightwristY>400){
        document.getElementById("speed").innerHTML="speed=2.5x"
        song.rate(2.5)
    }
    if(scoreleftWrist>0.2){
        circle(leftwristX,leftwristY,20);
        num1=Number(leftwristY)
        num2=floor(num1)
        volume=num2/500
        document.getElementById("volume").innerHTML="volume="+volume
        song.setVolume(volume)
    }
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
function gotposes(results){
if(results.length>0){
    console.log(results)
    scoreleftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftWrist="+scoreleftWrist)
    scorerightWrist=results[0].pose.keypoint[10].score;
    console.log("scorerightWrist="+scorerightWrist)
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("leftWristX="+leftwristX+"leftwristY="+leftwristY)
    console.log("rightWristX="+rightwristX+"rightwristY="+rightwristY)
}
}