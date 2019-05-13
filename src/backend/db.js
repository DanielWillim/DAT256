import firebase from './firebase';

export const db = firebase.database();

const getUserDataGeneral = kind => async (uid) => {
  const endpoint = db.ref(`userdata/${uid}/${kind}`);

  const entry = await endpoint.once('value');

  return entry.val();
};

export const getPublicUserData = getUserDataGeneral('public');
export const getPrivateUserData = getUserDataGeneral('private');
