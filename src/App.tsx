/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Routes from 'routes';
import 'styles/baseline.scss';
import 'styles/overview.scss';
import 'styles/cvesmap.scss';
import 'styles/integrations.scss';
import 'styles/policies.scss';
import 'styles/agents.scss';
import 'styles/login.scss';
import 'styles/tables.scss';
import CommunicationInit from 'utils/authentication/CommunicationInit';

function App() {
  return (
    <>
      <CommunicationInit />
      <Routes />
    </>
  );
}

export default App;
