import React, { useEffect, useContext } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import HomeImage from '../Home/HomeImage';
import Articles from './Articles';
import Pronouns from './Pronouns';
import Conjunctions from './Conjunctions';
import Prepositions from './Prepositions';

import '../../../css/grammar.css';

const Grammar = ({
  location, match, isGrammarMenuShown,
}) => {
  const { lang, labels, actions } = useContext(LearningContext);
  const { setDocumentTitle } = actions;
  const { pathname } = location;
  const { url } = match;
  const { languages } = labels.us;
  const menuClass = isGrammarMenuShown === true ? 'show' : '';
  const btnShowContent = isGrammarMenuShown === true ? '\u25C0' : '\u25B6';

  useEffect(() => setDocumentTitle('Grammar'));

  return (
    <div className="grammar">
      <nav className={`grammar__nav ${menuClass}`}>
        <h3 id="js-grammar" className="grammar__nav-btn"><span>{btnShowContent}</span></h3>
        <div className="grammar__nav-div">
          <Link to="/grammar-old/articles">Articles</Link>
          <Link to="/grammar-old/pronouns">Pronouns</Link>
          <Link to="/grammar-old/conjunctions">Conjunctions</Link>
          <Link to="/grammar-old/prepositions">Prepositions</Link>
        </div>
      </nav>

      <section className="grammar_section">
        {pathname === url && (
          <div>
            <h1 className="home__title">{`${languages[lang]} Grammar`}</h1>
            <HomeImage />
          </div>
        )}

        <Route path="/grammar-old/articles" component={Articles} />
        <Route path="/grammar-old/pronouns" component={Pronouns} />
        <Route path="/grammar-old/conjunctions" component={Conjunctions} />
        <Route path="/grammar-old/prepositions" component={Prepositions} />
      </section>
    </div>
  );
};

Grammar.propTypes = {
  match: PropTypes.shape(),
  location: PropTypes.shape(),
  isGrammarMenuShown: PropTypes.bool,
};

export default Grammar;
