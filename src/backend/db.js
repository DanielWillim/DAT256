import firebase from './firebase';

export const db = firebase.database();

const getEndpointValue = async (endpoint) => {
  const result = await db.ref(endpoint).once('value');
  return result.val();
};
const updateEndpointValue = (endpoint, val) => db.ref(endpoint).update(val);

const uidGetter = namer => uid => getEndpointValue(namer(uid));
const uidUpdater = namer => (uid, val) => updateEndpointValue(namer(uid), val);

const userDataName = kind => uid => `userdata/${uid}/${kind}`;

export const getPublicUserData = uidGetter(userDataName('public'));
export const updatePublicUserData = uidUpdater(userDataName('public'));

export const getPrivateUserData = uidGetter(userDataName('private'));
export const updatePrivateUserData = uidUpdater(userDataName('private'));

export const getScore = uidGetter(uid => `scores/${uid}`);
export const setScore = async (uid, newScore, name = null) => {
  const { score = 0 } = await getScore(uid) || {};
  if (score > newScore) return;

  await updateEndpointValue(`scores/${uid}`, { score: newScore, name });
};

export const getHighscores = async (count = 10) => {
  const leaderboard = await db.ref('scores')
    .orderByChild('score')
    .limitToFirst(count)
    .once('value');

  return Object.values(leaderboard.val());
};
