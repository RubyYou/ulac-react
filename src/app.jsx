import React from 'react';
import Product from './product';
import Home from './home';
import NotFound from './home';
import { Router, Route, Link } from 'react-router';

// [RU] not used

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>

), document.body);