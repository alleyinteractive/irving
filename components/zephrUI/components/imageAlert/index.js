import React from 'react';

import './imageAlert.css';

export default class ImageAlert extends React.PureComponent {
  render() {
    return (
      <div className="imageAlert__bg">
        <div className="imageAlert__wrapper">
          <div className="imageAlert__fields">
            <h2 className="imageAlert__slug">
              This story is only available to subscribers.
            </h2>
            <h3 className="imageAlert__message">
              Stay informed and ahead of the curve
              — when you want it, where you want it.
            </h3>
            <a
              href="/subscribe"
              className="imageAlert__btn imageAlert__btn--subscribe"
            >
              See my options
            </a>
            <a
              href="/signin"
              className="imageAlert__btn imageAlert__btn--signin"
            >
              Sign In
            </a>
          </div>
          <div className="imageAlert__image">
            <img src="https://placeimg.com/640/480/any" alt="magazine cover" />
          </div>
        </div>
      </div>
    );
  }
}
