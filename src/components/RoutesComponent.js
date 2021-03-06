import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { LearningContext } from './Context';

// Components
import Home from './Main/Home';
import Cards from './Main/Cards';
import CardActivity from './Main/Cards/CardActivity';
import Sentences from './Main/Sentences';
import SentencesActivity from './Main/Sentences/SentencesActivity';
import Words from './Main/Words';
import WordsActivity from './Main/Words/WordsActivity';
import Blanks from './Main/Blanks';
import BlanksActivity from './Main/Blanks/BlanksActivity';
import Grammar from './Main/Grammar';
import GrammarActivity from './Main/Grammar/GrammarActivity';
import GrammarOld from './Main/GrammarOld';
import Admin from './Admin';
import NotFound from './NotFound';
import LoginForm from './Admin/LoginForm';

const RoutesComponent = ({ isGrammarMenuShown }) => {
  const { isLoggedIn } = useContext(LearningContext);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/cards/:category/:id?" render={({ match }) => <CardActivity match={match} />} />
        <Route path="/cards" render={({ match }) => <Cards match={match} />} />

        <Route path="/words/:category/:id?" render={({ match }) => <WordsActivity match={match} />} />
        <Route path="/words">
          <Words />
        </Route>

        <Route path="/sentences/:category/:id?" render={({ match }) => <SentencesActivity match={match} />} />
        <Route path="/sentences">
          <Sentences />
        </Route>

        <Route path="/blanks/:category/:id?" render={({ match }) => <BlanksActivity match={match} />} />
        <Route path="/blanks">
          <Blanks />
        </Route>

        <Route path="/grammar/:id" render={({ match }) => <GrammarActivity match={match} />} />
        <Route path="/grammar" render={({ match }) => <Grammar match={match} />} />

        <Route
          path="/grammar-old"
          render={({ match, location }) => (
            <GrammarOld
              match={match}
              location={location}
              isGrammarMenuShown={isGrammarMenuShown}
            />
          )}
        />

        <Route path="/login">
          <LoginForm />
        </Route>

        <Route
          path="/admin"
          render={() => (!isLoggedIn ? <Redirect to="/" /> : <Admin />)}
        />

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
};

RoutesComponent.propTypes = {
  isGrammarMenuShown: PropTypes.bool,
};

export default RoutesComponent;
