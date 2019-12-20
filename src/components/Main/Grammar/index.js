import React, { useEffect } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeImage from '../HomeImage';
import withContext from '../../Context';
import Articles from './Articles';
import Pronouns from './Prounouns';

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
        <h3 id="js-grammar" className="grammar__nav-btn" ><span>{btnShowContent}</span></h3>
        <Link to={`/${lang}/grammar/articles`}>Articles</Link>
        <Link to={`/${lang}/grammar/pronouns`}>Pronouns</Link>
      </nav>

      <section className="grammar_section">
        { pathname === url && (
          <div>
            <h1 className="home__title">{`${languages[lang]} Grammar`}</h1>
            <HomeImage />
          </div>
        )}

        <Route path="/:lang/grammar/articles" component={Articles} />
        <Route path="/:lang/grammar/pronouns" component={Pronouns} />
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
