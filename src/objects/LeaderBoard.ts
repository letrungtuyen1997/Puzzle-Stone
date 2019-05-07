import { game } from "../app";
import { MyFBStorage } from "../models/model";


export class Leaderboard extends Phaser.Image {
	spin: Phaser.Graphics = null
	data: MyFBStorage
	init() {
		this.data = <MyFBStorage>game.data
	}
	preload() {
	}
	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x, y, 'leaderboard')
		this.y = this.game.height / 2 + 280
		this.anchor.setTo(.4, .4)
		this.scale.setTo(1.1, 1.3)
		for (let i = 0; i < 3; i++)
			this.addChild(new PlayerInfo(game, i * 300 - 300, -130))
		this.game.add.existing(this)
		this.init()
		this.renderSpin(game.world.centerX, game.world.centerY - 114)
		this.data.getLeaderBoard((entries) => {
			let loader: Phaser.Loader
			for (let i = 0; i < entries.length; i++) {
				loader = this.game.load.image('photo' + i, entries[i].getPlayer().getPhoto())
				loader.start()
			}
			loader.onLoadComplete.add(() => {
				setTimeout(() => {
					this.stopSpin()
					this.flipChilds(0, entries)
				}, 100)

			}, this)
		}, this)
	}
	stopSpin() {
		this.spin.visible = false
	}

	renderSpin(x: number, y: number) {
		this.spin = this.game.add.graphics(x, y)
		this.spin.lineStyle(8, 0xEEEEEE)
		this.spin.arc(0, 0, 50, 0, Phaser.Math.degToRad(80), false)

	}

	update() {
		if (this.spin)
			this.spin.rotation += 0.1
	}

	flipChilds(index: number, ldbEntries: any) {
		if (index > 2)
			return
		let child = this.getChildAt(index)
		child.scale.x = -1
		this.game.add.tween(child.scale).to({ x: 1.3 }, 300, "Linear", true, 0, 0, false)
			.onComplete.add(() => {
				(<PlayerInfo>child).render(ldbEntries[index], 'photo' + index)
				this.flipChilds(++index, ldbEntries)
			}, this)
	}

}
class SpinCircle extends Phaser.Graphics {
	spining: boolean = true
	constructor(game: Phaser.Game, x, y) {
		super(game, x, y)
		this.lineStyle(8, 0xFFCC00)
		this.beginFill(0xFFCC00)
		this.arc(0, 0, 10, Phaser.Math.degToRad(100), Phaser.Math.degToRad(100), true)
		game.add.existing(this)
	}

	update() {
		if (this.spining) {
			this.rotation += 0.1
			this.arc(0, 0, 10, Phaser.Math.degToRad(100), Phaser.Math.degToRad(100), true)
		}
	}
}

class PlayerInfo extends Phaser.Image {
	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x + 100, y + 157, 'plf')
		this.anchor.setTo(.5, .5)
		this.scale.setTo(1.3, 1)
		game.add.existing(this)
	}

	render(entry: any, photoKey: string) {
		if (entry) {

			let photo = new Phaser.Image(this.game, 0, -20, photoKey)
			photo.anchor.setTo(.5, .5)
			photo.scale.setTo(.255, .255)
			this.addChild(photo)

			let frame = this.game.add.image(0,-20,'avt1')
			this.game.add.sprite(0, -50, 'ui', 51)
			frame.anchor.setTo(.5, .5)
			frame.scale.setTo(1.2, 1.2)
			this.addChild(frame)

			let name = new Phaser.Text(this.game, 0, 60, entry.getPlayer().getName(), { font: "35px Arial Bold", fill: "#493b3b" })
			name.anchor.setTo(.5, .5)
			this.addChild(name)

			let sc: number = entry.getScore()
			if (FBInstant.player.getID() === entry.getPlayer().getID()) {
				sc = (<MyFBStorage>game.data).score
			}
			let score = new Phaser.BitmapText(this.game, 0, 100, 'score', '' + sc, 16)
			score.anchor.setTo(.5, .5)
			this.addChild(score)

			let rank = new Phaser.BitmapText(this.game, 0, -100, 'score', '' + entry.getRank(), 18)
			rank.anchor.setTo(.5, .5)
			this.addChild(rank)
		}
	}
}
