import { Shape } from './shape'

export enum Color { PURPLE = 0, PINK, AQUA, OGRANGE, BLUE, GREEN, RED }

export class ColorPeice extends Phaser.Image {
	private color:Color
	public changedColor:Color
	game:Phaser.Game
	constructor(game:Phaser.Game, x:number, y:number, color:number) {
		super(game, x + 60, y + 60, 'peices', color)
		this.scale.setTo(2.3,2.3)
		this.anchor.setTo(0.5, 0.5)
		this.color = color
		this.game = game
	}

	changeColor(color:Color, origin:boolean) {
		if (origin) {
			this.loadTexture('peices', this.color)
			this.changedColor = undefined
		}
		else {
			this.changedColor = color
			this.loadTexture('peices', this.changedColor)
		}
	}

	blow(destroy:boolean, shape:Shape) {
		let blow = this.game.add.sprite(this.x - 50, this.y - 70, 'test')
		switch (shape.color) {
			case 0: { //r
				blow.animations.add('blow',[8,87,51,77,37,39,58],14,true,true)
				blow.animations.play('blow', 14, false, true)
				break;
			}
			case 1: {//r
				blow.animations.add('blow',[43,27,82,16,67,26,48],14,true,true)
				blow.animations.play('blow', 14, false, true)
				break;
			}
			case 2: {
				blow.animations.add('blow',[69,31,84,18,70,38,57],14,true,true)
				blow.animations.play('blow', 14, false, true)
				break;
			}
			case 3: {
				blow.animations.add('blow',[73,61,22,47,7,29,68],14,true,true)
				blow.animations.play('blow', 14, false, true)
				break;
			}
			case 4: {
				blow.animations.add('blow',[34,19,74,5,60,33,79],14,true,true)
				blow.animations.play('blow', 14, false, true)
				break;
			}
			case 5: { //r
				blow.animations.add('blow',[12,2,55,80,42,30,52],14,true,true)
				blow.animations.play('blow', 14, false, true)
				break;
			}
			case 6: {
				blow.animations.add('blow',[64,53,11,40,0,21,44],14,true,true)
				blow.animations.play('blow', 14, false, true)
				break;
			}
			default:
				// code...
				break;
		}

		

		// blow.animations.add('blow',[12,2,55,80,42,30,52],14,true,true)
		// blow.animations.play('blow', 14, false, true)

		this.game.add.tween(new Phaser.Tween(this, this.game, this.game.tweens)
		.to({alpha:0}, 100, 'Linear', true, 0, 0, false)
		.onComplete.add(() => {
			if (destroy)  
				this.destroy(false)
		}))
	}
}