export class Matrix{
    private _data:number[][] = new Array()

    constructor(private _row:number, private _col:number){
        //CREATING THE MATRIX
        for(let i=0; i<this._row; i++){
            this._data.push(Array(this._col))        
        }
    }

    get row(){
    	return this._row
    }

    get col(){
    	return this._col
    }

    get data(){
	return this._data
    }

    set data(A:number[][]){
       for(let j=0; j<this.row;j++){	
		if ((A.length !== this.row)&&(A[j].length !== this.col)){
			throw new Error('Number of rows or colums are different from the specified in the matrix, please check it')
		
		}else{
			this._data = A
		}	
       }
    }

    /**
    * Gives the size of a matrix in form of number[]
    */
    size():number[]{
    	return [this.row, this.col]
    }

    /**
    * Calculates the determinant of the matrix.
    */
    public determinant():number{
        if(this.row !== this._col){
            throw new Error('The matrix is not a square')
        }else{
            if(this.row == 2){
                return this.data[0][0]*this.data[1][1] - this.data[0][1]*this.data[1][0]
            }else{
                let iCof = 1
                let sum:number = 0
                for(let j = 0; j<this._col; j++){
                    sum = sum + this.data[iCof-1][j]*(-1)**(iCof+j+1)*this.sub_matrix(iCof,j+1).determinant()
                }
                return sum
            }
        }
    }

   /**
   * Calculates the sub_matrix used in the determinant calculation
   */
   protected sub_matrix(del_row:number, del_col:number):Matrix{
	    del_col = del_col-1
	    del_row = del_row-1

		let subMatrix:Matrix = new Matrix(this.row-1, this._col-1)
		let flagRow:boolean = false
		let flagCol:boolean = false

		for(let j = 0; j<this._col; j++){
			flagRow = false
			if((j == del_col) && (del_col < this._col)){
				j++	
				flagCol=true
			}
			for(let i = 0; i<this.row; i++){
				if((i == del_row ) && (del_row < this.row)){
					i++		
					flagRow=true
				}
				if ((flagCol==true)&&(flagRow==false)){
					subMatrix.data[i][j-1] = this.data[i][j]
				}else if((flagCol==false)&&(flagRow==true)){
					subMatrix.data[i-1][j] = this.data[i][j]
				}else if((flagCol==true)&&(flagRow==true)){
					subMatrix.data[i-1][j-1] = this.data[i][j]
				}else{
					subMatrix.data[i][j] = this.data[i][j]
				}
			}
		}
	    return subMatrix
	}

}



/**
* Multiply two given matrices, MatA[i][j] and MatB[j][p]
* @param MatA Input MatA.
* @param MatB Input MatB.
*/
export function multiply(MatA:Matrix, MatB:Matrix):Matrix{
	let MatA_Row:number = MatA.row 
	let MatA_Col:number = MatA.col

	let MatB_Row:number = MatB.row 
	let MatB_Col:number = MatB.col 

	if (MatA_Col !== MatB_Row){
		throw new Error('Number of cols in Mat1 is different from Mat2 rows')
	}

	let MatC:Matrix = new Matrix(MatA_Row, MatB_Col)

	for(let i=0; i<MatA_Row ;i++){
		for(let j=0; j<MatB_Col; j++){
			let sum:number = 0
			for(let k=0; k<MatB_Row; k++){
				sum = sum + MatA.data[i][k]*MatB.data[k][j]
			}
			MatC.data[i][j]= sum	
		}
	}
	return MatC
}

/**
* Calculates the transpose of a five matrix.
* @param M Input matrix M to be transposed.
* /
export function transpose(M:Matrix):Matrix{
	let Mtransp:Matrix= new Matrix(M.row, M.col)
	for(let i=0; i<M.row;i++){
		for(let j=0;j<M.col;j++){
			Mtransp.data[j][i] = M.data[i][j]			
		}
	}

	return Mtransp
}

/**
* Sum two matrices with the same order.
* @param MatA Input the first Matrix
* @param MatB Input the second matrix
*/
export function MatSum(MatA:Matrix, MatB:Matrix):Matrix{
	let MatSum:Matrix = new Matrix(MatA.row, MatA.col)
	for(let j = 0; j<MatA.col; j++){
		for(let i = 0; i<MatA.row; i++){
			MatSum.data[i][j] = MatA.data[i][j] + MatB.data[i][j] 		
		}
	}	
	return MatSum
}


/**
* Subtracts two matrices with the same order.
* @param MatA Input the first Matrix
* @param MatB Input the second matrix
*/
export function MatSubtr(MatA:Matrix, MatB:Matrix):Matrix{
	let MatSubtr:Matrix = new Matrix(MatA.row, MatA.col)
	for(let j = 0; j<MatA.col; j++){
		for(let i = 0; i<MatA.row; i++){
			MatSubtr.data[i][j] = MatA.data[i][j] - MatB.data[i][j] 		
		}
	}	
	return MatSubtr
}

/**
* Subtracts two arrays with the same length.
* @param ArrayA Input the first Array.
* @param ArrayB Input the second Array.
*/
export function ArraySubtr(ArrayA:number[], ArrayB:number[]):number[]{
	let ArraySubtr:number[] = new Array(ArrayA.length)
		for(let j = 0; j<ArraySubtr.length; j++){
			ArraySubtr[j] = ArrayA[j] - ArrayB[j] 		
		}
	return ArraySubtr
}

/**
* Creates a matrix identity with a given order.
* @param order Input order of the matrix.
*/
export function MatIdentity(order:number):Matrix{
	let MatIdentity:Matrix = new Matrix(order, order)
	for (let j = 0; j<order; j++){
		for (let i = 0; i<order;i++){
			if(i==j){
				MatIdentity.data[i][j] = 1
			}else{
				MatIdentity.data[i][j] = 0
			}
		}
	}
	return MatIdentity
}

/**
* Calculates linear system using Gaussian elimination. 
* @param A Input the matrix of coefficients.
* @param b Input the vector with results
*/
export function GaussEli(A:Matrix, b:number[]):number[]{
	let x:Array<number> = new Array(A.row)
	let M:Matrix = new Matrix(A.row,A.col)
	for(let j=0; j<A.col; j++){
		for(let i=j+1; i<A.col+1; i++){
			M.data[i][j] = A.data[i][j] / A.data[j][j]
			for(let k=j+1; k<A.col+1;k++){
				A.data[i][k] = A.data[i][k] - M.data[i][j]*A.data[j][k]	
			}
			b[i] = b[i] - M.data[i][j]*b[j]
		}	
	}

	return x
}

/**
 *	This function uses Gauss-Jordan elimination to invert matrices.
 *	@param M Matrix to be inverted 
 */
export function inv(M:Matrix):Matrix{
	let M_inv:Matrix = new Matrix(M.row, M.col)
	let M_aug:Matrix = augmentedMatrix(M) 
	let repeatFlag:boolean = false
	for(let i = 0; i<M_aug.row; i++){
		if(repeatFlag == true){
		    i = i-1
		    repeatFlag = false
		}
		if(M_aug.data[i][i] == 0){
		    if(i+1 < M_aug.row){
			M_aug = swapRow(M_aug, i, i+1)
			repeatFlag = true
		    }else{
			throw new Error('This matrix is not inverteble')
		    }
		}else{
		    M_aug.data[i] = multiplyRowByConstant(M_aug.data[i], (1/M_aug.data[i][i]))
		}
		for(let k=0; k<M_aug.row;k++){
			if(k!==i){
				M_aug.data[k] = ArraySubtr(M_aug.data[k],multiplyRowByConstant(M_aug.data[i], M_aug.data[k][i]))
			}
	    
		}
	}

	for(let j=M.col; j<M_aug.col; j++){
		for(let i=0; i<M_aug.row; i++){
			M_inv.data[i][j-M.col] = M_aug.data[i][j]	
		}
	}
	return M_inv 
}

/**
* Copy the values of a matrix to another
* @param Mto input the matrix that you want the values be copied to
* @param Mfrom input the matrix that you want the vvalues to be copied from
*/
export function copyMatrix(Mto:Matrix, Mfrom:Matrix):Matrix{
    for(let j = 0; j<Mfrom.col;j++){
        for(let i=0; i<Mfrom.row;i++){
            Mto.data[i][j] = Mfrom.data[i][j]
        }
    }
    return Mto
}

/**
* Creates the augmented matrix to use in matrix inversion.
* @param M Insert the matrix to be used in the augmented matrix.
*/
export function augmentedMatrix(M:Matrix):Matrix{
    let augmentedMatrix:Matrix = new Matrix(M.row,M.col + M.col)
    let identity:Matrix = MatIdentity(M.row)

    for(let j = 0; j<M.col; j++){
        for(let i = 0; i<augmentedMatrix.row; i++){
            augmentedMatrix.data[i][j] = M.data[i][j]
        }
    }

    for(let j = M.col; j<augmentedMatrix.col; j++){
        for(let i = 0; i<augmentedMatrix.row; i++){
            augmentedMatrix.data[i][j] = identity.data[i][j-M.col]
        }
    }
    return augmentedMatrix
}

/** 
* This function swaps two chosen rows in a given matrix
* @param M choose the Matrix that rows will be swaped.
* @param row1 define row1 to be swaped
* @param row2 define second row to be swaped with the first
*/
export function swapRow(M:Matrix, row1:number, row2:number):Matrix{
	//ERROR CHECKER if either input rows are negative or higher value than input Matrix.
	if(((row1 < 0)||(row2 < 0))){
		throw new Error('Number of rows specified out of limits')
	}
	if((row1 >= M.row)||(row2 >= M.row)){
		throw new Error('Number of rows specified out of limits')
	}
	//End of ERROR CHECKER

    let swapMatrix:Matrix = new Matrix(M.row, M.col)
    copyMatrix(swapMatrix, M)

	let saveRow:Array<number> = new Array(M.col)
	for(let j=0; j<M.col; j++){
		saveRow[j] = swapMatrix.data[row1][j]
	}	
	for(let j=0; j<M.col;j++){
		swapMatrix.data[row1][j] = swapMatrix.data[row2][j]
	}
	for(let j=0; j<M.col;j++){
		swapMatrix.data[row2][j] = saveRow[j]
	}
	return swapMatrix
}

/**
* This function multiplay a given array by a constant number
* @param Row define the row that will be multiplied by a constant
* @param constat define the constant that will multiply the row. For a division, just insert 1/constant.
*/
export function multiplyRowByConstant(Row:number[], constant:number):number[]{
    let multipliedArray:number[] = new Array(Row.length)
    for(let j=0; j<Row.length;j++){
        multipliedArray[j] = constant*Row[j]
    }
    return multipliedArray
}
