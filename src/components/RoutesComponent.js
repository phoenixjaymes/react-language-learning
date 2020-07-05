import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { LearningConsumer } from './Context';

// Components
import Home from './Main/Home';
import Cards from './Main/Cards';
import CardsActivity from './Main/Cards/CardsActivity';
import Sentences from './Main/Sentences';
import SentencesActivity from './Main/Sentences/SentencesActivity';
import Words from './Main/Words';
import WordsActivity from './Main/Words/WordsActivity';
import Blanks from './Main/Blanks';
import BlanksActivity from './Main/Blanks/BlanksActivity';
import Grammar from './Main/Grammar';
import Admin from './Admin';
import NotFound from './NotFound';
import LoginForm from './Admin/LoginForm';

const Main = ({ isGrammarMenuShown }) => (
  <main>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/:lang">
        <Home />
      </Route>

      <Route path="/:lang/cards/:category/:id?" render={({ match }) => <CardsActivity match={match} />} />
      <Route path="/:lang/cards" render={({ match }) => <Cards match={match} />} />

      <Route path="/:lang/words/:category/:id?" render={({ match }) => <WordsActivity match={match} />} />
      <Route path="/:lang/words">
        <Words />
      </Route>

      <Route path="/:lang/sentences/:category/:id?" render={({ match }) => <SentencesActivity match={match} />} />
      <Route path="/:lang/sentences">
        <Sentences />
      </Route>

      <Route path="/:lang/blanks/:category/:id?" render={({ match }) => <BlanksActivity match={match} />} />
      <Route path="/:lang/blanks">
        <Blanks />
      </Route>

      <Route
        path="/:lang/grammar"
        render={({ match, location }) => (
          <Grammar
            isGrammarMenuShown={isGrammarMenuShown}
            match={match}
            location={location}
          />
        )}
      />

      <Route path="/:lang/login" render={() => <LoginForm />} />
      <LearningConsumer>
        {context => (
          <Route
            path="/:lang/admin"
            render={() => (
              !context.isLoggedIn ? (
                <Redirect to="/de" />
              ) : (
                  <Admin />
                )
            )}
          />
        )}
      </LearningConsumer>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  </main>
);

Main.propTypes = {
  isGrammarMenuShown: PropTypes.bool,
};

export default Main;
