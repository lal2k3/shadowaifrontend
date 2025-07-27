import { combineReducers } from 'redux';
import auth from './auth';
import general from './general';
import policies from './policies';
import integrations from './integrations';
import risks from './risks';

const reducers = combineReducers({
  auth,
  general,
  policies,
  integrations,
  risks,
});

export type IRootState = ReturnType<typeof reducers>;

export default reducers;
