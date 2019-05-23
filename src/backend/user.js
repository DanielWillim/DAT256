import { get } from 'lodash/fp';

export const userName = ({ displayName }) => displayName || 'Gäst';
export const isGuest = get('isAnonymous');
export const uid = get('uid');
export const email = get('email');
