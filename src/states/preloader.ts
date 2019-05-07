export default class Preloader extends Phaser.State {
	preloadBar: Phaser.Sprite;
	ready: boolean = false;

	preload() {
		this.game.load.crossOrigin = 'anonymous'
		this.preloadBar = this.add.sprite(this.world.centerX - 500 / 2, this.world.centerY, 'preloadBar')
		this.load.setPreloadSprite(this.preloadBar)
		this.load.image('bg', 'assets/ui/bg4.png')
		this.load.image('box', 'assets/ui/box1.png')
		this.load.image('header', 'assets/ui/header.png')
		this.load.image('shuye_1', 'assets/ui/shuye_1.png')
		this.load.image('footer', 'assets/ui/footer.png')
		this.load.image('shuye_2', 'assets/ui/shuye_2.png')
		this.load.image('peice', 'assets/sprite/peice6.png')
		//this.load.image('peice2', 'assets/sprite/wood.png')
		this.load.image('ldb', 'assets/ui/ldb.png')
		this.load.image('plf', 'assets/ui/player_frame.png')
		this.load.image('avt1', 'assets/sprite/frameAvt.png')
		this.load.image('avt2', 'assets/sprite/frameAvt.png')
		this.load.image('scr1','assets/sprite/frameScore2.png')
		this.load.image('scr2','assets/sprite/frameScore2.png')
		this.load.image('btn_replay', 'assets/sprite/btn_replay.png')
		this.load.image('btn_sound','assets/ui/btn_sound.png')
		this.load.image('btn_mute','assets/ui/btn_sound_mute.png')
		this.load.image('btn_replay2','assets/ui/btn_replay.png')




		this.load.image('leaderboard', 'assets/ui/leaderboard.png')
		//this.load.spritesheet('peice','assets/sprite/peice9.png', 50, 50, 4)
		this.load.spritesheet('peices', 'assets/sprite/Piece2.png', 50, 50, 8)
		this.game.load.atlas('test', 'assets/sprite/block.png', 'assets/sprite/block.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
		this.load.bitmapFont('bubble', 'assets/font/font2.png', 'assets/font/font2.fnt')
		this.load.bitmapFont('score', 'assets/font/font/fenshu.png', 'assets/font/font/fenshu.fnt')
		this.load.audio('bk', 'assets/sound/bk.mp3', true)
		this.load.audio('put', 'assets/sound/put1.mp3', true)
		this.load.audio('er', 'assets/sound/e1.mp3', true)
		this.load.audio('er2', 'assets/sound/e2.mp3', true)
		this.load.audio('er3', 'assets/sound/e4.mp3', true)
		this.game.load.atlas('ui', 'assets/sprite/ui.png', 'assets/sprite/ui.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
		this.game.load.atlas('ui', 'assets/sprite/ui.png', 'assets/sprite/ui.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)


	}

	create() {
		this.game.state.start('Title', true, false)
	}
}
