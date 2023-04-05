
const { roomData } = require('./storage.js');



class Player {

    constructor(playerData) {
        this.player = playerData.player;
        this.avatar = playerData.avatar
        this.room = playerData.room;
    }

    saySomething() 
    {
        console.log('HELLO PLAYER!')        

    }

    checkRoomPlayers()
    {   
        //console.log( 'El numero de usuarios es: ' + roomData[this.room].length );
        if ( roomData[this.room].length < 2 )
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    addPlayer2Room() 
    {        
        if (this.checkRoomPlayers())
        {
            roomData[this.room].push({
                player: this.player,
                avatar: this.avatar,
            }            
            );
            console.log(roomData[this.room]);
            console.log('Jugador en la sala!')
            return true;
        }
        else 
        {
            console.log('La sala está completa')
            return false;
        }
        
    }

    getRoomData()
    {
        return roomData[this.room];
    }

    getRoom()
    {
        return this.room;
    }




}

module.exports = { Player }