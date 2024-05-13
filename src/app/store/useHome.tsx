import { useQuery } from 'react-query';
import _ from 'lodash';
import React, { useCallback, useState, useEffect } from 'react';

import { storage } from '@/src/storage';
import { getHomeData } from '@/src/app/services/useHome';
// const isLTR = storage.getString('language') === 'en'

export const UseGetHomeDataApi = () => {
  const { isLoading, error, data } = useQuery(['getHomeData'], () => getHomeData());

  return { homeData: data,homeDataError: error, homeDataLoading: isLoading };
};