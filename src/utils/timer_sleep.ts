import { getData, storeData } from "./local_storage"
import player from "../services/player/PlayerServices"
export const initTimerSleep = (toDo: () => void) => {
    let minute = 0
    let hours = 0
    let playItem = ''
    let repeat = 0
    getData('timerSleep').then((data) => {
        if (data) {
            console.log(data);
             let f = new Date(data);
         

            const interval = setInterval(() => {
                let now: number = Date.now();
                console.log("0000000000000000", now ,f.getTime(),f);

                if (now >f.getTime() ) {

                    clearTimeout(interval);
                    toDo()
                    storeData("timerSleep",null)
                    
                }
            }, 1000);

        }
    })


}