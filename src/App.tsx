/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Routes from 'routes';
import 'styles/baseline.scss';
import 'styles/overview.scss';
import 'styles/cvesmap.scss';
import 'styles/integrations.scss';
import 'styles/policies.scss';
import 'styles/login.scss';
import 'styles/tables.scss';
import CommunicationInit from 'utils/authentication/CommunicationInit';
import { AppConfig } from 'components/general/AppConfig';

function App() {
  console.log(AppConfig.serverUrl);
  return (
    <>
      <CommunicationInit />
      <Routes />
    </>
  );
}

export default App;
