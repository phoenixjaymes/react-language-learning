import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { LearningConsumer } from '../Context';

// Components
import Home from './Home';
import Cards from './Cards';
import CardsActivity from './Cards/CardsActivity';
import Sentences from './Sentences';
import SentencesActivity from './Sentences/SentencesActivity';
import Words from './Words';
import WordsActivity from './Words/WordsActivity';
import Blanks from './Blanks';
import BlanksActivity from './Blanks/BlanksActivity';
import Grammar from './Grammar';
import Admin from './Admin';
import NotFound from './NotFound';
import LoginForm from './LoginForm';

const Main = ({ isGrammarMenuShown }) => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:lang" component={Home} />

      <Route path="/:lang/cards/:category/:id?" render={({ match }) => <CardsActivity match={match} />} />
      <Route path="/:lang/cards" render={({ match }) => <Cards match={match} />} />

      <Route path="/:lang/words/:category/:id?" render={({ match }) => <WordsActivity match={match} />} />
      <Route path="/:lang/words" component={Words} />

      <Route path="/:lang/sentences/:category/:id?" render={({ match }) => <SentencesActivity match={match} />} />
      <Route path="/:lang/sentences" component={Sentences} />

      <Route path="/:lang/blanks/:category/:id?" render={({ match }) => <BlanksActivity match={match} />} />
      <Route path="/:lang/blanks" component={Blanks} />

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
        { context => (
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

      <Route component={NotFound} />
    </Switch>
  </main>
);

Main.propTypes = {
  isGrammarMenuShown: PropTypes.bool,
};

export default Main;
