import React from 'react';
import {ActivityIndicator} from 'react-native';
import {ILoaderProps} from './interface';

export const WhiteLoader: ILoaderProps = ({size}) => {
  return <ActivityIndicator size={size || 'small'} color="#fff" />;
};

export const Loader: ILoaderProps = ({size, color}) => {
  return <ActivityIndicator size={size || 'small'} color={color || '#000'} />;
};
