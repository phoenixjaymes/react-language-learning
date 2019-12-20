import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer__wrap">
        <small>{`\u00A9 ${date} PhoenixJaymes`}</small>
      </div>
    </footer>
  );
};

export default Footer;
