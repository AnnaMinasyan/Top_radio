import { NavigationScreenProp } from 'react-navigation';

 export interface IMenuProps {
    styleView:boolean;
    onChangeMenuType(type:boolean):void;
    ongetPlayTrackList(type:any):void;
    ongetMenuData():void; 
    onchangeplayItem(payload:any):void; 
    onchangeswipeablePanelActive(payload:boolean):void;
    menuReducer:any,
    navigation: NavigationScreenProp<any, any>,
    filterReducer: any,

}
export interface IFilterMenuProps {
    styleView:boolean;
    onChangeMenuType(type:boolean):void;
    ongetMenuData():void; 
    onchangeplayItem(payload:any):void; 
    onchangeswipeablePanelActive(payload:boolean):void;
    menuReducer:any,
    navigation: NavigationScreenProp<any, any>,
    filterReducer: any,

} 
export interface IGanresProps {
    styleView:boolean;
    onChangeMenuType(type:boolean):void;
    ongetGanresData():void;
    menuReducer:any,
    ganresReducer:any,
    filterReducer: any,
    onchangeFilterDataByGenre(payload:any):void; 
    navigation: NavigationScreenProp<any, any>;

} 
export interface ICitiesProps {
    styleView:boolean;
    onChangeMenuType(type:boolean):void;
    onchangeFilterData(type:any):void;
    onGetCities():void;
    citiesReducer:any,
    menuReducer:any,
    navigation: NavigationScreenProp<any, any>;
    filterReducer: any,

}
export interface IRadioMenuElementProps {
    title:string,
    image:string,
    addInFavorite():void,
    isFavorite:boolean,
    backColor:string,
}
export interface ICitiesMenuElementProps {
    info:ICitiesConnect,
    backColor:string
    
}
export interface ICitiesConnect{
    pa:string,
    id:number
    // color?:string
}
export interface ISimpleSwitchProps{

}
export interface IData{
    title:string,
   
   check:boolean,
   
}