import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { BottomType } from '../constants';
import auth from "../../services/api/auth"
import {
    setplayItem,
    setplayItemArtistandSong,
    setPlayingData,
    setActiveIndex,
    setMiniScreenData,
    setSelectedRadioStation,
    setSelectedRadioStationPlaying,
    setSwiperShowStation,
    setSwiperPlayingSong,
    setSwiperActiveBi,
    setActiveArrow,
    setIsConnected
} from "../actions/bottomAction";

import { changePlayingMusic } from "../actions/filterAction"
import player from "../../services/player/PlayerServices"
import { storeData, getData } from "../../utils/local_storage"

function* onGetPlayType({ payload }: any) {
    try {
        yield put(setplayItem(payload))
    } catch (ex) {
        console.log(ex);
    }
}
function* changeselectedSatationbyBi({ payload }: any) {
    try {
        yield put(setSwiperActiveBi(payload.activeBi))
        yield put(setSelectedRadioStation(payload))

        const data = yield auth.getPlayItemType(payload.data.pl)

        let station = payload
        station.playingSong = data.playList[0]

        yield put(setMiniScreenData(station))
        yield put(setSelectedRadioStation(station))

    } catch (ex) {
        console.log(ex);
    }
}
function* addselectedRadioStation({ payload }: any) {

    try {
        player.open()
        yield put(setSelectedRadioStation(payload))
      if(payload.data.pl) {
          const data = yield auth.getPlayItemType(payload.data.pl)
          let station = payload
          station.activeBi=payload.data.st[0]
          station.playingSong = data.playList[0]


          yield put(setSelectedRadioStation(station))
      }
       // console.log( data)


    } catch (ex) {
        yield put(setIsConnected(false))
    }
}
function* changeSelectedRadioStationPlaying({ payload }: any) {
    try {

        yield put(setSelectedRadioStationPlaying(payload))
    } catch (ex) {
        yield put(setIsConnected(true))
    }
}
function* changeSwiperActiveBi({ payload }: any) {
    try {
        yield put(setSelectedRadioStationPlaying(false))
        yield put(setSwiperActiveBi(payload))
    } catch (ex) {
        console.log(ex);
    }
}
function* onGetSongData({ payload }: any) {
    try {
        const res = yield auth.getPlayItemType(payload.data.pl)
     
       yield put(setSwiperPlayingSong(res.playList[0]))
        const autoplay = yield getData("autoPlay")

        if (autoplay) {
            yield put(changePlayingMusic(true))

        }
    } catch (ex) {
        yield put(setIsConnected(payload))
    }
}
function* onChangePlayingData({ payload }: any) {
    try {

        yield put(setPlayingData(payload))
    } catch (ex) {
        console.log(ex);
    }
}
function* onChangeplayItemArtistandSon({ payload }: any) {
    try {
        const data = yield auth.getPlayItemType(payload.pl)

        yield put(setplayItemArtistandSong(data.playList[0]))
    } catch (ex) {
        console.log(ex);
    }
}
function* onchangeActiveIndex({ payload }: any) {
    try {

        yield put(setActiveIndex(payload))
    } catch (ex) {
        console.log(ex);
    }
}
function* changeSwiperShowStation({ payload }: any) {
    try {

        yield put(setSwiperShowStation(payload))
    } catch (ex) {
        console.log(ex);
    }
}
function* changeActiveArrow({ payload }: any) {
    try {

        yield put(setActiveArrow(payload))
    } catch (ex) {
        console.log(ex);
    }
}
function* changeMiniScreenData({ payload }: any) {
    try {

        yield put(setMiniScreenData(payload))
    } catch (ex) {
        console.log(ex);
    }
}function* changeIsconnected({ payload }: any) {
    try {
        yield put(setIsConnected(payload))
    } catch (ex) {
        console.log(ex);
    }
}
export function* watchBottomType() {
    yield takeEvery(
        BottomType.CHANGE_PLAY_ITEM as any,
        onGetPlayType
    )
    yield takeEvery(
        BottomType.CHANGE_PLAYING_DATA as any,
        onChangePlayingData
    )
    yield takeEvery(
        BottomType.CHANGE_PLAY_ITEM_ARTIST_SONG as any,
        onChangeplayItemArtistandSon
    )
    yield takeEvery(
        BottomType.CHANGE_ACTIVE_INDEX as any,
        onchangeActiveIndex
    )
    
    yield takeEvery(
        BottomType.GET_SONG_DATA as any,
        onGetSongData
    )
    yield takeEvery(
        BottomType.CHANGE_SELECTED_RADIOSTATION as any,
        addselectedRadioStation
    )
    yield takeEvery(
        BottomType.CHANGE_SELECTED_RADIOSTATION_PLAYMUSIC as any,
        changeSelectedRadioStationPlaying
    )
    yield takeEvery(
        BottomType.CHANGE_SELECTED_RADIOSTATION_PLAYMUSIC as any,
        changeSelectedRadioStationPlaying
    )
    yield takeEvery(
        BottomType.CHANGE_SWIPERSHOW_RADIOSTATION as any,
        changeSwiperShowStation
    )
    yield takeEvery(
        BottomType.CHANGE_SWIPERSHOW_RADIOSTATION_ACTIVEBI as any,
        changeSwiperActiveBi
    )
    yield takeEvery(
        BottomType.CHANGE_ACTIVEARROW as any,
        changeActiveArrow
    )
    yield takeEvery(
        BottomType.CHANGE_MINI_SCREENDATA as any,
        changeMiniScreenData
    )
    yield takeEvery(
        BottomType.CHANGE_SELECTED_STATION_BY_BI as any,
        changeselectedSatationbyBi
    )
    yield takeEvery(
        BottomType.CHANGE_IS_CONNECTED as any,
        changeIsconnected
    )
}

