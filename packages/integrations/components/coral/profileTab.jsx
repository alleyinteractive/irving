import React from 'react';
import PropTypes from 'prop-types';

const ProfileTab = (props) => {
  const {
    showProfileTab,
  } = props;

  if (!showProfileTab) {
    return null;
  }

  return (
    <div
      id="coral_profile"
    >
      <hr />
      <h3>Account</h3>
      <div className="coral_profile__username">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div className="coral_profile__avatar">
        <label htmlFor="avatar">Avatar</label>
        <input type="text" name="avatar" id="avatar" />
      </div>
    </div>
  );
};

ProfileTab.defaultProps = {
  showProfileTab: false,
};

ProfileTab.propTypes = {
  showProfileTab: PropTypes.bool,
};

export default ProfileTab;
