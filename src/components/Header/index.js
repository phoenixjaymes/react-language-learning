import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  NavLink,
  withRouter,
} from 'react-router-dom';
import { LearningContext } from '../Context';

import HeaderAdminIcon from './HeaderAdminIcon';

import styles from './header.module.css';
import imgDe from '../home-img-de.svg';
import imgNl from '../home-img-nl.svg';

class Header extends Component {
  handleLanguageClick = (lang) => {
    const { actions } = this.context;
    const { location, history } = this.props;
    actions.setLanguage(lang);

    const currentPath = location.pathname;
    const currentLang = currentPath.substr(1, 2);

    if (currentLang !== lang) {
      const newPath = currentPath.replace(currentLang, lang);
      history.push(newPath);
    }
  };

  render() {
    const { lang, isLoggedIn, labels } = this.context;
    const { isLangMenuVisible, isActivityMenuVisible } = this.props;

    const deLabel = labels[lang].languages.de;
    const nlLabel = labels[lang].languages.nl;
    const zaLabel = labels[lang].languages.za;

    const cardsLabel = labels[lang].activities.cards;
    const wordsLabel = labels[lang].activities.words;
    const sentencesLabel = labels[lang].activities.sentences;
    const blanksLabel = labels[lang].activities.blanks;

    const toPathAdmin = (isLoggedIn) ? `/${lang}/admin` : `/${lang}/login`;
    const img = lang === 'de' ? imgDe : imgNl;
    const subLangClass = isLangMenuVisible ? styles.jsShowMenu : '';
    const arrowLangClass = isLangMenuVisible ? styles.arrowUp : styles.arrowDown;
    const subActivityClass = isActivityMenuVisible ? styles.jsShowMenu : '';
    const arrowActivityClass = isActivityMenuVisible ? styles.arrowUp : styles.arrowDown;

    return (
      <header className={styles.mainHeader}>
        <div className={`${styles.mainHeaderWrap} contentWrap`}>
          <Link to={`/${lang}`}>
            <img className={styles.mainHeaderLogo} src={img} alt="language learning logo" />
          </Link>
          <p className={styles.mainHeaderName}>Language</p>

          <nav className={styles.mainHeaderNav}>
            <ul className={styles.mainMenu}>
              <li id="js-lang" className={styles.mainMenuItem}>
                <span className={arrowLangClass}>Language</span>
                <ul className={`${styles.subMenu} ${subLangClass}`}>
                  <li className={styles.subMenuItem} onClick={() => this.handleLanguageClick('de')}><span>{deLabel}</span></li>
                  <li className={styles.subMenuItem} onClick={() => this.handleLanguageClick('nl')}><span>{nlLabel}</span></li>
                  <li className={styles.subMenuItem} onClick={() => this.handleLanguageClick('za')}><span>{zaLabel}</span></li>
                </ul>
              </li>

              <li id="js-activity" className={styles.mainMenuItem}>
                <span className={arrowActivityClass}>Activities</span>
                <ul className={`${styles.subMenu} ${subActivityClass}`}>
                  <li className={styles.subMenuItem}><NavLink to={`/${lang}/cards`}>{cardsLabel}</NavLink></li>
                  <li className={styles.subMenuItem}><NavLink to={`/${lang}/words`}>{wordsLabel}</NavLink></li>
                  <li className={styles.subMenuItem}><NavLink to={`/${lang}/sentences`}>{sentencesLabel}</NavLink></li>
                  <li className={styles.subMenuItem}><NavLink to={`/${lang}/blanks`}>{blanksLabel}</NavLink></li>
                </ul>
              </li>

              <li className={styles.mainMenuItem}><NavLink to={`/${lang}/grammar`}>Grammar</NavLink></li>
            </ul>
          </nav>

          <div className={styles.mainHeaderSettings}>
            <NavLink to={toPathAdmin} className={styles.mainHeaderSettingsIcon}>
              <HeaderAdminIcon loggedIn={isLoggedIn} />
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

Header.contextType = LearningContext;

Header.propTypes = {
  isLangMenuVisible: PropTypes.bool,
  isActivityMenuVisible: PropTypes.bool,
  isGrammarMenuVisible: PropTypes.bool,
  location: PropTypes.shape(),
  history: PropTypes.shape(),
};

export default withRouter(Header);
