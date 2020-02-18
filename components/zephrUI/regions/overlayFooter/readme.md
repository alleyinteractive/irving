## OverlayFooter component

Example use of OverlayFooter component. This documentation will be updated to include details on the UI component styles that are defined in the Zephr admin.

```jsx
const { Provider } = require('react-redux');
const { createStore } = require('redux');
const initialState = {
  zephrComponents : {
    components : {
      "overlayFooter": {
        "label": "Overlay Footer",
        "zephrOutput": {
          "__typename": "ZephrUiComponentHtml",
          "data": "<div role=\"dialog\" aria-live=\"polite\" aria-modal=\"true\" class=\"MeterNotice__wrapper\">\n  <div class=\"MeterNotice__innerWrapper\">\n    <h1 class=\"screen-reader-text\" tabindex=\"-1\">Content meter notice</h1>\n    <p class=\"MeterNotice__smallText\">You've read <span class=\"MeterNotice__count\">1.0</span> of <span\n        class=\"MeterNotice__count\">3</span></p>\n    <p class=\"MeterNotice__largeText\">You know good tech journalism when you see it. Subscribe for unlimited access.</p>\n    <ul class=\"MeterNotice__callsToAction\" aria-label=\"Subscription options\">\n      <li class=\"MeterNotice__item\"><a href=\"http://technologyreview.com/subscribe\" class=\"MeterNotice__callToAction--button\">Subscribe Now</a></li>\n      <li class=\"MeterNotice__item\">Already a subscriber? <a href=\"/login\" class=\"MeterNotice__callToAction--link\">Sign\n          in</a>.</li>\n    </ul>\n  </div>\n</div>"
        }
      },
      "downloadPDFLink": {
        "label": "Download PDF Link",
        "zephrOutput": "hello there"
      }
    },
  }  
}
const store = createStore( (state)=> state, {initialState })
const wrapper = shallow(<OverlayFooter />, { context: { store },});
```
