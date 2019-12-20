import React from 'react';
import PropTypes from 'prop-types';

import face from './happy-boy.svg';
import gear from './gear.svg';

const HeaderSettingsIcon = ({ loggedIn }) => {
  if (loggedIn) {
    return <img src={face} alt="Boys Face" />;
  }

  return <img src={gear} alt="Gear" />;
};

HeaderSettingsIcon.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default HeaderSettingsIcon;
