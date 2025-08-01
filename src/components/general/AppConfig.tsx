type AppConfigType = {
  dir: 'ltr' | 'rtl';
  menuAnchor: 'left' | 'right' | 'top' | 'bottom';
  mode: 'horizontal' | 'vertical';
  collapseWidth: number;
  menuStyle: 'standard' | 'icons-only';
  appName: string;
  serverUrl: string;
  authPath: string;
};

export const AppConfig: AppConfigType = {
  dir: 'ltr',
  menuAnchor: 'left',
  mode: 'horizontal',
  collapseWidth: 650,
  menuStyle: 'icons-only',
  appName: 'ShadowAI',
  serverUrl: process.env.REACT_APP_API_URL,
  authPath: '/auth/login',
};
