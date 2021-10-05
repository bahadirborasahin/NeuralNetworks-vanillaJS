let trainEpoch = 5000;
let testEpoch = 5000;

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
                    }
                    else{
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



