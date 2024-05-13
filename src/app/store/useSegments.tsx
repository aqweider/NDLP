import {useQuery} from 'react-query';
import _ from 'lodash';
import React, {Component} from 'react';
import {storage} from '@/src/storage';
import {getSegmentData} from '@/src/app/services/useSegments';

export const UseGetSegmentsDataApi = (segmentId: number) => {
  const {isLoading, error, data} = useQuery([`segment${segmentId}`], () => {
    return getSegmentData(segmentId);
  });
  return {
    segment: data,
    segmentDataError: error,
    segmentDataLoading: isLoading,
  };
};
