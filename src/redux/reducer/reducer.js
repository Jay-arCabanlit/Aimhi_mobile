import {
  SET_COMPANY_ID,
  SET_PROJECT_ID,
  SET_USER_ID,
  SET_PROJECT_NAME,
  SET_NETWORK_STATUS,
  SET_TOKEN,
  SET_EMAIL,
  SET_FULL_NAME,
  SET_PROFILE_LINK,
} from '../action/action';

const initialState = {
  user_id: null,
  company_id: null,
  project_id: -1,
  project_name: null,
  network_status: null,
  token: null,
  email: null,
  full_name: null,
  profile_link: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_ID:
      return {...state, company_id: action.payload};
    case SET_USER_ID:
      return {...state, user_id: action.payload};
    case SET_PROJECT_ID:
      return {...state, project_id: action.payload};
    case SET_PROJECT_NAME:
      return {...state, project_name: action.payload};
    case SET_NETWORK_STATUS:
      return {...state, network_status: action.payload};
    case SET_TOKEN:
      return {...state, token: action.payload};
    case SET_EMAIL:
      return {...state, email: action.payload};
    case SET_FULL_NAME:
      return {...state, full_name: action.payload};
    case SET_PROFILE_LINK:
      return {...state, profile_link: action.payload};
    default:
      return state;
  }
};

export default loginReducer;
