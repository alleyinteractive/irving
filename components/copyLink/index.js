import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import LinkIcon from 'assets/icons/link.svg';
import styles from './copyLink.css';

const CopyLink = ({ url }) => {
  const [copiedLink, copyLink] = useState(false);
  const wrapperRef = React.createRef();
  const linkRef = React.createRef();
  const handleClick = (e) => {
    e.preventDefault();
    copyLink(true);
    // Copy link to clipboard
    const fakeInput = document.createElement('input');
    // The input needs to be in our component
    // so that the parent component never loses focus entirely.
    if (wrapperRef.current) {
      wrapperRef.current.appendChild(fakeInput);
    }
    fakeInput.value = url;

    // This is needed for desktop Chrome.
    // But we can't run it on iOS or the device will zoom in.
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
      ! window.MSStream;
    if (! isIOS) {
      fakeInput.select();
    }

    // contentEditable is needed for iOS or it won't copy.
    fakeInput.contentEditable = 'true';
    // readOnly is needed for iOS or the keyboard will open up and it will zoom in.
    fakeInput.readOnly = true;

    const range = document.createRange();
    range.selectNodeContents(fakeInput);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    fakeInput.setSelectionRange(0, 999999);

    document.execCommand('copy', false);

    // Change focus back to the link before removing the input,
    // so that the parent component never loses focus entirely.
    if (linkRef.current) {
      linkRef.current.focus();
    }
    fakeInput.remove();
    // Remove link from UI after 5 seconds.
    setTimeout(() => {
      copyLink(false);
    }, 5000);
  };
  return (
    <span className={styles.icon} ref={wrapperRef}>
      <a
        href={url}
        onClick={handleClick}
        ref={linkRef}
        data-event-action="click"
        data-event-label="copy-link"
      >
        {__('Link', 'mittr')}

        <LinkIcon />

        {copiedLink && (
          <span className={styles.linkCopied}>
            {__('Link copied', 'mittr')}
          </span>
        )}
      </a>
    </span>
  );
};

CopyLink.propTypes = {
  url: PropTypes.string.isRequired,
};

export default CopyLink;
