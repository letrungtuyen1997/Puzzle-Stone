import { Board } from '../objects/board'
import { Header } from '../objects/header'
import { TileLayer } from '../objects/tile_layer'
import { ShapePanel } from '../objects/shape_panel'
import { Shape } from '../objects/shape'
import { MyFBStorage } from '../models/model'
import { ColorLayer } from '../objects/color_layer'
import { Footer } from '../objects/footer'
import { game } from '../app'
import { ColorPeice, Color } from '../objects/color_peice'
import { Shuye_1 } from '../objects/shuye_1'
import { Shuye_2 } from '../objects/shuye_2'

import { ScoreCounter } from '../objects/SoccerCounter'
import { gameover } from './gameover';
//import {LeaderBoard} from '../states/LeaderBoard'




export class Title extends Phaser.State {

	frame: Board
	header: Header
	footer: Footer
	shuye_2: Shuye_2
	shuye_1: Shuye_1
	layer: TileLayer
	shapeHolder: ShapePanel
	ColorLayer: ColorLayer

	//LeaderBoard:LeaderBoard
	gameover: gameover

	data: MyFBStorage
	txt: ScoreCounter
	Score: number = 0
	tween: Phaser.Tween
	timer: Phaser.Timer
	newScore: number
	oldScore: number = 0
	sound_bk: Phaser.Sound
	sound_put: Phaser.Sound
	sound_er: Phaser.Sound
	sound_er2: Phaser.Sound
	sound_er3: Phaser.Sound
	check_sound: boolean = false
	btn_muteSound: any



	constructor() {
		super()
	}

	preload() {
		this.data = <MyFBStorage>game.data
		var playerImage = new Image();
		playerImage.src = FBInstant.player.getPhoto();
		//let avt = playerImage.src
		this.game.load.image('profile', playerImage.src)


	}




	init() {
		this.data = <MyFBStorage>game.data
	}
	create() {
		this.add.image(0, 0, 'bg').scale.setTo(this.world.height / this.world.width, this.world.height / this.world.width)
		this.frame = new Board(this.game)
		this.header = new Header(this.game)

		////////frame avatar////////
		// let frameAvatar1 = this.game.add.sprite(0, 0, 'ui', 63)
		// let frameAvatar2 = this.game.add.sprite(0, 0, 'ui', 51)

		
		////// information fb///////
		let playerName = FBInstant.player.getName();
		let textStyle = { font: "50px Arial", fill: "#493b3b", }
		for (let i = 0; i < 2; i++) {
			let name = this.game.add.text(0, 0, playerName, textStyle)
			name.x = this.game.world.top + i * 340 + 300
			name.y = this.game.world.top + 161
			name.alpha = 0
			setTimeout(() => {
				this.game.add.tween(name).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
			}, 2000);
			let avt = this.game.add.image(0, 0, 'profile')
			avt.x = this.game.world.top + i * 300 + 320
			avt.y = this.game.world.top + 161
			setTimeout(() => {
				this.game.add.tween(avt).to({ x: this.game.world.top + i * 779 + 81, y: this.game.world.top + 161 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
			}, 1500);
			console.log('avt :' + avt.width + 'asc' + avt.height);
			avt.scale.setTo(0.4, 0.42)


		}
		/////end information fb/////
		let frameAvatar1 = this.add.image(0, 0, 'avt1')
		let frameAvatar2 = this.add.image(0, 0, 'avt2')


		frameAvatar1.x = 310
		frameAvatar1.y = this.game.world.top + 150
		setTimeout(() => {
			this.game.add.tween(frameAvatar1).to({ x: this.game.world.top + 70, y: this.game.world.top + 150 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
		}, 1500);

		frameAvatar2.x = 608
		frameAvatar2.y = this.game.world.top + 150
		setTimeout(() => {
			this.game.add.tween(frameAvatar2).to({ x: this.game.world.top + 848, y: this.game.world.top + 150 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
		}, 1500);
		frameAvatar1.scale.setTo(2, 2)
		frameAvatar2.scale.setTo(2, 2)


		let btn_refresh = this.game.add.image(0, 0, 'btn_replay2')
		btn_refresh.x = this.game.world.top + 55
		btn_refresh.y = this.game.world.top + 314
		btn_refresh.scale.setTo(1.29, 1.29)
		btn_refresh.alpha = 0
		setTimeout(() => {
			this.game.add.tween(btn_refresh).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false)
		}, 1000);

		let btn_sound = this.game.add.image(0, 0, 'btn_sound')
		btn_sound.x = this.game.world.top + 183
		btn_sound.y = this.game.world.top + 314
		btn_sound.scale.setTo(1.29, 1.29)

		btn_sound.alpha = 0
		setTimeout(() => {
			this.game.add.tween(btn_sound).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false)
		}, 1000);

		let btn_muteSound = this.game.add.image(0, 0, 'btn_mute')
		btn_muteSound.x = this.game.world.top + 183
		btn_muteSound.y = this.game.world.top + 314
		btn_muteSound.scale.setTo(1.29, 1.29)
		this.footer = new Footer(this.game)
		this.shuye_2 = new Shuye_2(this.game)
		this.shuye_1 = new Shuye_1(this.game)
		this.layer = new TileLayer(this.game)
		this.ColorLayer = new ColorLayer(this.game)
		this.ColorLayer.onDeadEnd = this.onDeadEnd
		this.ColorLayer.deadEndContext = this
		this.shapeHolder = new ShapePanel(this.game, 110, this.game.height - 300, this.ColorLayer)
		this.sound_bk = this.add.audio('bk', 5, true)
		this.sound_put = this.add.audio('put')
		this.sound_er = this.add.audio('er')
		this.sound_er2 = this.add.audio('er2')
		this.sound_er3 = this.add.audio('er3')
		this.sound_bk.play()
		// events mute sound
		btn_sound.inputEnabled = true
		btn_sound.events.onInputDown.add(this.Sound_mute, this)

		this.btn_muteSound = btn_muteSound
		btn_muteSound.visible = false
		btn_muteSound.inputEnabled = true
		btn_muteSound.events.onInputDown.add(this.Sound_mute, this)
		// evenst replay game
		btn_refresh.inputEnabled = true
		btn_refresh.events.onInputDown.add(this.replayGame, this)
		this.ColorLayer.matchScore = this.matchScore
		this.ColorLayer.soundEr = this.soundEr
		this.ColorLayer.soundEr2 = this.soundEr2
		this.ColorLayer.soundEr3 = this.soundEr3
		this.ColorLayer.context = this
		if (this.Score == 0) {
			this.txt = new ScoreCounter(this.game, this.game.world.top + 375, this.game.world.top + 265, 'score', '' + this.Score, 20)
			this.txt.alpha = 0
			setTimeout(() => {
				this.game.add.tween(this.txt).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
			}, 2000);

		} else {
			this.txt = new ScoreCounter(this.game, this.game.world.top + 375, this.game.world.top + 265, 'score', '' + this.data.score, 20)

		}

	}
	matchScore(score: number) {
		this.Score = score
		this.newScore = score
		this.game.add.tween(this.txt.scale).to({ x: 1.5, y: 1.5 }, 500, "Linear", false, 0, 0, true)
		this.txt.tween.start()
		if (this.check_sound == false) {
			this.sound_put.play()
		}
		//this.game.state.start('gameover', true, false)


	}
	soundEr() {

		this.sound_er.play()
	}
	soundEr2() {
		this.sound_er2.play()
	}
	soundEr3() {
		this.sound_er3.play()
	}
	Sound_mute() {
		if (this.check_sound == false) {
			this.ColorLayer.check_sound = true
			this.sound_bk.stop()
			this.sound_er.stop()
			this.sound_er2.stop()
			this.sound_er3.stop()
			this.check_sound = true
			this.btn_muteSound.visible = true
		}
		else {
			this.sound_bk.play()
			this.check_sound = false
			this.btn_muteSound.visible = false
			this.ColorLayer.check_sound = false
		}

	}

	replayGame() {
		this.newScore = 0
		this.Score = 0
		this.oldScore = 0
		this.sound_bk.stop()
		this.sound_er.stop()
		this.sound_er2.stop()
		this.sound_er3.stop()
		this.game.state.start('Boot', true, false)
	}
	update() {
		if (this.oldScore < this.newScore) {
			this.oldScore += 0.3;
			//console.log('score', this.oldScore)
			this.txt.text = '' + Math.floor(this.oldScore)
			this.data.score = Math.floor(this.oldScore)
		}
	}

	onDeadEnd() {

		this.newScore = 0
		this.Score = 0
		this.oldScore = 0
		this.sound_bk.stop()
		this.sound_er.stop()
		this.sound_er2.stop()
		this.sound_er3.stop()
		this.game.state.start('gameover', true, false)

	}

}
