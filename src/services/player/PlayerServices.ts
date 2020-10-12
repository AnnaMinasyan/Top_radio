

import TrackPlayer from 'react-native-track-player';

export interface IgetMenuDatasMethodResponse {
    [key: string]: any,
}
interface IDATA {
    playerRef: any;
    init(value: any): void;
    open(): void
    close(): void,
    _startPlayMusic(a:any,b:any):void
    isopenpanel:boolean
}
class PlayerServices implements IDATA {
    playerRef: any=null;
    isopenpanel:boolean=false;
    init(value: any) {        
        this.playerRef = value
    }
    open() {
        if(this.playerRef)
            this.playerRef.show()
            else 
       {     setTimeout(() => {
           console.log("pppppppppppp");
           
                this.open()
            }, 10);}
            
            // setTimeout(this.open, 500);
    }
    close() {
        this.playerRef.hide()
    
    }
    changeopenpanel(){
       this.isopenpanel=true
    }
    async _startPlayMusic(music:any,title:any) {
        const playerState = await TrackPlayer.getState();
        console.log("----------------------------", playerState, music.st[0].ur);
        if (
            playerState != 0
        ) {
            console.log('destroying..', music.st[0].ur);
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: "local-track",
                url: music.st[0].ur,
                title: title.song,
                artist: title.artist,
                artwork: 'https://top-radio.ru/assets/image/radio/180/' + music.im,
            });
            await TrackPlayer.play();
        } else {
            this._pouseMusic()
        }
       
    }
    async _pouseMusic() {
            await TrackPlayer.pause();
        
    }
    
   
}
const player = new PlayerServices();
export default player