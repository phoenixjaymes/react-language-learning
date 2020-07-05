import React from 'react';

import HomeImage from './Main/Home/HomeImage';

const NotFound = () => (
  <section className="home">
    <h1 className="home__title">404 Nicht gefunden</h1>
    <p style={{ textAlign: 'center', marginBottom: '20px' }}>
      Es tut uns leid.
      <br />
      Wir können Ihre Seite nicht finden.
    </p>
    <HomeImage />
  </section>
);

export default NotFound;
