export const SET_USER_ID = 'SET_USER_ID';
export const SET_COMPANY_ID = 'SET_COMPANY_ID';
export const SET_PROJECT_ID = 'SET_PROJECT_ID';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';
export const SET_NETWORK_STATUS = 'SET_NETWORK_STATUS';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_FULL_NAME = 'SET_FULL_NAME';
export const SET_PROFILE_LINK = 'SET_PROFILE_LINK';
export const SET_TOKEN = 'SET_TOKEN';

export const setUserId = user_id => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: user_id,
  });
};

export const setCompanyId = company_id => dispatch => {
  dispatch({
    type: SET_COMPANY_ID,
    payload: company_id,
  });
};

export const setProjectId = project_id => dispatch => {
  dispatch({
    type: SET_PROJECT_ID,
    payload: project_id,
  });
};

export const setProjectName = project_name => dispatch => {
  dispatch({
    type: SET_PROJECT_NAME,
    payload: project_name,
  });
};

export const setNetworkStatus = network_status => dispatch => {
  dispatch({
    type: SET_NETWORK_STATUS,
    payload: network_status,
  });
};

export const setToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const setEmail = email => dispatch => {
  dispatch({
    type: SET_EMAIL,
    payload: email,
  });
};

export const setFullName = full_name => dispatch => {
  dispatch({
    type: SET_FULL_NAME,
    payload: full_name,
  });
};

export const setProfileLink = profile_link => dispatch => {
  dispatch({
    type: SET_PROFILE_LINK,
    payload: profile_link,
  });
};
