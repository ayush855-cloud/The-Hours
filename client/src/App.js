import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import { Provider } from 'react-redux';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './main.scss';
import Navbar from './components/Navbar';
import Store from './store';
import Dashboard from './components/Dashboard';
import PrivateRoute from './private/PrivateRoute';
import RouteLinks from './private/RouteLinks';
import NotFound from './components/NotFound';
import Create from './components/Create';
import Edit from './components/Edit';
import Details from './components/Details';
import EditImage from './components/EditImage';
import UpdateName from './components/UpdateName';
import ChangePassword from './components/ChangePassword';
// import Store from './store/index';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="app">
          <Navbar />

          <Switch>

            <Route path="/" exact >
              <Home/>
            </Route>
            <Route exact path='/home/:page'>
            <Home/>
            </Route>
            <RouteLinks exact path="/register">
              <Register />
            </RouteLinks>
            <Route path='/details/:id' exact>
              <Details />
            </Route>
            <RouteLinks exact path="/login">
              <Login />
            </RouteLinks>
            <PrivateRoute exact path="/dashboard/:page?">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute exact path="/create">
              <Create/>
            </PrivateRoute>
            <PrivateRoute exact path="/edit/:id">
              <Edit/>
            </PrivateRoute>
            <PrivateRoute exact path="/updateImage/:id">
              <EditImage/>
            </PrivateRoute>
            <PrivateRoute exact path="/updateName">
              <UpdateName/>
            </PrivateRoute>
            <PrivateRoute exact path="/updatePassword">
                <ChangePassword/>
            </PrivateRoute>
            <Route >
              <NotFound />
            </Route>


          </Switch>
          
        </div>
      </Router>
    </Provider>
  );
}

export default App;
