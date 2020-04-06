import zephrExtractScope from './zephrExtractScope';

// eslint-disable-next-line max-len
const markupWithDataScope = '<div role="dialog" aria-live="polite" aria-modal="true" class="MeterNotice__wrapper" data-scope=\'{ "meterChangedThisRequest": false }\'> <div class="MeterNotice__innerWrapper"> <h1 class="screen-reader-text" tabindex="-1">Content meter notice</h1> <p class="MeterNotice__smallText">You\'ve read <span class="MeterNotice__count">3</span> of <span class="MeterNotice__count">3</span></p> <p class="MeterNotice__largeText">You know good tech journalism when you see it. Subscribe for unlimited access.</p> <ul class="MeterNotice__callsToAction" aria-label="Subscription options"> <li class="MeterNotice__item"><a href="http://technologyreview.com/subscribe" class="MeterNotice__callToAction--button">Subscribe Now</a></li> <li class="MeterNotice__item"><span class="MeterNotice__leadIn">Already a subscriber? </span><a href="/login" class="MeterNotice__callToAction--link">Sign in</a></li> </ul> </div> </div>';

// eslint-disable-next-line max-len
const markupWithNoDataScope = '<div role="dialog" aria-live="polite" aria-modal="true" class="MeterNotice__wrapper"> <div class="MeterNotice__innerWrapper"> <h1 class="screen-reader-text" tabindex="-1">Content meter notice</h1> <p class="MeterNotice__smallText">You\'ve read <span class="MeterNotice__count">3</span> of <span class="MeterNotice__count">3</span></p> <p class="MeterNotice__largeText">You know good tech journalism when you see it. Subscribe for unlimited access.</p> <ul class="MeterNotice__callsToAction" aria-label="Subscription options"> <li class="MeterNotice__item"><a href="http://technologyreview.com/subscribe" class="MeterNotice__callToAction--button">Subscribe Now</a></li> <li class="MeterNotice__item"><span class="MeterNotice__leadIn">Already a subscriber? </span><a href="/login" class="MeterNotice__callToAction--link">Sign in</a></li> </ul> </div> </div>';

// eslint-disable-next-line max-len
const markupWithInvalidJSON = '<div role="dialog" aria-live="polite" aria-modal="true" class="MeterNotice__wrapper" data-scope=\'{ "meterChangedThisRequest": false, }\'> <div class="MeterNotice__innerWrapper"> <h1 class="screen-reader-text" tabindex="-1">Content meter notice</h1> <p class="MeterNotice__smallText">You\'ve read <span class="MeterNotice__count">3</span> of <span class="MeterNotice__count">3</span></p> <p class="MeterNotice__largeText">You know good tech journalism when you see it. Subscribe for unlimited access.</p> <ul class="MeterNotice__callsToAction" aria-label="Subscription options"> <li class="MeterNotice__item"><a href="http://technologyreview.com/subscribe" class="MeterNotice__callToAction--button">Subscribe Now</a></li> <li class="MeterNotice__item"><span class="MeterNotice__leadIn">Already a subscriber? </span><a href="/login" class="MeterNotice__callToAction--link">Sign in</a></li> </ul> </div> </div>';

// eslint-disable-next-line max-len
const markupWithEmptyScope = '<div role="dialog" aria-live="polite" aria-modal="true" class="MeterNotice__wrapper" data-scope=""> <div class="MeterNotice__innerWrapper"> <h1 class="screen-reader-text" tabindex="-1">Content meter notice</h1> <p class="MeterNotice__smallText">You\'ve read <span class="MeterNotice__count">3</span> of <span class="MeterNotice__count">3</span></p> <p class="MeterNotice__largeText">You know good tech journalism when you see it. Subscribe for unlimited access.</p> <ul class="MeterNotice__callsToAction" aria-label="Subscription options"> <li class="MeterNotice__item"><a href="http://technologyreview.com/subscribe" class="MeterNotice__callToAction--button">Subscribe Now</a></li> <li class="MeterNotice__item"><span class="MeterNotice__leadIn">Already a subscriber? </span><a href="/login" class="MeterNotice__callToAction--link">Sign in</a></li> </ul> </div> </div>';

const notAValidHTMLString = 'hello world';

it('should find the property that the meter has changed.', () => {
  expect(zephrExtractScope(markupWithDataScope)).toEqual({
    meterChangedThisRequest: false,
  });
});

it('should return an empty object when there is no attribute.', () => {
  expect(zephrExtractScope(markupWithNoDataScope)).toEqual({});
});

it('should return object with an error when the JSON is invalid.', () => {
  expect(zephrExtractScope(markupWithInvalidJSON)).toEqual({
    error: 'There was an error parsing the JSON',
  });
});

it('should return an empty object when the scope attribute is empty.', () => {
  expect(zephrExtractScope(markupWithEmptyScope)).toEqual({});
});

it('should return an empty object if not passed a valid HTML string.', () => {
  expect(zephrExtractScope(notAValidHTMLString)).toEqual({});
});
