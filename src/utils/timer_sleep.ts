import { getData, storeData } from "./local_storage"
import player from "../services/player/PlayerServices"

export const initTimerSleep = (toDo: () => void, data:any) => {
    //stex data -ov poxancel em hours:number, u minute:number, u pordzel em hamematel ete jamy khamngni es pahi jami het ropen stuge u bdi kanchver toDo()

    let nowMinute= new Date().getMinutes()

    const interval = setInterval(() => {
        let nowHours= new Date().getHours()

                if(nowHours==data.hours){

                    if(nowMinute>data.minute){
                        toDo()
                        clearTimeout(interval);
                    }else{
                        console.log("nsssssssssssssssssssssssssss")
                    }
                }else{
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
            }, 60000);
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