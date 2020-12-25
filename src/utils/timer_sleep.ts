import { getData, storeData } from "./local_storage"
import player from "../services/player/PlayerServices"
const intervals:any[] = []
export const initTimerSleep = (toDo: () => void, data:any) => {
    //stex data -ov poxancel em hours:number, u minute:number, u pordzel em hamematel ete jamy khamngni es pahi jami het ropen stuge u bdi kanchver toDo()
        while(intervals.length){
            clearInterval(intervals.shift());
        }
        const interval = setInterval(() => {
            console.log('timer',interval,data);
            
        let nowMinute= new Date().getMinutes()
        let nowHours= new Date().getHours()
                if(nowHours==data.hours){
                    if(nowMinute==data.minute){
                        console.log("minuu");
                        console.log('interval',interval);
                        
                        clearInterval(interval);
                        toDo()
                    }
                    // console.log('false')
                }
                // if (f.getHours()==hours ) {
                //     console.log("sss",f.getMinutes(),minute)
                //     if (f.getMinutes()>minute){
                //         //console.log("sss",f.getMinutes(),minute)
                //
                //          toDo()
                //         // storeData("timerSleep",null)
                //     }
                //
                //
                // }
            }, 5000);
            intervals.push(interval)
    // getData('timerSleepTime').then((data) => {
    //     if (data) {
    //         console.log(";;;;;;;;",data)
    //
    //         // const interval = setInterval(() => {
    //         //
    //         //
    //         //     if (f.getHours()==hours ) {
    //         //         console.log("sss",f.getMinutes(),minute)
    //         //         if (f.getMinutes()>minute){
    //         //             //console.log("sss",f.getMinutes(),minute)
    //         //         clearTimeout(interval);
    //         //              toDo()
    //         //             // storeData("timerSleep",null)
    //         //         }
    //         //
    //         //
    //         //     }
    //         // }, 5000);
    //
    //     }
    // })


}