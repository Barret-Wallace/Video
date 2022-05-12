video = "";
status ="";
objects = [];
function preload(){
    video = createVideo("airport.mp4");
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function Play(){
    coco = ml5.objectDetector("cocossd", modelLoaded);
}
function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ""){
        coco.detect(video, gotResult);

        for(k=0; k < objects.length; k++){
            document.getElementById("objectAmount").innerHTML = objects.length;
            document.getElementById("info").innerHTML = "Objects Detected";
            fill("red");
            percent = floor(objects[k].confidence * 100);
            text(objects[k].label + " " + percent + "%", objects[k].x - 15, objects[k].y - 15);
            noFill();
            stroke("red");
            rect(objects[k].x, objects[k].y, objects[k].width, objects[k].height);
        }
    }
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}