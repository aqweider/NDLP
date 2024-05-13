import { useQuery } from 'react-query';
import _ from 'lodash';
import React, { useCallback, useState, useEffect } from 'react';

import { storage } from '@/src/storage';
import { getMarketInsights, getMarketInsightsSectors, getSourceOfData } from '@/src/app/services/useMarketInsights';
// const isLTR = storage.getString('language') === 'en'

export const UseGetMarketInsightsSectorsApi = () => {
  const [insightsData, setInsightsData] = useState();
  const [selectedData, setSelectedData] = useState();
  const [insightsLoading, setInsightsLoading] = useState(false);

  const filterData = (data: [], sectorId: 0) => {
    const result = data && data.filter(item =>
      item?.sectors.includes(Number(sectorId)),
    );
    setSelectedData(result);
      
    return result;
  }

  const { isLoading, error, data } = useQuery(['apiMarketInsightsSectors'], () => getMarketInsightsSectors(),{
    onSuccess: (data) => {
      if (data && data.length > 0) {
        _.remove(data, (item) => item.count === 0);
        const defaultSectorId = data && data[0].id;
        setInsightsLoading(true);
        getMarketInsights().then((res) => {
        setInsightsData(res);
        filterData(res, defaultSectorId);
        setInsightsLoading(false);
        
        })
      }
    },
  });

  return { 
    sectorLoading: isLoading, 
    sectors: data,
    defaultId: data && data.length > 0 && data[0].id,
    selectedData,
    insightsData,
    insightsLoading,
    filterData

  };
};

export const UseGetSourceOfDataApi = () => {
  const [KeySourceData, setKeySourceData] = useState([]);
  const [keySourceTitle, setKeySourceTitle]= useState('');

  const { isLoading, error, data } = useQuery(['getSourceOfData'], () => getSourceOfData(),{
    onSuccess: (data) => {
      if (data) {
        setKeySourceTitle(data?.title);
        setKeySourceData(data?.data);
      }
    },
  });
  
  return { 
    KeySourceData: KeySourceData, 
    KeySourceDataError: error,
     KeySourceDataLoading: isLoading,
     keySourceTitle: keySourceTitle
    };
};
