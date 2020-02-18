## ToggleNotice component

Example use of ToggleNotice component.

```jsx
<div style={{backgroundColor: '#303030', padding: '20px', width: '100%'}}>
  <ToggleNotice>
    <div role="dialog" aria-live="polite" aria-modal="true" class="ThanksNotice__wrapper">
      <div class="ThanksNotice__innerWrapper">
        <h1 class="screen-reader-text" tabindex="-1">Subscription thank you</h1>
        <p class="ThanksNotice__smallText">You’re enjoying subscriber-only content.</p>
        <p class="ThanksNotice__largeText">Thanks for reading Tech Review, <span>matthew</span></p>
      </div>
    </div>
  </ToggleNotice>
</div>  
```

```jsx
<div style={{backgroundColor: '#303030', padding: '20px', width: '100%'}}>
  <ToggleNotice>
    <div role="dialog" aria-live="polite" aria-modal="true" class="MeterNotice__wrapper">
      <div class="MeterNotice__innerWrapper">
        <h1 class="screen-reader-text" tabindex="-1">Content meter notice</h1>
        <p class="MeterNotice__smallText">You've read <span class="MeterNotice__count">12</span> of <span
            class="MeterNotice__count">12</span></p>
        <p class="MeterNotice__largeText">45</p>
        <ul class="MeterNotice__callsToAction" aria-label="Subscription options">
          <li class="MeterNotice__item"><a href="{{callToActionDestination}}" class="MeterNotice__callToAction--button">535</a></li>
          <li class="MeterNotice__item">Already a subscriber? <a href="/login" class="MeterNotice__callToAction--link">Sign
              in</a>.</li>
        </ul>
      </div>
    </div>
  </ToggleNotice>
</div>  
```
