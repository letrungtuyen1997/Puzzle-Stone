export class Header extends Phaser.Group {

	constructor(game: Phaser.Game) {
		super(game, undefined, 'group', true, false, undefined)
		let bg = new Phaser.Image(game, 0, 0, 'header')
		let frameScore1 = new Phaser.Image(game, 0, 0, 'scr1')
		let frameScore2 = new Phaser.Image(game, 0, 0, 'scr2')
		let vsIcon = this.game.add.sprite(0, 0, 'ui', 19)
		var valueScale = 1.29
		frameScore1.x = this.game.world.centerX - 280
		frameScore1.y = this.game.world.top +140
		frameScore1.alpha=0
		setTimeout(() => {
			this.game.add.tween(frameScore1).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
		}, 2000);

		frameScore2.x = this.game.world.centerX + 70
		frameScore2.y = this.game.world.top +140

		frameScore2.alpha=0
		setTimeout(() => {
			this.game.add.tween(frameScore2).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
		}, 2000);

		vsIcon.x = frameScore1.x + frameScore1.width + 7
		vsIcon.y = frameScore1.y - vsIcon.width / 2
		vsIcon.alpha = 0
		vsIcon.scale.setTo(1)
		setTimeout(() => {
			this.game.add.tween(vsIcon).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false)
			this.game.add.tween(vsIcon.scale).to({ x: 1.3 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true)
		}, 700);

		bg.scale.setTo(1.66, 1.60)
		frameScore1.scale.setTo(1, 1)
		console.log(frameScore1.height,frameScore1.width);
		

		this.x = 0

		this.addChild(bg)
		this.addChild(frameScore1)
		this.addChild(frameScore2)
		this.addChild(vsIcon)



		this.height = bg.height
		this.y = this.game.world.top + 80
		this.game.add.existing(this)
	}
}