import { Matrix } from './matrix-ts'
import { multiply } from './matrix-ts'
import { MatSubtr } from './matrix-ts'
import { MatSum } from './matrix-ts'
import { MatIdentity } from './matrix-ts'
import { inv } from './matrix-ts'
import { ArraySubtr } from './matrix-ts'

let A:Matrix =  new Matrix(5,5)
A.data = [[15,3,2,-12,2], [0,2,20,1,0], [6,7,-90,4,1], [40,30,2,-9,8], [-8,5,32,10,40]]

console.log(A.determinant())
let B:Matrix = new Matrix(5,2)
B.data = [[4,3],[32,3],[-2,12],[3,2],[1,2],[1,2]]

let G:Matrix = new Matrix(5,5)
G.data = [[15,3,2,-12,2], [0,2,20,1,0], [6,7,-90,4,1], [40,30,2,-9,8], [-8,5,32,10,40] ]

let H:Matrix = new Matrix(3,3)
H.data = [[0,2,3],[2,0,3],[1,0,0]]

let D:Matrix = new Matrix(2,2)
D.data = [[2,2],[2,3]]

let Ar1:number[] = [1, 2, 3]
let Ar2:number[] = [1, 3, 2]

console.log('Testing ArraySubtr func')
console.log(ArraySubtr(Ar1, Ar2))

//console.log(B.data)

//let C = multiply(A,B) 
//console.log(C.data)

//console.log(A.data)
//console.log(MatSum(A,G).data)
//console.log(MatSubtr(A,G).data)

//console.log(MatIdentity(3,3).data)

console.log(inv(H).data)
