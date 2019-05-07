import { Shuye_1 } from '../objects/shuye_1'
import { Shuye_2 } from '../objects/shuye_2'
import { Title } from '../states/title'
import Preloader from './preloader';
export class LeaderBoard extends Phaser.State {

    shuye_1: Shuye_1
    shuye_2: Shuye_2
    txt: Phaser.BitmapText
    Title: Title
    replayGame: Function
    btn_replay_context: any
    //fbData:Data.FBInfo
    preload() {
        var playerImage = new Image();
        playerImage.src = FBInstant.player.getPhoto();
        //let avt = playerImage.src
        this.game.load.image('profile', playerImage.src)
    }
    create() {
        this.add.image(0, 0, 'bg').scale.setTo(this.world.height / this.world.width, this.world.height / this.world.width)
        this.shuye_1 = new Shuye_1(this.game)
        this.shuye_2 = new Shuye_2(this.game)
        this.txt = this.game.add.bitmapText(this.game.world.centerX - 250, this.game.world.top + 200, 'bubble', 'Score', 150)
        this.txt = this.game.add.bitmapText(this.game.world.centerX - 130, this.game.world.top + 400, 'score', '200', 50)

        let btn_challenge = this.add.sprite(0, this.game.world.centerY - 300, 'ui', 55)
        btn_challenge.scale.setTo(1.7, 1.4)
        btn_challenge.x = this.game.world.centerX - (btn_challenge.width / 2)
        let btn_replay = this.add.sprite(0, this.game.world.centerY + 600, 'ui', 40)
        btn_replay.x = this.game.world.centerX - (btn_replay.width / 2)
        btn_replay.inputEnabled = true
        btn_replay.events.onInputDown.add(this.replay_Game, this)
        let playerName = FBInstant.player.getName();
        let bg2 = this.game.add.image(0, 0, 'leaderboard')
        bg2.x = 0
        bg2.y = this.game.world.centerY
        bg2.scale.setTo(1, 1.3)
        console.log(playerName)
        let textStyle = { font: "50px Arial", fill: "#EEEEEE", }
        let rank = 1
        for (let i = 0; i < 3; i++) {
            let frameAvatar2 = this.game.add.sprite(0, 0, 'ui', 51)
            let name = this.game.add.text(0, 0, playerName, textStyle)
            let avt = this.game.add.image(0, 0, 'profile')
            this.txt = this.game.add.bitmapText(this.game.world.top + i * 350 + 200, this.game.world.centerY + 60, 'score', '' + rank, 20)
            rank += 1
            frameAvatar2.x = this.game.world.top + i * 350 + 140
            frameAvatar2.y = this.game.world.centerY + 150
            frameAvatar2.scale.setTo(1.67, 1.67)
            avt.x = this.game.world.top + i * 350 + 150
            avt.y = this.game.world.centerY + 161
            console.log('avt :' + avt.width + 'asc' + avt.height);
            avt.scale.setTo(0.43, 0.43)
            name.x = this.game.world.top + i * 350 + 140
            name.y = this.game.world.centerY + 350

        }


        // let avt=this.game.add.image(100,100, 'profile')
        // avt.x= this.game.world.centerX
        //avt.y = this.game.world.centerY
        // let name=this.add.text(200,200,playerName).scale.setTo(3,3)
        // name.x = this.game.world.centerX
        // name.y = this.game.world.centerY - 100
        // setData(count)
        // count = count + 1
        // getData()
    }
    replay_Game() {

        this.game.state.start('Title', true, false)

    }
}

