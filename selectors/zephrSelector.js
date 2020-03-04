import { createSelector } from 'reselect';
import get from 'lodash/get';

export const zephrSelector = (state) => state.zephr;

/* Load State */
export const getIsLoading = createSelector(
  zephrSelector,
  (state) => state.isLoading,
);

/* Forms */
export const getForms = createSelector(
  zephrSelector,
  (state) => state.forms,
);

export const getLoginForm = createSelector(
  zephrSelector,
  (state) => state.forms.login,
);

export const getRegistrationForm = createSelector(
  zephrSelector,
  (state) => state.forms.register,
);

export const getResetRequestForm = createSelector(
  zephrSelector,
  (state) => state.forms.resetRequest,
);

export const getResetForm = createSelector(
  zephrSelector,
  (state) => state.forms.reset,
);

export const getCached = createSelector(
  zephrSelector,
  (state) => state.cached,
);

/* User Session */
export const getSession = createSelector(
  zephrSelector,
  (state) => state.session,
);

export const isSSO = createSelector(
  zephrSelector,
  (state) => state.user.profile.isSSO,
);

/* The Zephr cookie  */
export const getZephrCookie = createSelector(
  zephrSelector,
  (state) => get(
    state,
    'session.payload.sessionCookie',
    ''
  )
);

/* User Profile/Account */
export const getUser = createSelector(
  zephrSelector,
  (state) => state.user,
);

export const getAccount = createSelector(
  zephrSelector,
  (state) => state.user.account,
);

export const getProfile = createSelector(
  zephrSelector,
  (state) => state.user.profile,
);

export const getEmail = createSelector(
  zephrSelector,
  (state) => state.user.account.emailAddress,
);

export const getFirstName = createSelector(
  zephrSelector,
  (state) => state.user.profile.firstName,
);

export const getLastName = createSelector(
  zephrSelector,
  (state) => state.user.profile.lastName,
);

export const getEmailVerified = createSelector(
  zephrSelector,
  (state) => state.user.emailVerified,
);
