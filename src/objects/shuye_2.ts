
	export class Shuye_2 extends Phaser.Group {
		constructor(game:Phaser.Game){
			super(game, undefined, 'group', true, false, undefined)
			let bg = new Phaser.Image(game, 0, 0, 'shuye_2')
			bg.scale.setTo(1.9,2)	
			this.x = -50
			this.addChild(bg)
			this.height = bg.height
			this.y = game.height - this.height + 60
			this.game.add.existing(this)
		}
	}
