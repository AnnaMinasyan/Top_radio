


export interface IgetMenuDatasMethodResponse {
    [key: string]: any,
}
interface IDATA {
    playerRef: any;
    init(value: any): void;
    open(): void
    close(): void,
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
   
}
const player = new PlayerServices();
export default player