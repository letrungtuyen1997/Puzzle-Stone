

//export enum element { A=0,B,C,D}
export class Peice extends Phaser.Image {
//	private color:element
	
	constructor(game:Phaser.Game, x:number, y:number) {
		super(game, x, y, 'peice')
		this.scale.setTo(2.4, 2.4)
	//	this.color =Color
	}
}