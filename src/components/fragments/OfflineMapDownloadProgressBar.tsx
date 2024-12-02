import React, { FC } from 'react';
import {Text} from 'react-native'
import { sovietColours } from '../../assets/sovietStyles';

export interface OfflineMapDownloadProgressBarProps {
  offlineMapDownloadProgress: number;
}

/**
 * This is the progress bar that loads once an offline map is being downloaded
 * @param param0 
 * @returns 
 */
export const OfflineMapDownloadProgressBar: FC<OfflineMapDownloadProgressBarProps> = ({
  offlineMapDownloadProgress,
}) => {
  return (
    <Text style={{
      position: 'absolute' as 'absolute',
      top: 5,
      right: 10,
      padding: 5,
      borderRadius: 10,
      backgroundColor: sovietColours.sovietWhiteTranslucent,
      zIndex: 10,
      justifyContent: 'center' as 'center',
      alignItems: 'center' as 'center', color: 'black', textAlign: 'center'
    }}>Download progress: {offlineMapDownloadProgress.toFixed(0)}%</Text>
  )
}



