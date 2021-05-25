

import TrackPlayer from 'react-native-track-player';
import { storeData } from '../../utils/local_storage';

export interface IgetMenuDatasMethodResponse {
    [key: string]: any,
}
interface IDATA {
    playerRef: any;
    init(value: any): void;
    open(valu:any): void
    close(): void,
    stopPlayer(): void,
    _startPlayMusic(a:any,b:any):void
    isopenpanel:boolean
}
class PlayerServices implements IDATA {
    playerRef: any=null;
    isopenpanel:boolean=false;
    
    
    init(value: any) {
        this.playerRef = value
     
      
    }
    open(radioStation:any) {        
        if(this.playerRef)
            {this.playerRef.showFull(radioStation)}
          
            
            // setTimeout(this.open, 500);
    }
    close() {        
        this.playerRef&&    this.playerRef.showMini()
    
    }
    changeopenpanel(){
       this.isopenpanel=true
    }
    async _startPlayMusic(music:any,activeBi:any) {
        const playerState = await TrackPlayer.getState();

           // console.log('destroying..', music.st);
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: "local-track",
                url: activeBi.ur,
                title: music.pa,
                artist: '',
                artwork: 'https://top-radio.ru/assets/image/radio/180/' + music.im,
            });
            await TrackPlayer.play();

       
    }
    async _pouseMusic() {
        storeData("autoPlayData",null)
            await TrackPlayer.pause();
        
    }
    async stopPlayer(){
        await TrackPlayer.stop()
    }

   

   
}
const player = new PlayerServices();
export default player