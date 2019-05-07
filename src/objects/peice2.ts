export class Peice2 extends Phaser.Image {
	constructor(game:Phaser.Game, x:number, y:number) {
		super(game, x, y, 'peice2')
		this.scale.setTo(1.7, 1.7)
	}
}