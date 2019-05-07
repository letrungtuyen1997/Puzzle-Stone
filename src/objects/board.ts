export class Board extends Phaser.Group {
	constructor(game:Phaser.Game) {
		super(game, undefined, 'group', true, false, undefined)
		let bg = new Phaser.Image(game, 0, 0, 'box')
		bg.scale.setTo(1.61, 1.61)	
		this.x = 0
		this.addChild(bg)
		this.height = bg.height
		this.centerY = game.world.centerY
		this.game.add.existing(this)
	}
}