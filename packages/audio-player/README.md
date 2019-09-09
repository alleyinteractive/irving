## Irving Audio Player
Persistent audio player for use with Irving.

### Components
* `<AudioElement >` - HTML `<audio>` tag and relevant hooks for controlling it via redux state. Note that beyond the `<PlayPauseButton />` component (below) this package does not provide a UI for controlling audio.
* `<PlayPauseButton />` = Component for loading, playing, and pausing an audio file. The state of this button will be synced with the state of the `<AudioElement />` via redux.
