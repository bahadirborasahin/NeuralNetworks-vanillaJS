class Matrix{
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.matrix = [];
        for(var i=0; i<row;i++){
            this.matrix[i] = new Array(col);
        }
    }


    initialize(){
        for(var i =0; i<this.row;i++){
            for(var k = 0;k<this.col;k++){
                this.matrix[i][k] = Math.random()*2 - 1;
            }
        }
    }

    fill(x){
        var temp = new Matrix(this.row,this.col);

        for(var i = 0; i<this.row;i++){
            for(var k = 0; k<this.col;k++){
                temp.matrix[i][k] = x;
            }
        }

        return temp
    }

    T(){
        var temp = new Matrix(this.col,this.row);

        for(var i = 0; i<this.row;i++){
            for(var k = 0; k<this.col;k++){
                temp.matrix[k][i] = this.matrix[i][k];
            }
        }

        return temp

    }

    print(){
        console.table(this.matrix);
    }
}


class MyMath{
    static createMatrix(row,col){
        return new Matrix(row,col);
    }

    static matrix(m){
        var temp = new Matrix(m.length, m[0].length);
        temp.matrix = m;
        return temp;
    }

    static dot(m1, m2){
        if(m1.col != m2.row){
            throw "Shape Error: ("+m1.row+","+m1.col+") dot ("+m2.row+","+m2.col+") is not possible";
        }
        else{
            var product = new Matrix(m1.row,m2.col)
    
            for(var i = 0; i<product.row;i++){
                for(var k = 0; k<product.col;k++){
                    product.matrix[i][k] = 0;
    
                    for(var a = 0; a<m1.col;a++){
                        product.matrix[i][k] += m1.matrix[i][a] * m2.matrix[a][k]
                    }
    
                }
            }
    
            return product;
    
        }
    }

    static subtract(m1,m2){
        if(m1.row != m2.row || m1.col!=m2.col){
            throw "Shape Error: ("+m1.row+","+m1.col+") dot ("+m2.row+","+m2.col+") is not possible";
        }
        else{
            var temp = new Matrix(m1.row,m1.col);
    
            for(var i=0;i<m1.row;i++){
                for(var k=0;k<m1.col;k++){
                    temp.matrix[i][k] = m1.matrix[i][k] - m2.matrix[i][k];
                }
            }
    
            return temp;
        }



        

}
static add(m1,m2){
    if(m1.row != m2.row || m1.col!=m2.col){
        throw "Shape Error: ("+m1.row+","+m1.col+") dot ("+m2.row+","+m2.col+") is not possible";
    }
    else{
        var temp = new Matrix(m1.row,m1.col);

        for(var i=0;i<m1.row;i++){
            for(var k=0;k<m1.col;k++){
                temp.matrix[i][k] = m1.matrix[i][k] + m2.matrix[i][k];
            }
        }

        return temp;
    }




}


static multiply(m1,m2){
    if(m1.row != m2.row || m1.col!=m2.col){
        throw "Shape Error: ("+m1.row+","+m1.col+") dot ("+m2.row+","+m2.col+") is not possible";
    }
    else{
        var temp = new Matrix(m1.row,m1.col);

        for(var i=0;i<m1.row;i++){
            for(var k=0;k<m1.col;k++){
                temp.matrix[i][k] = m1.matrix[i][k] * m2.matrix[i][k];
            }
        }

        return temp;
    }
}


static scale(m1,scalar){
    for(var i=0;i<m1.row;i++){
        for(var k=0;k<m1.col;k++){
            m1.matrix[i][k] *= scalar;
        }
    }
    return m1;
}



}


