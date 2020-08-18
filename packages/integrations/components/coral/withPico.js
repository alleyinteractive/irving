import React from 'react';
import CoralEmbed from './index';

function withPico(ChildComponent) {
  const handlers = (events) => {
    events.on('loginPrompt', () => {
      const {
        location,
      } = window;

      location.assign('?pn=manage_account');
    });
  };

  class WithHandlers extends React.Component {
    render() {
      return <ChildComponent {...this.props} events={handlers} />;
    }
  }

  return WithHandlers;
}

export default withPico(CoralEmbed);
