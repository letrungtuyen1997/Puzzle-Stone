import { Peice } from './peice'


export class TileLayer extends Phaser.Group {


	constructor(game: Phaser.Game) {
		super(game, undefined, 'group', true, false, undefined)
		this.layer(game)
		this.game.add.existing(this)
		this.x = (game.world.width - 120 * 8) / 2
		this.height = 120 * 8
		this.centerY = game.world.centerY - 18
	}

	layer(game: Phaser.Game) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let a = <Peice>this.addChild(new Peice(game, i * 120, j * 120))
				a.scale.set(-2.4, -2.4)
				a.angle = -90
				this.game.add.tween(a.scale).to({ x: 2.4, y: 2.4},800,Phaser.Easing.Sinusoidal.InOut,true,i*50,0,false)
				this.game.add.tween(a).to({ angle:0},800,Phaser.Easing.Sinusoidal.InOut,true,0,0,false)
			}
		}
	}

}