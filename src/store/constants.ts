
export enum MenuTypes {
    CHANGE_MENU_TYPE = '@menutypes/CHANGE_MENU_TYPE',
    GET_MENU_DATA= '@menutypes/GET_MENU_DATA',
    SET_MENU_DATA= '@menutypes/SET_MENU_DATA', 
     SET_PLAY_LIST= '@menutypes/SET_PLAY_LIST',
    GET_STATIC_TEXTS='@menutypes/GET_STATIC_TEXTS',
    SET_STATIC_TEXTS='@menutypes/SET_STATIC_TEXTS', 
    CHANGE_FILTER_DATA='@menutypes/CHANGE_FILTER_DATA',
    CHANGE_FILTER_DATA_BY_GENRE='@menutypes/CHANGE_FILTER_DATA_BY_GENRE',
    GET_FAVORITES='@menutypes/GET_FAVORITES',
    CHANGE_FAVORITE='@menutypes/CHANGE_FAVORITE',
}
export enum PlayListTypes {
     SET_PLAY_LIST= '@playListtypes/SET_PLAY_LIST',
     GET_PLAY_LIST= '@playListtypes/GET_PLAY_LIST',

}
export enum CitiesTypes {  
    GET_CITIES_DATA= '@citiestypes/GET_CITIES_DATA',
    SET_CITIES_DATA='@citiestypes/SET_CITIES_DATA',
}
export enum GanresTypes {  
    GET_GANRES_DATA= '@ganresTypes/GET_GANRES_DATA',
    SET_GANRES_DATA='@ganresTypes/SET_GANRES_DATA',
}
export enum FilterTypes {  
    CHANGE_IS_FAVORITE= '@filterTypes/CHANGE_IS_FAVORITE',
    CHANGE_SWIPEABLEPANELACTIVE='@filterTypes/CHANGE_SWIPEABLEPANELACTIVE',
    CHANGE_PLAY_ITEM='@filterTypes/CHANGE_PLAY_ITEM',
    CHANGE_IS_LOOKING='@filterTypes/CHANGE_IS_LOOKING',
    CHANGE_BACKGROUNDCOLOR='@filterTypes/CHANGE_BACKGROUNDCOLOR',
    GET_FAVORITES='@filterTypes/GET_FAVORITES',
    ADD_FAVORITE='@filterTypes/ADD_FAVORITE', 
    CHANGE_SHEARCH_DATA='@filterTypes/CHANGE_SHEARCH_DATA',
    CHANGE_PLAYING_MUSIC='@filterTypes/CHANGE_PLAYING_MUSIC',
}
export enum FavoriteType {
    ADD = "@FavoriteType/ADD",
    SET = "@FavoriteType/SET",
    INIT = "@FavoriteType/INIT"
    
}