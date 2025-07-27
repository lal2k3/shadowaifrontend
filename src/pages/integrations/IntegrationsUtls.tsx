import { ReactNode } from 'react';
import { FaJenkins } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io';
import { RiAddCircleFill } from 'react-icons/ri';
import { VscAzure } from "react-icons/vsc";
import { FaAws } from 'react-icons/fa';
import { SiGooglecloud } from 'react-icons/si';
import GithubSettings from './wizard/settings/GithubSettings';

export type IntegrationType =
  | 'ADD_NEW'
  | 'JENKINS'
  | 'GITHUB'
  | 'AWS'
  | 'GCP'
  | 'AZURE';

export type Integration = {
  id: string;
  name: string;
  type: IntegrationType;
};

export const AddNewIntegration: Integration = {
  id: 'add_new',
  name: 'Add New',
  type: 'ADD_NEW',
};

export type IntegrationsLogosType = {
  [key in IntegrationType]: string | ReactNode;
};

export const IntegrationsLogos: IntegrationsLogosType = {
  ADD_NEW: <RiAddCircleFill />,
  JENKINS: <FaJenkins />,
  GITHUB: <IoLogoGithub />,
  AWS: <FaAws />,
  GCP: <SiGooglecloud />,
  AZURE: <VscAzure />,
};

export type IntegrationForm = {
  [key in IntegrationType]: {
    name: string;
    type: string;
    value: string;
  }[];
};

export type IntegrationWizardTitlesType = {
  [key in number]: string;
};

export const IntegrationWizardTitles: IntegrationWizardTitlesType = {
  1: 'Select an integration',
  2: 'Integration settings',
};

export type IntegrationFromsType = {
  [key in IntegrationType]: ReactNode;
};

export const IntegrationForms: IntegrationFromsType = {
  GITHUB: <GithubSettings />,
  ADD_NEW: '',
  JENKINS: '',
  AWS: '',
  GCP: '',
  AZURE: ''
};
