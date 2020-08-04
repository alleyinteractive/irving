import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const Pico = (props) => {
  const {
    // context,
    pageInfo,
    // publisherId,
  } = props;

  // console.log(pageInfo, publisherId);

  pageInfo.url = window.location.href;

  const [picoUser, setPicoUser] = useState(
    get(window, 'Pico.user', { email: 'Loading...' })
  );

  const listenForPicoLoaded = () => {
    console.log('Pico has loaded the user:', window.Pico);
    console.log('Fire a view for ', pageInfo);
    setPicoUser(window.Pico.user);
  };

  useEffect(() => {
    console.log('adding listeners');
    window.document.addEventListener('pico.loaded', listenForPicoLoaded);
    window.document.addEventListener('pico.loaded', () => console.log('WHAT'));
    // window.pico('visit', {});
    console.log(window.pico);
  }, []);

  console.log('Firing visit: ', pageInfo);

  if (window.pico) {
    window.pico('visit', pageInfo);
  }

  useEffect(() => {
    window.document.addEventListener('pico-init', () => {
      console.log('HEY! Pico has been initalized');
    });

    window.addEventListener('pico.loaded', () => {
      console.log('HEY! Pico has been loaded');
    });
  }, []);

  return (
    <>
      <button
        type="button"
        className="PicoSignal PicoPlan"
        data-pico-email
        data-pico-first-name
        data-pico-status
        data-pico-tier
      >
        {picoUser.email}
      </button>
    </>
  );
};

Pico.defaultProps = {
  pageInfo: {},
};

Pico.propTypes = {
  // context: PropTypes.string.isRequired,
  pageInfo: PropTypes.object,
  // publisherId: PropTypes.string.isRequired,
};

export default Pico;
