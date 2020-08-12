import RNTrackPlayer, { Track } from 'react-native-track-player'

class TrackPlayer {
    /** A wrapper API around RNTrackPlayer
     *
     * This API simplifies using RNTrackPlayer by exposing methods to do common things.
     */
    private static instance: TrackPlayer

    // this allows us to get a current instance, or make an instance of the player
    // and stops us reinitialising the player
    static getInstance() {
        if (!TrackPlayer.instance) {
            TrackPlayer.instance = new TrackPlayer()
            TrackPlayer.instance.init()
            return TrackPlayer.instance
        }

        return TrackPlayer.instance
    }

    private init() {
        // set up the player so we can use it
        RNTrackPlayer.setupPlayer({
            iosCategoryMode: 'spokenAudio'
        })

        // add support for capabilities
        const capabilities = [
            RNTrackPlayer.CAPABILITY_PLAY,
            RNTrackPlayer.CAPABILITY_PAUSE,
            RNTrackPlayer.CAPABILITY_SEEK_TO
        ]

        // list of options for the player
        const options = {
            stopWithApp: true,
            // An array of media controls capabilities
            capabilities,
            // An array of capabilities that will show up when the notification is in the compact form
            compactCapabilities: capabilities
        }

        // update the options
        RNTrackPlayer.updateOptions(options)
    }
}

export default TrackPlayer