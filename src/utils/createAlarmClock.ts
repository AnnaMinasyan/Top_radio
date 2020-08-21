import { getData, storeData } from "./local_storage"
import {_startPlayMusic} from "./playMusic"
export const init = () => {
    let minute = 0
    let hours = 0
    let playItem=''
    getData('alarmClock').then((time) => {
        if (time) {
            console.log(":::::::::::::::::::",time.playItem);
            playItem=time.playItem.st[0].ur
            minute = time.minute
            hours = time.hours
            let f = new Date();
    f.setHours(hours);
    f.setMinutes(minute);
    const alertTime = f.getTime()
    let alertIsRun: boolean = false
    const interval = setTimeout(() => {
        let now: number = Date.now();
        console.log("----------------------------------------------",now-alertTime);
        
        if (now > alertTime) {
            clearTimeout(interval);
            _startPlayMusic(playItem)
            storeData('isplaying', true)
        }
    }, 1000);
        }
    })
    
  
}