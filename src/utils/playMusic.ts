import TrackPlayer from 'react-native-track-player';
export  const _startPlayMusic= async(playUrl:any) =>{
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
    
    await TrackPlayer.reset();
    await TrackPlayer.add({
        id: "local-track",
        url: playUrl,
        title: "Pure (Demo)",
        artist: "David Chavez",
        artwork: "https://i.picsum.photos/id/500/200/200.jpg",
        duration: 28
    });
    await TrackPlayer.play();
}
export const   _pouseMusic=async(isPlayingMusic:boolean)=> {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (isPlayingMusic) {
        console.log("playMusic");
        await TrackPlayer.play();
    } else {
        console.log("_pouseMusic");
        await TrackPlayer.pause();
    }
}