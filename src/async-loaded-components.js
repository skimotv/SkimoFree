'use strict';

import MessagingHelper from './MessagingHelper';
import AuthData from './AuthData';
import FirebaseHelper from './FirebaseHelper';
import PrivacySettings from './PrivacySettings';
import SkimoPage from './SkimoPage';

const firebaseHelper = new FirebaseHelper();
const privacySettings = new PrivacySettings(firebaseHelper);
const messagingHelper = new MessagingHelper(firebaseHelper);
export const skimoPage = new SkimoPage();
new AuthData(firebaseHelper, privacySettings);
