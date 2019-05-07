import { Shape } from './shape'
import { ColorLayer } from './color_layer'
import { game } from '../app'

export class ShapePanel extends Phaser.Graphics {

	innerArr: Shape[] = [null, null, null]
	_height: number
	_width: number
	listenerBoard: ColorLayer
	game: Phaser.Game
	isDeadEnd: Function
	isDeadEndContext: any

	constructor(game: Phaser.Game, x: number, y: number, listenerBoard: ColorLayer) {
		super(game, x, y)
		this._height = 240
		this._width = 990
		this.render(game)
		game.add.existing(this)
		this.game = game
		this.listenerBoard = listenerBoard
	}

	render(game: Phaser.Game) {
		for (let i = 0; i < 3; i++) {
			let shapeType = Math.floor(Math.random() * 9)
			let shapeColor = Math.floor(Math.random() * 7)
			let shape = new Shape(game, this.x + i * 330, this.y, shapeType, shapeColor)
			shape.scale.set(0, 0)
			shape.y += (240 - shape.row * 60) / 2
			shape.sp.y = shape.y
			this.innerArr[i] = shape

			setTimeout(() => {
				shape.addDragUpdateListener(this.listenerBoard.onShapeIn, this.listenerBoard)
				shape.addDragStopListner(this.listenerBoard.onShapeDragEnd, this.listenerBoard)
				shape.addDragStopListner(this.onShapeDragStop, this)
				this.popOut()
			}, 150)
		}
	}

	popOut() {
		this.innerArr.forEach(s => {
			this.game.tweens.add(new Phaser.Tween(s.scale, this.game, this.game.tweens)
				.to({ x: 0.5, y: 0.5 }, 500, 'Linear', true, 0, 0, false))
		})
	}

	onShapeDragStop(shape: Shape) {
		if (!shape.isOnboard) {
			this.game.tweens.add(new Phaser.Tween(shape, game, this.game.tweens)
				.to({ x: shape.sp.x, y: shape.sp.y }, 500, 'Linear', true, 0, 0, false))
			this.game.tweens.add(new Phaser.Tween(shape.scale, game, this.game.tweens)
				.to({ x: 0.5, y: 0.5 }, 500, 'Linear', true, 0, 0, false))
			shape.innerArr.forEach(i => i.scale.setTo(2.3, 2.3))
		}
		else {
			for (let i = 0; i < this.innerArr.length; i++)
				if (this.innerArr[i] === shape)
					this.innerArr[i] = null
			this.listenerBoard.isDeadEnd(this.innerArr)

			shape.destroy()
			if (this.isOutOfShape()) {
				this.render(this.game)
				this.listenerBoard.isDeadEnd(this.innerArr)
			}

		}
	}

	isOutOfShape() {
		for (let i = 0; i < this.innerArr.length; i++)
			if (this.innerArr[i])
				return false
		return true
	}
}