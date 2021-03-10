
export enum MenuTypes {
    GET_MENU_DATA = '@menutypes/GET_MENU_DATA',
    SET_MENU_DATA = '@menutypes/SET_MENU_DATA',
    SET_PLAY_LIST = '@menutypes/SET_PLAY_LIST',
    GET_STATIC_TEXTS = '@menutypes/GET_STATIC_TEXTS',
    SET_STATIC_TEXTS = '@menutypes/SET_STATIC_TEXTS',
    CHANGE_FILTER_DATA = '@menutypes/CHANGE_FILTER_DATA',
    CHANGE_HEADERTEXT = '@menutypes/CHANGE_HEADERTEXT',
    SET_HEADERTEXT = '@menutypes/SET_HEADERTEXT',
    CHANGE_LOOKING_LIST = '@menutypes/CHANGE_LOOKING_LIST',
    CHANGE_FAVORITE = '@menutypes/CHANGE_FAVORITE',
    SET_LOOKING_LIST='@menutypes/CHANGE_FAVORITE',
    SET_PLAYINGDATA = '@menutypes/SET_PLAYINGDATA',
    CHANGE_PLAYINGDATA = '@menutypes/CHANGE_PLAYINGDATA',
    CHANGE_SWIPER_DATA = '@menutypes/CHANGE_SWIPER_DATA',
    SET_SWIPER_DATA = '@menutypes/SET_SWIPER_DATA',
    SET_FILTER_DATA = '@menutypes/SET_FILTER_DATA',
    SET_ACTIVE_INITIALROUTE_NAME= '@menutypes/SET_ACTIVE_INITIALROUTE_NAME',
   CHANGE_ACTIVE_INITIALROUTE_NAME= '@menutypes/CHANGE_ACTIVE_INITIALROUTE_NAME',
    SET_FAVORITE_LIST= '@menutypes/CHANGE_ACTIVE_INITIALROUTE_NAME',
    SET_SEARCH_DATA= '@menutypes/SET_SEARCH_DATA',
    CHANGE_SEARCH_DATA= '@menutypes/CHANGE_SEARCH_DATA',
}
export enum PlayListTypes {
    SET_PLAY_LIST = '@playListtypes/SET_PLAY_LIST',
    SET_TRACK_LIST = '@playListtypes/GET_TRACK_LIST',
    SET_HEADER_TEXT = '@playListtypes/SET_HEADER_TEXT',
    GET_PLAY_LIST = '@playListtypes/GET_PLAY_LIST',
}
export enum CitiesTypes {
    GET_CITIES_DATA = '@citiestypes/GET_CITIES_DATA',
    SET_CITIES_DATA = '@citiestypes/SET_CITIES_DATA',
    SET_FILTER_CITIES_DATA = '@citiestypes/SET_FILTER_CITIES_DATA', 
    CHANGE_FILTER_CITIES_DATA = '@citiestypes/CHANGE_FILTER_CITIES_DATA', 
}
export enum GanresTypes {
    GET_GANRES_DATA = '@ganresTypes/GET_GANRES_DATA',
    SET_GANRES_DATA = '@ganresTypes/SET_GANRES_DATA',
    SET_FILTER_GANRE = '@ganresTypes/SET_FILTER_GANRE', 
    CHANGE_FILTER_GANRE = '@ganresTypes/CHANGE_FILTER_GANRE',  
}
export enum FilterTypes {
    CHANGE_IS_FAVORITE = '@filterTypes/CHANGE_IS_FAVORITE',
    CHANGE_SWIPEABLEPANELACTIVE = '@filterTypes/CHANGE_SWIPEABLEPANELACTIVE',
    CHANGE_IS_ACTIVE = '@filterTypes/CHANGE_IS_ACTIVE',
    GET_FAVORITES = '@filterTypes/GET_FAVORITES',
    ADD_FAVORITE = '@filterTypes/ADD_FAVORITE',
    CHANGE_SHEARCH_DATA = '@filterTypes/CHANGE_SHEARCH_DATA',
    CHANGE_PLAYING_MUSIC = '@filterTypes/CHANGE_PLAYING_MUSIC',
    SET_MENU_TYPE = '@filterTypes/CHANGE_MENU_TYPE',
    INIT_MENU_TYPE = '@filterTypes/INIT_MENU_TYPE',
    GET_MENU_TYPE = '@filterTypes/GET_MENU_TYPE',
    SET_PLAYLIST_TYPE = '@filterTypes/SET_PLAYLIST_TYPE'
}
export enum ThemeTypes {
    CHANGE_BACKGROUNDCOLOR = '@themeTypes/CHANGE_BACKGROUNDCOLOR',
    SET_HEIGHT_WIDTH = '@themeTypes/SET_HEIGHT_WIDTH', 
}
export enum FavoriteType {
    ADD = "@FavoriteType/ADD",
    SET = "@FavoriteType/SET",
    INIT = "@FavoriteType/INIT"


}
export enum SettingsType {
    CHANGE_AUTO_PLAY = "@SettingsType/CHANGE_AUTO_PLAY",
    INIT_AUTO_PLA = "@SettingsType/INIT_AUTO_PLA",
    SET_AUTO_PLAY = "@SettingsType/SET_AUTO_PLAY",
    SET_BUFFER_SIZE = "@SettingsType/SET_BUFFER_SIZE",
    CHANGE_BUFFER_SIZE = "@SettingsType/CHANGE_BUFFER_SIZE",
    SET_IS_ON_HEADSES = "@SettingsType/SET_IS_ON_HEADSES",
    CHANGE_IS_ON_HEADSES = "@SettingsType/CHANGE_IS_ON_HEADSES",

}
export enum BottomType {
    CHANGE_PLAY_ITEM = '@bottomtypes/CHANGE_PLAY_ITEM',
    SET_PLAY_ITEM = '@bottomtypes/SET_PLAY_ITEM',
    SET_PLAY_ITEM_ARTIST_SONG = '@bottomtypes/SET_PLAY_ITEM_ARTIST_SONG',
    CHANGE_PLAYING_DATA = '@bottomtypes/CHANGE_PLAYING_DATA',
    SET_PLAYING_DATA = '@bottomtypes/SET_PLAYING_DATA',
    CHANGE_PLAY_ITEM_ARTIST_SONG = '@bottomtypes/CHANGE_PLAY_ITEM_ARTIST_SONG',
    CHANGE_ACTIVE_INDEX = '@bottomtypes/CHANGE_ACTIVE_INDEX',
    SET_ACTIVE_INDEX = '@bottomtypes/SET_ACTIVE_INDEX',
    SET_ACTIVE_BI = '@bottomtypes/SET_ACTIVE_BI',
    CHANGE_ACTIVE_BI = '@bottomtypes/CHANGE_ACTIVE_BI',
    GET_SONG_DATA = '@bottomtypes/GET_SONG_DATA',
    SET_MINI_SCREENDATA= '@bottomtypes/SET_MINI_SCREENDATA',
    CHANGE_MINI_SCREENDATA= '@bottomtypes/CHANGE_MINI_SCREENDATA',
    CHANGE_SELECTED_STATION_BY_BI= '@bottomtypes/CHANGE_SELECTED_STATION_BY_BI',
    SET_IS_CONNECTED= '@bottomtypes/SET_IS_CONNECTED',
    CHANGE_IS_CONNECTED= '@bottomtypes/CHANGE_IS_CONNECTED',
    CLEAR_REDUCER= '@bottomtypes/CLEAR_REDUCER',
    SET_SELECTED_RADIOSTATION = '@bottomtypes/SET_SELECTED_RADIOSTATION',
     CHANGE_SELECTED_RADIOSTATION = '@bottomtypes/CHANGE_SELECTED_RADIOSTATION', 
     SET_SELECTED_RADIOSTATION_PLAYMUSIC= '@bottomtypes/SET_SELECTED_RADIOSTATION_PLAYMUSIC',  
     CHANGE_SELECTED_RADIOSTATION_PLAYMUSIC= '@bottomtypes/CHANGE_SELECTED_RADIOSTATION_PLAYMUSIC',  
     SET_SWIPERSHOW_RADIOSTATION= '@bottomtypes/SET_SWIPERSHOW_RADIOSTATION',
      CHANGE_SWIPERSHOW_RADIOSTATION= '@bottomtypes/CHANGE_SWIPERSHOW_RADIOSTATION', 
      SET_SWIPERSHOW_RADIOSTATION_PLAYINGSONG= '@bottomtypes/SET_SWIPERSHOW_RADIOSTATION_PLAYINGSONG',
      CHANGE_SWIPERSHOW_RADIOSTATION_PLAYINGSONG= '@bottomtypes/CHANGE_SWIPERSHOW_RADIOSTATION_PLAYINGSONG',
      SET_SWIPERSHOW_RADIOSTATION_ACTIVEBI= '@bottomtypes/SET_SWIPERSHOW_RADIOSTATION_ACTIVEBI',
      CHANGE_SWIPERSHOW_RADIOSTATION_ACTIVEBI= '@bottomtypes/CHANGE_SWIPERSHOW_RADIOSTATION_ACTIVEBI', 
      SET_ACTIVEARROW= '@bottomtypes/SET_ACTIVEARROW', 
      CHANGE_ACTIVEARROW= '@bottomtypes/CHANGE_ACTIVEARROW', 
      SET_ALARMCLOCK_STATION='@bottomtypes/SET_ALARMCLOCK_STATION', 
      CHANGE_ALARMCLOCK_STATION='@bottomtypes/CHANGE_ALARMCLOCK_STATION', 
}