Helper component for triggering play/pause actions for the global AudioElement. In order to function properly this component must be provided with a `src` prop. This prop will be used to check against the `src` attributed currently loaded into the global AudioElement and use that check to determine which icon to display (play or pause).

```
    <PlayPauseButton
        src="http://ym2149.oth4.com/series/01/mp3/Scavenger_-_Leif_Rular_PYM.mp3"
    />
```