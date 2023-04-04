const Player= require("./player");
const Room = require("./room");

class Game {

    constructor(number, room) {
        this.number = number;
        this.room = room;

    }
    getNumber() {
        return this.number;
    }
    setNumber(newNumber) {
        this.number = newNumber;
    }

    getRoomId() {
        return this.room.getNumber();
    }

    getUser1(){
        return this.room.getPlayer1();
    }

    getUser2(){
        return this.room.getPlayer2();
    }

}

module.exports = Game;