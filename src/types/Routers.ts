import React from 'react';

export interface IRouters {
  key: string;
  path: string;
  Component: React.FC;
  privateMode: boolean;
  exact: boolean;
}
