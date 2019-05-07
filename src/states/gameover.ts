import { Shuye_1 } from '../objects/shuye_1'
import { Shuye_2 } from '../objects/shuye_2'
import { Title } from '../states/title'
import Preloader from './preloader';
import { MyFBStorage } from '../models/model';
import { game } from '../app';
import { Leaderboard } from '../objects/LeaderBoard'
export class gameover extends Phaser.State {

    shuye_1: Shuye_1
    shuye_2: Shuye_2
    txt: Phaser.BitmapText
    Title: Title
    replayGame: Function
    btn_replay_context: any
    data: MyFBStorage

    init() {
        this.data = <MyFBStorage>game.data
    }


    preload() {
        var playerImage = new Image();
        playerImage.src = FBInstant.player.getPhoto();
        //let avt = playerImage.src
        this.game.load.image('profile', playerImage.src)
    }
    create(entry: any) {
        this.add.image(0, 0, 'bg').scale.setTo(this.world.height / this.world.width, this.world.height / this.world.width)
        this.shuye_1 = new Shuye_1(this.game)
        this.shuye_2 = new Shuye_2(this.game)
        this.txt = this.game.add.bitmapText(this.game.world.centerX - 250, this.game.world.top + 200, 'bubble', 'Score', 150)
        let	sc = (<MyFBStorage>game.data).score
        this.txt = this.game.add.bitmapText(0, this.game.world.top + 400, 'score', ''+sc, 50)
        this.txt.x= this.game.world.centerX - (this.txt.width/2)
        let btn_challenge = this.add.image(0, this.game.world.centerY - 300, 'scr1')
        btn_challenge.scale.setTo(1.7, 1.4)
        btn_challenge.x = this.game.world.centerX - (btn_challenge.width / 2)
        //let btn_replay = this.add.sprite(0, this.game.world.centerY + 600, 'ui', 40)
        let btn_replay = this.add.image(0, this.game.world.centerY + 600, 'btn_replay')
        console.log('btnreplayw: ', btn_replay.width, ' btnreplayH: ', btn_replay.height)
        btn_replay.x = this.game.world.centerX - (btn_replay.width - 80)
        btn_replay.scale.setTo(1.7, 1.2)
        btn_replay.inputEnabled = true
        btn_replay.events.onInputDown.add(this.replay_Game, this)
        let ldb = new Leaderboard(this.game, 0, 40)
        ldb.centerX = this.game.world.centerX
    }
    replay_Game() {

        this.game.state.start('Title', true, false)

    }
}

