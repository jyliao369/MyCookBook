import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Profile from './pages/Profile';
import Recipespage from './pages/Recipespage';
import CreateRecipe from './pages/CreateRecipe';
import SingleRecipe from './pages/SingleRecipe';
import Test from './pages/Test';

import Header from './components/Header';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          
          <Route exact path="/signup">
            <Signup />
          </Route>
          
          <Route exact path="/myprofile">
            <Profile />
          </Route>
          
          <Route exact path="/add">
            <CreateRecipe />
          </Route>

          <Route exact path="/recipes">
            <Recipespage />
          </Route>

          <Route exact path="/recipes/:recipeId">
            <SingleRecipe />
          </Route>

          <Route exact path='/test'>
            <Test />
          </Route>
          
      </Router>
    </ApolloProvider>
  );
}

export default App;
