import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  NavLink,
  withRouter,
} from 'react-router-dom';
import { LearningContext } from '../Context';

import HeaderAdminIcon from './HeaderAdminIcon';

import '../../css/header.css';
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
    const subLangClass = isLangMenuVisible ? 'js-show-menu' : '';
    const arrowLangClass = isLangMenuVisible ? 'arrowUp' : 'arrowDown';
    const subActivityClass = isActivityMenuVisible ? 'js-show-menu' : '';
    const arrowActivityClass = isActivityMenuVisible ? 'arrowUp' : 'arrowDown';

    return (
      <header className="main-header">
        <div className="main-header__wrap">
          <Link to={`/${lang}`}>
            <img className="main-header__logo" src={img} alt="language learning logo" />
          </Link>
          <p className="main-header__name">Language</p>

          <nav className="main-header__nav">
            <ul className="main-menu">
              <li id="js-lang" className="main-menu__item">
                <span className={arrowLangClass}>Language</span>
                <ul className={`sub-menu ${subLangClass}`}>
                  <li className="sub-menu__item" onClick={() => this.handleLanguageClick('de')}><span>{deLabel}</span></li>
                  <li className="sub-menu__item" onClick={() => this.handleLanguageClick('nl')}><span>{nlLabel}</span></li>
                  <li className="sub-menu__item" onClick={() => this.handleLanguageClick('za')}><span>{zaLabel}</span></li>
                </ul>
              </li>

              <li id="js-activity" className="main-menu__item">
                <span className={arrowActivityClass}>Activities</span>
                <ul className={`sub-menu ${subActivityClass}`}>
                  <li className="sub-menu__item"><NavLink to={`/${lang}/cards`}>{cardsLabel}</NavLink></li>
                  <li className="sub-menu__item"><NavLink to={`/${lang}/words`}>{wordsLabel}</NavLink></li>
                  <li className="sub-menu__item"><NavLink to={`/${lang}/sentences`}>{sentencesLabel}</NavLink></li>
                  <li className="sub-menu__item"><NavLink to={`/${lang}/blanks`}>{blanksLabel}</NavLink></li>
                </ul>
              </li>

              <li className="main-menu__item"><NavLink to={`/${lang}/grammar`}>Grammar</NavLink></li>
            </ul>
          </nav>

          <div className="main-header__settings">
            <NavLink to={toPathAdmin} className="main-header__settings-icon" ng-click="adminClick();showSubMenu = false">
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
