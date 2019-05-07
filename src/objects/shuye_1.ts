
	export class Shuye_1 extends Phaser.Group {
		constructor(game:Phaser.Game){
			super(game, undefined, 'group', true, false, undefined)
			let bg = new Phaser.Image(game, 0, 0, 'shuye_1')
			bg.scale.setTo(2,1.5)	
			this.x = -100
			this.addChild(bg)
			this.height = bg.height
			this.y = this.game.world.top
			this.game.add.existing(this)
		}
	}
