import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import './App.module.css';

import { BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import OtherUser from './containers/OtherUser/OtherUser';
import Chat from './containers/Chat/Chat';
import Notifications from './containers/MobileViewNotifications/MobileViewNotifications';
import AuthLoader from './shared/LoadingAuth';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (<Switch>
                    <Route path="/auth" exact component={Auth} />
                    <Redirect to="/auth" exact/>
                  </Switch>)

    if(this.props.authLoader) {
      routes = (<Route path="/loading" exact component={AuthLoader} />)
    }

    if(this.props.isAuthenticated) {
      routes = (<Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/logout" exact component={Logout} />
                  <Route path="/chat" exact component={Chat} />
                  <Route path='/me/posts' exact component={Home} />
                  <Route path='/me/comments' exact component={Home} />
                  <Route path='/me/likes' exact component={Home} />
                  <Route path='/me/follows' exact component={Home} />
                  <Route path='/me/notifications' exact component={Notifications} />
                  <Route path='/chat/:id' exact component={Chat} />
                  <Route path='/posts/:id' exact component={Home} />
                  <Route path='/users/:id' exact component={OtherUser} />
                  <Route path='/users/:id/comments' exact component={OtherUser} />
                  <Route path='/users/:id/likes' exact component={OtherUser} />
                  <Route path='/users/:id/follows' exact component={OtherUser} />
                  <Redirect to="/" exact/>
                </Switch>)
    }

    return (
      <BrowserRouter>
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    authLoader: state.auth.authLoader
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));;
