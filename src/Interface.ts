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
     onchangeLookingList(payload:boolean):void;
    onchangePlayingMusic(payload:boolean):void;
    menuReducer:any,
    navigation: NavigationScreenProp<any, any>,
    filterReducer: any,
    dispatch: any,
    favorites:number[],
    theme:any,
    settingsReducer:any
    bottomReducer:any
     onchangeMiniScreenData(payload:any):void;
     onchangeSwiperShowStation(payload:any):void;
      onsetFilterData(payload:any):void;
      onchangeSearchData(payload:any):void; 
      ondeleteIsFavorite(payload:any):void; 
      onchangeSwiperListType(payload:any):void; 

 }
export interface IPlayListProps {
    playListReducer:any,
    bottomReducer:any,
    navigation: NavigationScreenProp<any, any>,
    ongetPlayList(payload:any):void; 
    ongetTrackList(payload:any):void;
    onchangeSelectedRadioStationPlaying(payload:any):void;
    onchangeSwiperShowStation(payload:any):void;
    theme:any,
    filterReducer:any,
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
    bottomReducer:any,
    onchangeSwiperShowStation(payload:any):void;
    get_songData(payload:any):void;
    onchangeMiniScreenData(payload:any):void;
    onchangeSelectedRadioStation(payload:any):void;
    onchangeSearchData(payload:any):void;
    onchangeSwiperListType(payload:any):void;
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
    bottomReducer:any,
    onchangeFilterGanres(type:any):void;

} 
export interface ISettings {
    styleView:boolean;
    onchangeAutoPlay(type:boolean):void;
    onchangeIsOnheadsets(type:boolean):void;
   onchangeBackgroundColor(type:boolean):void;
   onchangeSelectedRadioStationPlaying(payload: any): void;
    theme:any,
    navigation: NavigationScreenProp<any, any>,
    onChangeMenuType(type:number):void; 
    onchangeBufferSize(type:string):void;
    onchangeReconnenct(type:boolean):void;
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
    onchangeFilterCities(type:any):void;
    theme:any,
}
export interface IRadioMenuElementProps {
    title:string,
    image:string,
    addInFavorite():void,
    id:number,
    backColor:string,
    theme?:any,
    showFavoriteHeart?:boolean,
    favorites:any
}
export interface ICitiesMenuElementProps {
    info:ICitiesConnect,
    backColor:string
        onSelect():void

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