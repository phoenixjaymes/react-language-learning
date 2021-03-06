import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import { LearningContext } from '../Context';

import AdminContent from './AdminContent';
import Search from './Search';

import '../../css/admin.css';
import '../../css/forms.css';

import svgAdd from './add-outline.svg';
import svgUpdate from './edit-pencil.svg';
import svgDelete from './trash.svg';
import svgSearch from './Search/search.svg';
import svgRefresh from './refresh.svg';

const Admin = () => {
  const { isLoggedIn, actions } = useContext(LearningContext);

  const getListItem = (category, heading) => {
    const functions = [
      { type: 'add', img: svgAdd },
      { type: 'update', img: svgUpdate },
      { type: 'delete', img: svgDelete },
    ];

    const links = functions.map((func) => {
      const funcName = func.type.charAt(0).toUpperCase() + func.type.slice(1);
      return (
        <Link key={func.type} to={`/admin/${category}/${func.type}`}>
          <img src={func.img} alt={funcName} />
        </Link>
      );
    });

    return (
      <li className="options-menu__item">
        <h3>{heading}</h3>
        {links}
      </li>
    );
  };

  return (
    <div className="admin">
      <nav>
        <h3>Admin</h3>
        <ul className="options-menu">
          <li className="options-menu__item">
            <h3>Tools</h3>
            <span
              className="faux-btn"
              role="button"
              onClick={() => actions.refreshCategories()}
              onKeyPress={() => actions.refreshCategories()}
              tabIndex="0"
            >
              <img src={svgRefresh} alt="Refresh Categories" />
            </span>
            <Link to="/admin/search">
              <img src={svgSearch} alt="search" />
            </Link>
          </li>

          {getListItem('adjective', 'Adjectives')}
          {getListItem('blank', 'Blanks')}
          {getListItem('category', 'Categories')}
          {getListItem('grammar', 'Grammar')}
          {getListItem('noun', 'Nouns')}
          {getListItem('phrase', 'Phrases')}
          {getListItem('sentence', 'Sentences')}
          {getListItem('verb', 'Verbs')}

          <li className="options-menu__item">
            <h3>
              Verbs
              <span>(perfect)</span>
            </h3>
            <Link to="/admin/perfect/update">
              <img src={svgUpdate} alt="update icon" />
            </Link>
          </li>

          <li className="options-menu__item">
            <h3>
              Verbs
              <span>(imperfect)</span>
            </h3>
            <Link to="/admin/imperfect/update">
              <img src={svgUpdate} alt="update icon" />
            </Link>
          </li>

          <hr />

          <li className="options-menu__item"><Link to="/" onClick={() => actions.setLogin(false)}>Logout</Link></li>
        </ul>
      </nav>

      <section>
        <Route
          path="/admin/search"
          render={({ match }) => (
            !isLoggedIn ? (
              <Redirect to="/" />
            ) : (
                <Search match={match} />
              )
          )}
        />
        <Route
          path="/admin/:category/:modifyType/:updateId?"
          exact
          render={({ match }) => (
            !isLoggedIn ? (
              <Redirect to="/" />
            ) : (
                <AdminContent match={match} />
              )
          )}
        />
      </section>
    </div>
  );
};

export default Admin;
