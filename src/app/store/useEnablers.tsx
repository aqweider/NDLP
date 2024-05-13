import { useQuery } from 'react-query';
import _ from 'lodash';
import React, { useCallback, useState, useEffect } from 'react';

import { storage } from '@/src/storage';
import { getEnablersData } from '@/src/app/services/useEnablers';
// const isLTR = storage.getString('language') === 'en'

export const UseGetEnablersDataApi = (enablerType:string, initialIndex: number) => {
    const [selectedEnabler, setSelectedEnabler] = useState<EnablerProps | any>();
    const [generalEnabler, setGeneralEnabler] = useState<EnablerProps | any>();
    const [specificEnabler, setSpecificEnabler] = useState<EnablerProps | any>();
    const [selectedField, setSelectedField] =
      useState<EnablerFieldProps | null>();
      
    const { isLoading, error, data } = useQuery(['getEnablersData'], () => getEnablersData(),{
      onSuccess: (data) => {
        if (data && data.length > 0) {
          setSelectedEnabler(data[enablerType === 'general' ? 0 : 1].enablers[initialIndex]);
          setGeneralEnabler(data[0].enablers);
          setSpecificEnabler(data[1].enablers)
        }
      },
    });

  return { 
    enablersDataError: error, 
    enablersDataLoading: isLoading, 
    selectedEnabler,
    generalEnabler,
    specificEnabler,
    setSelectedEnabler
  };
};

export const UseGetAllEnablersDataApi = () => {
  const { isLoading, error, data } = useQuery(['getAllEnablersData'], () => getEnablersData());

  return { 
    allEnablersData: data
  };
};