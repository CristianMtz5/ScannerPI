export declare class Matrix {
    private _row;
    private _col;
    private _data;
    constructor(_row: number, _col: number);
    get row(): number;
    get col(): number;
    get data(): number[][];
    set data(A: number[][]);
    /**
    * Gives the size of a matrix in form of number[]
    */
    size(): number[];
    /**
    * Calculates the determinant of the matrix.
    */
    determinant(): number;
    /**
    * Calculates the sub_matrix used in the determinant calculation
    */
    protected sub_matrix(del_row: number, del_col: number): Matrix;
}
/**
* Multiply two given matrices, MatA[i][j] and MatB[j][p]
* @param MatA Input MatA.
* @param MatB Input MatB.
*/
export declare function multiply(MatA: Matrix, MatB: Matrix): Matrix;
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
export declare function MatSum(MatA: Matrix, MatB: Matrix): Matrix;
/**
* Subtracts two matrices with the same order.
* @param MatA Input the first Matrix
* @param MatB Input the second matrix
*/
export declare function MatSubtr(MatA: Matrix, MatB: Matrix): Matrix;
/**
* Subtracts two arrays with the same length.
* @param ArrayA Input the first Array.
* @param ArrayB Input the second Array.
*/
export declare function ArraySubtr(ArrayA: number[], ArrayB: number[]): number[];
/**
* Creates a matrix identity with a given order.
* @param order Input order of the matrix.
*/
export declare function MatIdentity(order: number): Matrix;
/**
* Calculates linear system using Gaussian elimination.
* @param A Input the matrix of coefficients.
* @param b Input the vector with results
*/
export declare function GaussEli(A: Matrix, b: number[]): number[];
/**
 *	This function uses Gauss-Jordan elimination to invert matrices.
 *	@param M Matrix to be inverted
 */
export declare function inv(M: Matrix): Matrix;
/**
* Copy the values of a matrix to another
* @param Mto input the matrix that you want the values be copied to
* @param Mfrom input the matrix that you want the vvalues to be copied from
*/
export declare function copyMatrix(Mto: Matrix, Mfrom: Matrix): Matrix;
/**
* Creates the augmented matrix to use in matrix inversion.
* @param M Insert the matrix to be used in the augmented matrix.
*/
export declare function augmentedMatrix(M: Matrix): Matrix;
/**
* This function swaps two chosen rows in a given matrix
* @param M choose the Matrix that rows will be swaped.
* @param row1 define row1 to be swaped
* @param row2 define second row to be swaped with the first
*/
export declare function swapRow(M: Matrix, row1: number, row2: number): Matrix;
/**
* This function multiplay a given array by a constant number
* @param Row define the row that will be multiplied by a constant
* @param constat define the constant that will multiply the row. For a division, just insert 1/constant.
*/
export declare function multiplyRowByConstant(Row: number[], constant: number): number[];
