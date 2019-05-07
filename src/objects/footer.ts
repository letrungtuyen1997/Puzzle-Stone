export class Footer extends Phaser.Group {
	constructor(game:Phaser.Game) {
		super(game, undefined, 'group', true, false, undefined)
		let bg = new Phaser.Image(game, 0, 0, 'footer')
		bg.scale.setTo(1.66, 1.66)	
		this.x = 0
		this.addChild(bg)
		this.height = bg.height
		this.y = game.height - this.height
		this.game.add.existing(this)
	}
}
