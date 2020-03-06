import React from 'react';

import HomeImage from './HomeImage';
import HomePhrase from './HomePhrase';

const Home = () => (
  <section className="home">
    <h1 className="home__title">Language Learning</h1>
    <HomeImage />
    <HomePhrase />
  </section>
);

export default Home;
