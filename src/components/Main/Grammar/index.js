import React, { useEffect } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeImage from '../Home/HomeImage';
import withContext from '../../Context';
import Articles from './Articles';
import Pronouns from './Pronouns';
import Conjunctions from './Conjunctions';
import Prepositions from './Prepositions';

import '../../../css/grammar.css';

const Grammar = ({
  context, location, match, isGrammarMenuShown,
}) => {
  const { lang, labels, actions } = context;
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
        <Link to="/grammar/articles">Articles</Link>
        <Link to="/grammar/pronouns">Pronouns</Link>
        <Link to="/grammar/conjunctions">Conjunctions</Link>
        <Link to="/grammar/prepositions">Prepositions</Link>
      </nav>

      <section className="grammar_section">
        {pathname === url && (
          <div>
            <h1 className="home__title">{`${languages[lang]} Grammar`}</h1>
            <HomeImage />
          </div>
        )}

        <Route path="/grammar/articles" component={Articles} />
        <Route path="/grammar/pronouns" component={Pronouns} />
        <Route path="/grammar/conjunctions" component={Conjunctions} />
        <Route path="/grammar/prepositions" component={Prepositions} />
      </section>
    </div>
  );
};

Grammar.propTypes = {
  context: PropTypes.shape(),
  match: PropTypes.shape(),
  location: PropTypes.shape(),
  isGrammarMenuShown: PropTypes.bool,
};

export default withContext(Grammar);
