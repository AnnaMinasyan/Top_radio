import { getData, storeData } from "./local_storage"
import { _startPlayMusic } from "./playMusic"
export const init = (toAlert: () => void) => {
    let minute = 0
    let hours = 0
    let playItem = ''
    let repeat = 0
    getData('alarmClock').then((time) => {
        if (time) {
            playItem = time.playItem.st[0].ur
            minute = time.minute
            hours = time.hours
            repeat = time.repeat
            let f = new Date();
            f.setHours(hours);
            f.setMinutes(minute);
            f.setSeconds(0)
            const alertTime = f.getTime()
            let alertIsRun: boolean = false
            let now: number = Date.now();

            if (now > alertTime  ) {
                f.setDate(f.getDate() + 1);
                let tomorrowTime=time
                tomorrowTime.hours= f.getHours();
                tomorrowTime.minute=f.getMinutes();
               // f.setSeconds(0)
                storeData('alarmClock', tomorrowTime)

            }else{
            const interval = setInterval(() => {

                if (now > alertTime ) {
                    clearTimeout(interval);
                    _startPlayMusic(playItem)
                    alertIsRun=true
                    toAlert()
                    if (repeat && repeat > 0) {
                        storeData('alarmClock',
                            {
                                hours: hours,
                                minute: minute + repeat,
                                playItem: time.playItem,
                                repeat: repeat
                            })
                    } else {
                      //  storeData('alarmClock', null)

                    }
                }
            }, 1000);}
        }
    })


}