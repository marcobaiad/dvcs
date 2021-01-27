import React from 'react';
import { Route, Switch } from 'react-router-dom';

//componentes
import Navbar from './components/Navbar';
import Login from './components/Login'
import Panel from './components/Panel';
import SellerPage from './pages/SellerPage';

function App() {
  return (
    <>
      <div className="d-none">
        <a href="/"></a>
        <a href="/panel"></a>
        <a href="/seller"></a>
      </div>
      <Route component={Navbar} />
      <Switch>
        <Route path="/panel" exact={true} component={Panel} />
        <Route exact path="/seller" component={SellerPage} />
        <Route path="/" exact={true} component={Login} />
      </Switch>
    </>
  );
}

export default App;
