import { NavigationScreenProp } from 'react-navigation';

 export interface IMenuProps {
    styleView:boolean;  
    onchangeSelectedRadioStation(payload:any):void; 
    onchangePlayingData(type:any):void;
    ongetPlayTrackList(type:any):void;
    onchnageSearchData(type:any):void;
    onchangeActiveIndex(type:number):void;
    onchangeActiveBi(type:number):void;
    get_songData(payload: any): void;
    toaddfavorite(type:any):void;
    ongetMenuData():void;
    onchangeSwiperData(payload:any):void; 
    onchangeplayItem(payload:any):void; 
    get_songData(payload:any):void; 
    ongetFavorites(payload:any):void; 
    onchangeswipeablePanelActive(payload:boolean):void; 
    onchangePlayingMusic(payload:boolean):void;
    menuReducer:any,
    navigation: NavigationScreenProp<any, any>,
    filterReducer: any,
    dispatch: any,
    favorites:number[],
    theme:any,
    settingsReducer:any
    bottomReducer:any

} 
export interface IPlayListProps {
    playListReducer:any,
    navigation: NavigationScreenProp<any, any>,
    ongetPlayList(payload:any):void; 
    theme:any
}
export interface IFilterMenuProps {
    styleView:boolean;
    ongetMenuData():void; 
    onchangeplayItem(payload:any):void; 
    onchangeswipeablePanelActive(payload:boolean):void;
    menuReducer:any,
    navigation: NavigationScreenProp<any, any>,
    filterReducer: any,
    theme:any,
    onchangePlayingData(payload:any):void;
    onchangePlayingMusic(payload:boolean):void;
    toaddfavorite(type:any):void;
    favorites:any,
    onchangeActiveIndex(type:number):void;
    onchangeSwiperData(payload:any):void; 
    bottomReducer:any
} 
export interface IGanresProps {
    styleView:boolean;
    ongetGanresData():void;
    onchnageSearchData(type:any):void;
    menuReducer:any,
    ganresReducer:any,
    filterReducer: any,
    onchangeFilterDataByGenre(payload:any):void; 
    navigation: NavigationScreenProp<any, any>;
    theme:any,
    onchangeHeaderText(type:string):void;

} 
export interface ISettings {
    styleView:boolean;
    onchangeAutoPlay(type:boolean):void;
    onchangeIsOnheadsets(type:boolean):void;
   onchangeBackgroundColor(type:boolean):void;
    theme:any,
    navigation: NavigationScreenProp<any, any>,
    onChangeMenuType(type:number):void; 
    onchangeBufferSize(type:string):void;
    filterReducer: any,
    settingsReducer:any
} 
export interface ICitiesProps {
    styleView:boolean;
    onchangeFilterData(type:any):void;
    onchangeHeaderText(type:string):void;
    onGetCities():void;
    citiesReducer:any,
    menuReducer:any,
    navigation: NavigationScreenProp<any, any>;
    filterReducer: any,
    onchnageSearchData(type:any):void;
    theme:any
}
export interface IRadioMenuElementProps {
    title:string,
    image:string,
    addInFavorite():void,
    isFavorite:boolean,
    backColor:string,
    //theme:any
}
export interface ICitiesMenuElementProps {
    info:ICitiesConnect,
    backColor:string
    
}
export interface ICitiesConnect{
    pa:string,
    id:number
     co:number
}
export interface ISimpleSwitchProps{

}
export interface IData{
    title:string,
   check:boolean,
   
}