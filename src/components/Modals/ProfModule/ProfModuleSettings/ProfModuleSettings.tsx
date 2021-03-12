import React from 'react';
import { TProfileView } from '../types/profileMainTypes';
import { ProfModuleSettingsView } from './ProfModuleSettingsView/ProfModuleSettingsView';
import { ProfModuleSettingsPass } from './ProfModuleSettingsPass/ProfModuleSettingsPass';

interface IProps {
  profileView: TProfileView;
}

export const ProfModuleSettings: React.FC<IProps> = ({ profileView }) => {
  return profileView === 'updatePassword' ? <ProfModuleSettingsPass /> : <ProfModuleSettingsView />;
};
