let trainEpoch = 2;
let testEpoch = 5000;

let predictable = false;


function getMaxIndex(a){
    max = 0;
    i = 0;
    for(var c = 0; c<a.length;c++){
        if(a[c][0]>max){
            i = c
            max = a[c][0];
        }
    }
    return i;
}

function compress(x){
    return parseFloat(x) / 255.0 * 0.99 + 0.01;
}

    nn = new NeuralNetwork([784,200,10],0.5);
    canvas = document.getElementById("screen");
    ctx = canvas.getContext('2d');
    h1 =  document.getElementsByTagName("h1")[0];
    h2 =  document.getElementsByTagName("h2")[0];
   

    document.getElementById("trainingStart").addEventListener("click",function(){

        h1.innerText = "training...";
        fr = new FileReader();
        fr.onload = function(){
            var data = fr.result.split("\n");
            var i = 1;
            function myLoop(){
                setTimeout(function(){
                    row = data[i].split(',');
                    label = parseInt(row[0]);
                    input = row.slice(1,row.length).map((x)=>compress(x));
                    target = Array(10).fill(0.01);
                    target[label] = 0.99;
                    ctx.fillStyle = "rgba(0,0,0,1)";
                    nn.train([input],[target],1);
                    ctx.clearRect(0,0,280,280);
                    for(var k = 0; k<input.length;k++){
                        ctx.fillStyle = "rgba(0,0,0,"+input[k]+")";
                        ctx.fillRect((k%28)*10,(Math.floor(k/28))*10,10,10);
                    }
                    if(i<trainEpoch){
                    i++;
                    myLoop();
                    if(i==trainEpoch){
                    predictable = true;
                    document.getElementsByClassName("predict-area")[0].style.display="block";
                    }

                    }
                    else if(!predictByDraw){
                        fr2 = new FileReader();
                        fr2.onload = function(){
                            var data = fr.result.split("\n");
                            var t = 1;
                            var correct = 0;
                            var wrong = 0;
                            var iteration = 0;

                            function myLoop2(){
                                setTimeout(function(){
                                    
                                    row = data[t].split(',');
                                    label = parseInt(row[0]);
                                    input = row.slice(1,row.length).map((x)=>compress(x));
                                    target = Array(10).fill(0.01);
                                    target[label] = 0.99;
                                    res = nn.query([input]);
                                    h1.innerText= "Actual: "+label+" Prediction: "+getMaxIndex(res.matrix)
                                    iteration+=1;
                                    if(label==getMaxIndex(res.matrix))
                                    correct+=1;
                                    else
                                    wrong+=1;

                                    h2.innerText= "Correct: "+correct+" Wrong: "+wrong+" Accuracy: %"+(correct/iteration)*100
                                    ctx.clearRect(0,0,280,280);
                                    for(var k = 0; k<input.length;k++){
                                        ctx.fillStyle = "rgba(0,0,0,"+input[k]+")";
                                        ctx.fillRect((k%28)*10,(Math.floor(k/28))*10,10,10);
                                    }
                                    if(t<testEpoch){
                                        t++;
                                        myLoop2();
                                    }
                                },1);
                            }
                            myLoop2();
                        }
                        fr2.readAsText(document.getElementById("testData").files[0]);
                    }
                },1); 
            }
            myLoop();

        }
        fr.readAsText(document.getElementById("trainingData").files[0]);
    })


let drawingMode = false;
const drawingCanvas = document.getElementById("drawing");


drawingArray = Array(784).fill(0.01);

drawingCanvas.addEventListener("mousedown",()=>drawingMode=true);
drawingCanvas.addEventListener("mouseup",()=>drawingMode=false);
drawingCanvas.addEventListener("mousemove",function(e){

    if(drawingMode){
        let pixX = Math.floor(e.offsetX/10);
        let pixY = Math.floor(e.offsetY/10);
        drawingArray[pixY*28+pixX] = 0.99;
        if(Math.abs(280-pixX)>3 && Math.abs(pixX-280)< 273){
            drawingArray[(pixY-1)*28+pixX] = 0.70;
            drawingArray[(pixY+1)*28+pixX] = 0.70;
            drawingArray[(pixY)*28+pixX-1] = 0.70;
            drawingArray[(pixY)*28+pixX+1] = 0.70;
        }
    }
});

const drawingCtx = drawingCanvas.getContext('2d');

function drawingRender(){
    drawingCtx.clearRect(0,0,280,280);
    for(let i = 0;i<784;i++){
        if(drawingArray[i]!=0.01){
            ctx.fillStyle = "rgba(0,0,0,"+drawingArray[i]+")";
            drawingCtx.fillRect((i%28)*10,(Math.floor(i/28))*10,10,10);
        }
    }

    if(predictable && predictByDraw){
    let result = nn.query([drawingArray]);
    h1.innerText = "Prediction: "+getMaxIndex(result.matrix);
    }
    requestAnimationFrame(drawingRender);
}



drawingRender();


const resetBtt = document.getElementById("resetDrawing");

resetBtt.addEventListener("click",()=>drawingArray = Array(784).fill(0.01));

const predictionMode = document.getElementById("predictionMode");
const predictByDraw = true;


predictionMode.addEventListener("change",function(){
    predictByDraw = this.checked;
});