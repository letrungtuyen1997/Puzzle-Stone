import { ColorPeice } from './color_peice'
import { Shape } from './shape'
import { game } from '../app'
import { ShapePanel } from './shape_panel'
import { Color } from 'phaser-ce';
import { Peice } from './peice';
import{Peice2} from './peice2'
import { log } from 'util';


export class ColorLayer extends Phaser.Group {
	row: number = 8
	col: number = 8
	hintArray: ColorPeice[][] = []
	boardArray: ColorPeice[][] = []
	offsetY: number
	game: Phaser.Game
	matchScore: Function
	context: any
	score: number = 0
	dem: number = 0
	soundEr: Function
	soundEr2: Function
	soundEr3: Function
	Shape: ShapePanel
	shapePanel: ShapePanel
	onDeadEnd: Function
	deadEndContext: any
	check_sound: boolean = false

	constructor(game: Phaser.Game) {
		super(game, game.world, 'group', true, false, undefined)
		this.game.add.existing(this)
		this.x = (game.world.width - 120 * 8) / 2 + 4
		this.offsetY = (this.game.world.height - 120 * 8 - 26) / 2
		this.initField(this.hintArray)
		this.initField(this.boardArray)
	}

	calculateMatch(): number[][] {
		let result: number[][] = []
		for (let i = 0; i < this.row; i++) {
			let empty: number[] = [0, 0, 0, 0, 0, 0, 0, 0]
			let a: number[] = []
			for (let j = 0; j < this.col; j++) {
				if (this.hintArray[i][j] || this.boardArray[i][j])
					a.push(1)
			}
			if (a.length === 8)
				result.push(a)
			else
				result.push(empty)
		}

		for (let j = 0; j < this.col; j++) {
			let a: number[] = []
			for (let i = 0; i < this.row; i++)
				if (this.hintArray[i][j] || this.boardArray[i][j])
					a.push(1)
			if (a.length === 8)
				for (let k = 0; k < a.length; k++)
					result[k][j] = 1
		}
		return result
	}

	changeHintColor(shape: Shape) {
		let matchArray = this.calculateMatch()
		for (let i = 0; i < matchArray.length; i++)
			for (let j = 0; j < matchArray[0].length; j++) {
				if (this.boardArray[i][j] && matchArray[i][j] === 1)
					this.boardArray[i][j].changeColor(shape.color, false)
				if (this.boardArray[i][j] && this.boardArray[i][j].changedColor !== undefined && matchArray[i][j] === 0)
					this.boardArray[i][j].changeColor(shape.color, true)
			}
	}

	initField(field: ColorPeice[][]) {
		for (let i = 0; i < this.row; i++) {
			field[i] = []
			for (let j = 0; j < this.col; j++)
				field[i][j] = null
		}
	}

	clearHintField() {
		for (let i = 0; i < this.row; i++)
			for (let j = 0; j < this.col; j++)
				if (this.hintArray[i][j] != null) {
					this.hintArray[i][j].destroy(true)
					this.hintArray[i][j] = null
				}
	}

	onShapeIn(shape: Shape) {
		let col = Math.round((shape.x - this.x) / 120)
		let row = Math.round((shape.y - this.offsetY) / 120)
		if (this.isDrawable(row, col, shape)) {
			this.drawShape(row, col, shape, true)
			this.changeHintColor(shape)
		}
	}

	onShapeDragEnd(shape: Shape) {
		this.clearHintField()
		let col = Math.round((shape.x - this.x) / 120)
		let row = Math.round((shape.y - this.offsetY) / 120)
		if (this.isDrawable(row, col, shape)) {
			this.drawShape(row, col, shape, false)
			let matchArry = this.calculateMatch()

			for(let i = 0; i < this.dem1(matchArry); i++) {

				this.dem += 10
			}
			this.dem += shape.getNumberOfShape()
			this.matchScore.apply(this.context, [this.dem])

			for (let i = 0; i < matchArry.length; i++)
				for (let j = 0; j < matchArry.length; j++)
					if (matchArry[i][j]) {
						this.boardArray[i][j].blow(true, shape)
						this.boardArray[i][j] = null

						if(this.dem1(matchArry)==1 && this.check_sound==false)
							{
								this.soundEr.apply(this.context)
							}else if(this.dem1(matchArry) ==2 && this.check_sound==false)
							{
								this.soundEr2.apply(this.context)
							}else if(this.dem1(matchArry) >=3 && this.check_sound==false){
								this.soundEr3.apply(this.context)
							}

					}
		}
	}
	
	dem1(matchArr:number[][]){
		let kq;
		let dem2 = 0;
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				if(matchArr[i][j] == 1) {
					dem2++;
					}
			}
		}

		kq = Math.floor(dem2/8)
		return kq
	}
	///////////////////////////END GAME////////////////////////////////////////

	countShape(shape: Shape) {
		let dem = 0

		for (let i = 0; i < shape.row; i++)
			for (let j = 0; j < shape.col; j++)
				if (shape.shape[i][j] != 0)
					dem = dem + 1
		return dem
	}

	checkEndGame(shape: Shape, countShape: number) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let count = 0
				for (let l = 0; l < shape.row; l++) {
					for (let k = 0; k < shape.col; k++) {
						if ((i + l) < 8 && (j + k) < 8)
							if (shape.shape[l][k] == 1 && this.boardArray[i + l][j + k] == null)
								count = count + 1

					}
				}

				if (countShape == count) {
					return true
				}
			}
		}
	}
	
	//END GAME
	isDeadEnd(innerArray: any) {

		var a = []	 //shape is accept in board
		var b = []	//shape is deny in board

		for (let i = 0; i < innerArray.length; i++) {

			if (innerArray[i] != null) {

				if (this.checkEndGame(innerArray[i], this.countShape(innerArray[i])))
					a.push(1)
				else
					b.push(1)
			}
		}

		var count = 0	//count shape in innerArray

		for (let j = 0; j < innerArray.length; j++) {

			if (innerArray[j] != null) {
				count = count + 1
			}
		}

		//IF TRUE => END GAME
		if (a.length != 0 || b.length != 0 || count != 0)
			if (count == b.length)
			{
				console.log("END GAME")
				console.log(this.boardArray)
				this.drawEndGame()
				//alert("ok")
				setTimeout(()=>{
					this.onDeadEnd.apply(this.deadEndContext)
				},3000)
			}
	}

	///////////////////////////END GAME//////////////////////////////////////////


	blowLine(line: ColorPeice[], index: number, shape:Shape) {
		if (index > this.row)
			return
		line.forEach(p => p.blow(true, shape))
		/*line[index].blow(true)
		setTimeout(() => line[index++].blow(true), 50)*/
	}

	drawShape(row: number, col: number, shape: Shape, hint: boolean) {
		if (!hint) shape.isOnboard = true
		this.clearHintField()
		for (let i = 0; i < shape.row; i++)
			for (let j = 0; j < shape.col; j++)
				if (shape.shape[i][j]) {
					let peice = new ColorPeice(game, (col + j) * 120 + this.x, (row + i) * 120 - 2 + this.offsetY, shape.color)
					this.game.add.existing(peice)
					if (hint) {
						peice.alpha = 0.5
						this.hintArray[row + i][col + j] = peice
					}
					else {
						this.boardArray[row + i][col + j] = peice
					}
				}
	}


	drawEndGame(){
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				if(this.boardArray[i][j] != null) {
					let peice = new ColorPeice(game, j*120 + this.x, i*120+this.offsetY, 7)
					peice.alpha = 0
					let tween = this.game.add.tween(peice).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, false)
					this.game.add.existing(peice)
				}
			}
		}
		
	}

	isDrawable(row: number, col: number, shape: Shape): boolean {
		if (row < 0 || col < 0 || (row + shape.row) > 8 || (col + shape.col) > 8) {
			this.clearHintField()
			this.changeHintColor(shape)
			return false
		}

		let type
		if (type = this.isOverlay(row, col, shape)) {
			if (type === 2)
				this.clearHintField()
			this.changeHintColor(shape)
			return false
		}
		return true
	}

	isOverlay(row: number, col: number, shape: Shape): boolean | number {
		for (let i = 0; i < shape.row; i++)
			for (let j = 0; j < shape.col; j++) {
				if (shape.shape[i][j] === 1 && this.hintArray[row + i][col + j] === null) {
					for (let k = 0; k < shape.row; k++)
						for (let l = 0; l < shape.col; l++)
							if (shape.shape[k][l] === 1 && this.boardArray[row + k][col + l]) {
								return 2
							}
					return false
				}
			}
		return true
	}
	///////////////////////////END GAME////////////////////////////////////////

	// countShape(shape: Shape) {
	// 	let dem = 0

	// 	for (let i = 0; i < shape.row; i++)
	// 		for (let j = 0; j < shape.col; j++)
	// 			if (shape.shape[i][j] != 0)
	// 				dem = dem + 1
	// 	return dem
	// }

	// checkEndGame(shape: Shape, countShape: number) {
	// 	for (let i = 0; i < 8; i++) {
	// 		for (let j = 0; j < 8; j++) {
	// 			let count = 0
	// 			for (let l = 0; l < shape.row; l++) {
	// 				for (let k = 0; k < shape.col; k++) {
	// 					if ((i + l) < 8 && (j + k) < 8)
	// 						if (shape.shape[l][k] == 1 && this.boardArray[i + l][j + k] == null)
	// 							count = count + 1
	// 				}
	// 			}

	// 			if (countShape == count) {
	// 				return true
	// 			}
	// 		}
	// 	}
	// }

	// //END GAME
	// isDeadEnd(innerArray: any) {

	// 	var a = []	 //shape is accept in board
	// 	var b = []	//shape is deny in board

	// 	for (let i = 0; i < innerArray.length; i++) {

	// 		if (innerArray[i] != null) {

	// 			if (this.checkEndGame(innerArray[i], this.countShape(innerArray[i])))
	// 				a.push(1)
	// 			else
	// 				b.push(1)
	// 		}
	// 	}

	// 	var count = 0	//count shape in innerArray

	// 	for (let j = 0; j < innerArray.length; j++) {

	// 		if (innerArray[j] != null) {
	// 			count = count + 1
	// 		}
	// 	}

	// 	//IF TRUE => END GAME
	// 	if (a.length != 0 || b.length != 0 || count != 0)
	// 		if (count == b.length) {

	// 			console.log("END GAME")
				
	// 			for (let i = 0; i < 8; i++) {
	// 					for (let j = 0; j < 8; j++)
	// 					if (this.boardArray[i][j] != null) {
	// 						let a= new ColorPeice(game, j * 120 + this.x ,i * 120 +this.offsetY,7)
	// 						a.alpha=0
	// 						this.game.add.existing(a)
	// 						this.game.add.tween(a).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true,i*50, 0, false,)
	// 					//	console.log('asdasda',a);
	// 					}
	// 			}
	// 			setTimeout(() => {
	// 				this.onDeadEnd.apply(this.deadEndContext)
	// 			}, 3000)

	// 		}

	// }

	///////////////////////////END GAME//////////////////////////////////////////


	
}