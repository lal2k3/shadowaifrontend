import { combineReducers } from 'redux';
import auth from './auth';
import general from './general';
import policies from './policies';
import integrations from './integrations';
import agents from './agents';
import risks from './risks';
import blockedPrompts from './blockedPrompts';
import heartbeats from './heartbeats';
import heartbeatWidgets from './heartbeatWidgets';

const reducers = combineReducers({
  auth,
  general,
  policies,
  integrations,
  agents,
  risks,
  blockedPrompts,
  heartbeats,
  heartbeatWidgets,
});

export type IRootState = ReturnType<typeof reducers>;

export default reducers;
