/* eslint-disable react/react-in-jsx-scope */
import { lazy } from 'react';
import MainPanel from '../components/general/MainPanel';
import { SuspenseRoute } from './SuspenseRoute';
import { RouteObject } from 'react-router-dom';
import PoliciesPage from 'pages/policies/PoliciesPage';
import SettingsPage from 'pages/settings/SettingsPage';
import LogoutPage from 'pages/logout/LogoutPage';

const OverviewPage = lazy(() => import('../pages/overview/OverviewPage'));

const IntegrationPage = lazy(
  () => import('../pages/integrations/IntegrationPage'),
);

const AgentsPage = lazy(() => import('../pages/agents/AgentsPage'));

const MainRoutes: RouteObject = {
  path: '/',
  element: <MainPanel />,
  children: [
    {
      path: '/',
      element: <SuspenseRoute component={<OverviewPage />} />,
    },
    {
      path: 'policies',
      element: <SuspenseRoute component={<PoliciesPage />} />,
    },
    {
      path: 'integrations',
      element: <SuspenseRoute component={<IntegrationPage />} />,
    },
    {
      path: 'agents',
      element: <SuspenseRoute component={<AgentsPage />} />,
    },
    {
      path: 'settings',
      element: <SuspenseRoute component={<SettingsPage />} />,
    },
    {
      path: 'logout',
      element: <SuspenseRoute component={<LogoutPage />} />,
    },
  ],
};

export default MainRoutes;
