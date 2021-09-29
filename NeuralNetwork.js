class NeuralNetwork{
    constructor(layers,lr){
        this.len = layers.length;
        this.activation = function(x){
            return 1.0/(1.0+Math.exp(-x));
        }
        this.entries = [];
        this.activated = [];
        this.weights = [];
        this.errors = [];

        this.lr = lr;
        this.lastEpoch = 0;

        for(var i = 1; i<this.len;i++){
            this.weights[i] = MyMath.createMatrix(layers[i],layers[i-1]);
            this.weights[i].initialize()
        }
    }

    train(inputs,targets,epoch){
        inputs = MyMath.matrix(inputs).T();
        targets = MyMath.matrix(targets).T();
        this.entries[0] = this.activated[0] = inputs;
        
        for(var i = 0; i<epoch;i++){

            for(var k = 1; k<this.len;k++){

                this.entries[k] = MyMath.dot(this.weights[k],this.activated[k-1]);
                this.activated[k] = MyMath.createMatrix(this.entries[k].row,this.entries[k].col);
                this.activated[k].matrix = this.entries[k].matrix.map((row) =>{
                    return row.map((cell)=>{
                        return this.activation(cell);
                    });
                });
            }

            this.errors[this.len-1] = MyMath.subtract(targets,this.activated[this.len-1]);

            for(var k = this.len-2; k>0;k--){
                this.errors[k] = MyMath.dot(this.weights[k+1].T(),this.errors[k+1]);
            }

            for(var k = this.len-1 ; k>0; k--){
                var derivateSigmoid = MyMath.subtract(MyMath.createMatrix(this.activated[k].row,this.activated[k].col).fill(1.0),this.activated[k]);
                var errOut = MyMath.multiply(this.errors[k],this.activated[k]);
                var errIn = MyMath.multiply(errOut,derivateSigmoid);
                var errPrev = MyMath.dot(errIn,this.activated[k-1].T());
                var scaled = MyMath.scale(errPrev,this.lr);
                this.weights[k] = MyMath.add(this.weights[k],scaled)
            }

            var error = 0;

            for(var a = 0; a<this.errors[this.len-1].row;a++){
                for(var b = 0; b<this.errors[this.len-1].col;b++){
                    error+= Math.sqrt(this.errors[this.len-1].matrix[a][b] * this.errors[this.len-1].matrix[a][b]);
                }  
            }

            this.lastEpoch+=1;
            console.log("Epoch #"+this.lastEpoch+" Error: ",error);
        }

    }

    query(inputs){
        inputs = MyMath.matrix(inputs).T();
        this.entries[0] = this.activated[0] = inputs;

        for(var k = 1; k<this.len;k++){
            this.entries[k] = MyMath.dot(this.weights[k],this.activated[k-1]);
            this.activated[k] = MyMath.createMatrix(this.entries[k].row,this.entries[k].col);

            this.activated[k].matrix = this.entries[k].matrix.map((row) =>{
                return row.map((cell)=>{
                    return this.activation(cell);
                });
            });

        }
        return this.activated[this.len-1];
    }



}

