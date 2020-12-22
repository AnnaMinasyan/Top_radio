import { getData, storeData } from "./local_storage"
import player from "../services/player/PlayerServices"
export const initTimerSleep = (toDo: () => void) => {
    let minute = 0
    let hours = 0
    let playItem = ''
    let repeat = 0
    getData('timerSleep').then((data) => {
        if (data) {
             let f = new Date(data);

            let hours = new Date().getHours()
            let minute =  new Date().getMinutes()
            console.log("alarm",f,"now",new Date().getMinutes())
            // const interval = setInterval(() => {
            //
            //
            //     if (f.getHours()==hours ) {
            //         console.log("sss",f.getMinutes(),minute)
            //         if (f.getMinutes()>minute){
            //             //console.log("sss",f.getMinutes(),minute)
            //         clearTimeout(interval);
            //              toDo()
            //             // storeData("timerSleep",null)
            //         }
            //
            //
            //     }
            // }, 5000);

        }
    })


}