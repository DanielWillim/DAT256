// Import FirebaseAuth and firebase.
import React, { Component, createContext } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import instance from './firebase';

const auth = instance.auth();

const loading = Symbol('loading');
const notAuthenticated = Symbol('not authenticated');

export const AuthContext = createContext(notAuthenticated);
export const AuthConsumer = AuthContext.Consumer;

export default class Auth extends Component {
  state = {
    user: loading,
  }

  componentDidMount() {
    this.removeAuthListener = this.authListener();
  }

  componentWillUnmount() {
    if (this.removeAuthListener) this.removeAuthListener();
  }

  signOut = async () => {
    await auth.signOut();
    // this.setState({ user: notAuthenticated });
  }

  authListener = () => auth.onAuthStateChanged(user => this.setState({
    user: user
      ? { ...user, signOut: this.signOut }
      : notAuthenticated,
  }));

  render() {
    const { user } = this.state;
    const { children } = this.props;

    switch (user) {
      case loading:
        return <LinearProgress color="secondary" variant="query" />;
      case notAuthenticated:
        return (
          <StyledFirebaseAuth
            firebaseAuth={auth}
            uiConfig={{
              // Popup signin flow rather than redirect flow.
              signInFlow: 'popup',
              signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
              ],
              callbacks: {
                signInSuccessWithAuthResult: authResult => this.setState({
                  user: authResult,
                }),
              },
            }}
          />
        );
      default:
        return (
          <AuthContext.Provider value={user}>
            {children}
          </AuthContext.Provider>
        );
    }
  }
}
