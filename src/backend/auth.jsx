// Import FirebaseAuth and firebase.
import React, { Component, createContext } from 'react';

import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import instance from './firebase';
import { isGuest } from './user';
import PickName from 'PickName';

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

  authListener = () => auth.onAuthStateChanged((user) => {
    if (!user) {
      this.setState({ user: notAuthenticated });
    } else {
      this.setState({
        user: {
          ...user,
          signOut: this.signOut,
          hasName: !isGuest(user),
        },
      });
    }
  });

  render() {
    const { user } = this.state;
    const { children, classes } = this.props;
    const { lowered } = classes;

    switch (user) {
      case loading:
        return <LinearProgress color="secondary" variant="query" />;
      case notAuthenticated:
        return (
          <React.Fragment>
            <CardContent>
              <Typography variant="h6" className={lowered}>
                Välj inloggningsmetod:
              </Typography>
            </CardContent>
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
          </React.Fragment>
        );
      default:
        if (user.hasName) {
          return (
            <AuthContext.Provider value={user}>
              {children}
            </AuthContext.Provider>
          );
        }
        return (
          <PickName
            classes={classes}
            onName={displayName => this.setState({
              user: {
                ...user,
                displayName,
                hasName: true,
              },
            })}
          />
        );
    }
  }
}
