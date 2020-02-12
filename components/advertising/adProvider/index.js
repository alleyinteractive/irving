import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DFPSlotsProvider, DFPManager } from 'react-dfp';

const AdProvider = (props) => {
  const {
    children,
    dfpNetworkId,
    viewportWidths,
    targeting,
  } = props;

  if (! dfpNetworkId) {
    return children;
  }

  const refresh = () => DFPManager.refresh();

  useEffect(() => {
    const queries = viewportWidths.map(
      // Create MediaQueryList for width value of sizeMapping.
      (width) => window.matchMedia(`(min-width: ${width}px)`)
    );

    // Add listener for refreshing ad.
    queries.map((query) => query.addListener(refresh));

    // Remove listeners on unmount.
    return () => queries.map((query) => query.removeListener(refresh));
  }, []);

  return (
    <DFPSlotsProvider
      collapseEmptyDivs
      dfpNetworkId={dfpNetworkId}
      targetingArguments={targeting}
    >
      {children}
    </DFPSlotsProvider>
  );
};

AdProvider.propTypes = {
  children: PropTypes.node.isRequired,
  dfpNetworkId: PropTypes.string.isRequired,
  targeting: PropTypes.object.isRequired,
  viewportWidths: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default AdProvider;
