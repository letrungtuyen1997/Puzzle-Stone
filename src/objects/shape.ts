import {Color, ColorPeice} from './color_peice'
import {listener} from '../models/model'
import {game} from '../app'
import {ColorLayer} from '../objects/color_layer'

export const SHAPES:number[][][] = [
	[
		[1]
	],
	[
		[1,1],
		[1,1]
	],
	[
		[1,1,1],
		[1,1,1],
		[1,1,1],
	],
	[
		[1],
		[1],
		[1],
		[1]
	],
	[
		[1,1,1,1]
	],
	[
		[1,0],
		[1,0],
		[1,1]
	],
	[
		[1,1,0],
		[0,1,0],
		[0,1,1]
	],
	[
		[1,1,1],
		[0,1,0]
	],
	[
		[0,1,0],
		[1,1,1]
	]
]

export const enum Shapes { POINT = 0, SQUARE , CUBE,  LINEH, LINEV , ELL , ZII, TRIDOWN, TRIUP}

export class Shape extends Phaser.Sprite {
	innerArr:ColorPeice[] = []

	row:number
	col:number
	color:Color
	shape:number[][]
	sp: Phaser.Point
	game:Phaser.Game
	isOnboard = false
	ColorLayer:ColorLayer
	private _onDragStart:listener[] = []
	private _onDragUpdate:listener[] = []
	private _onDragStop:listener[] = []
	constructor(game:Phaser.Game, x:number, y:number, shape:Shapes, color:Color) {
		super(game, x, y)
		this.shape = SHAPES[shape]
		this.color = color
		this.col = this.shape[0].length
		this.row = this.shape.length
		this.game = game
		this.render(game)
		this.sp = new Phaser.Point(x,y)
		this.anchor.setTo(0,0)

		this.inputEnabled = true
		this.input.enableDrag(false, true)
		this.events.onInputDown.add(this.onInputDown, this)
		this.events.onDragStart.add(this.onDragStart, this)
		this.events.onDragStop.add(this.onDragStop, this)
		this.events.onDragUpdate.add(this.onDragUpdate, this)
		game.add.existing(this)
	}


	render(game:Phaser.Game) {
		for (let i = 0; i < this.row; i++)
			for (let j = 0; j < this.col; j++)
				if (this.shape[i][j]) {
					let peice = new ColorPeice(game, j*120, i*120, this.color)
					this.addChild(peice)
					this.innerArr.push(peice)
				}
	}


	onInputDown() {
		this.game.tweens.add(new Phaser.Tween(this.scale, game, this.game.tweens)
    	.to({x:1,y:1}, 500, 'Linear', true, 0,0,false))
    	this.innerArr.forEach( i => {i.scale.setTo(2.15, 2.15)})
    	this.y -= 400
	}

	onDragStart() {
		this._onDragStart.forEach(l => l.callback.apply(l.context))
	}

	onDragStop() {
		this._onDragStop.forEach(l => l.callback.apply(l.context, [this]))
	}

	onDragUpdate(sprite:any, pointer:Phaser.Point, dragX:number, dragY:number, snapPoint:Phaser.Point) {
		this._onDragUpdate.forEach(l => l.callback.apply(l.context, [this]))
	}

	addDragStartListener(callback:Function, context:any) {
		this._onDragStart.push({callback:callback, context:context})
	}
	addDragUpdateListener(callback:Function, context:any) {
		this._onDragUpdate.push({callback:callback, context:context})
	}
	addDragStopListner(callback:Function, context:any) {
		this._onDragStop.push({callback:callback, context:context})
	}
	getNumberOfShape() {
		let kq = 0;
		for(let i = 0; i < this.row; i++) {
			for(let j = 0; j < this.col; j++) {
				if(this.shape[i][j] == 1) {
					kq++;
				}
			}
		}
		return kq;
	}

}