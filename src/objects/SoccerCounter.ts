
    // function animation(target: any, propertyKey: string | symbol) {
	// 	let _val = this[propertyKey]
	//     const setter = function(newVal:any) {
	//     	let tween:Phaser.Tween = this['tween']
	//     	tween.start()
	//     	this.increaseScore(100)
	//     	_val = newVal
	//     }

	//     const getter = function(){
	//     	return _val
	//     }

	//     if (delete this[propertyKey]) {
	//         Object.defineProperty(target, propertyKey, {
	//             set: setter,
	//             get: getter,
	//             enumerable: true,
	//             configurable: true
	//         })
	//     }
	// }

	export class ScoreCounter extends Phaser.BitmapText {
		tween:Phaser.Tween
		timer:Phaser.Timer
		count:number = 0
		// @animation
		aniText:number

		constructor(game:Phaser.Game, x:number, y:number, key:string, text:string, size:number){ //time in second
			super(game, x, y, key, text, size)
			game.add.existing(this)
			this.anchor.setTo(0.5,0.5)
			this.tween = new Phaser.Tween(this.scale, game, this.game.tweens)
	    	.to({x:1.5, y:1.5}, 500, "Linear", false, 0,0,true)
			this.timer = new Phaser.Timer(game, false)
			game.time.add(this.timer)
		}

		increaseScore(delta:number){
			this.count = parseInt(this.text)
			this.timer.repeat(500/delta, delta, this.onTick, this)
			this.timer.start()
		}

		onTick(){
			this.text = '' + (++this.count)
		}
	}
