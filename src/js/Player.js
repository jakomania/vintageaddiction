
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
        console.log( 'Jugadores en la sala: ' + roomData[this.room].length );
        if ( roomData[this.room].length < 2 )
        { return true; }
        else
        { return false; }
    }

    addPlayer2Room() 
    {        
        var playersNumber = this.checkRoomPlayers();
        var playerPresent = this.compareUsers();

        if ( playersNumber && !playerPresent )
        {
            roomData[this.room].push({
                player: this.player,
                avatar: this.avatar,
            }            
            );            
            console.log('El hugador ' + this.player + ' ha entradao en la sala ' + this.room )
            return true;
        }
        else 
        {
            console.log('Ya estas en la sala o la sale está completa')
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


    compareUsers()
    {
        var players = this.getRoomData();
        var isPresent = false;

        players.forEach(element => 
            {
                if ( element.player == this.player)
                { isPresent = true }
                
            });
        
        return isPresent;
    }
}


module.exports = { Player }