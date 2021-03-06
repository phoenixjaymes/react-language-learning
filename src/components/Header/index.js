import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import { LearningContext } from '../Context';

import HeaderAdminIcon from './HeaderAdminIcon';

import styles from './header.module.css';
import imgDe from '../home-img-de.svg';
import imgNl from '../home-img-nl.svg';

const Header = ({ isLangMenuVisible, isActivityMenuVisible }) => {
  const {
    lang, isLoggedIn, labels, actions,
  } = useContext(LearningContext);
  const { setLanguage } = actions;

  const deLabel = labels[lang].languages.de;
  const nlLabel = labels[lang].languages.nl;
  const afLabel = labels[lang].languages.af;

  const cardsLabel = labels[lang].activities.cards;
  const wordsLabel = labels[lang].activities.words;
  const sentencesLabel = labels[lang].activities.sentences;
  const blanksLabel = labels[lang].activities.blanks;
  const grammarLabel = labels[lang].activities.grammar;

  const toPathAdmin = (isLoggedIn) ? '/admin' : '/login';
  const img = lang === 'de' ? imgDe : imgNl;
  const subLangClass = isLangMenuVisible ? styles.jsShowMenu : '';
  const arrowLangClass = isLangMenuVisible ? styles.arrowUp : styles.arrowDown;
  const subActivityClass = isActivityMenuVisible ? styles.jsShowMenu : '';
  const arrowActivityClass = isActivityMenuVisible ? styles.arrowUp : styles.arrowDown;

  return (
    <header className={styles.mainHeader}>
      <div className={`${styles.mainHeaderWrap} contentWrap`}>
        <Link to="/">
          <img className={styles.mainHeaderLogo} src={img} alt="language learning logo" />
        </Link>
        <p className={styles.mainHeaderName}>Language</p>

        <nav className={styles.mainHeaderNav}>
          <ul className={styles.mainMenu}>
            <li id="js-lang" className={styles.mainMenuItem}>
              <span className={arrowLangClass}>Language</span>
              <ul className={`${styles.subMenu} ${subLangClass}`}>
                <li className={styles.subMenuItem}>
                  <button
                    className={styles.subMenuItemButton}
                    type="button"
                    onClick={() => setLanguage('de')}
                  >
                    {deLabel}
                  </button>
                </li>
                <li className={styles.subMenuItem}>
                  <button
                    className={styles.subMenuItemButton}
                    type="button"
                    onClick={() => setLanguage('nl')}
                  >
                    {nlLabel}
                  </button>
                </li>
                <li className={styles.subMenuItem}>
                  <button
                    className={styles.subMenuItemButton}
                    type="button"
                    onClick={() => setLanguage('af')}
                  >
                    {afLabel}
                  </button>
                </li>
              </ul>
            </li>

            <li id="js-activity" className={styles.mainMenuItem}>
              <span className={arrowActivityClass}>Activities</span>
              <ul className={`${styles.subMenu} ${subActivityClass}`}>
                <li className={styles.subMenuItem}><NavLink to="/cards">{cardsLabel}</NavLink></li>
                <li className={styles.subMenuItem}><NavLink to="/words">{wordsLabel}</NavLink></li>
                <li className={styles.subMenuItem}><NavLink to="/sentences">{sentencesLabel}</NavLink></li>
                <li className={styles.subMenuItem}><NavLink to="/blanks">{blanksLabel}</NavLink></li>
                <li className={styles.subMenuItem}><NavLink to="/grammar">{grammarLabel}</NavLink></li>
              </ul>
            </li>

            <li className={styles.mainMenuItem}><NavLink to="/grammar-old">Grammar</NavLink></li>
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
};

Header.propTypes = {
  isLangMenuVisible: PropTypes.bool,
  isActivityMenuVisible: PropTypes.bool,
};

export default Header;
