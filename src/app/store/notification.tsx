import { useQuery } from 'react-query';
import _ from 'lodash';
import React, { useCallback, useState, useEffect } from 'react';

import { storage } from '@/src/storage';
import { getNotifications } from '@/src/app/services/notification';
// const isLTR = storage.getString('language') === 'en'

export const getNotificationsApi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState([]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const { isLoading, error, data } = useQuery(['getNotifications', currentPage], () => getNotifications(currentPage),{
    cacheTime: 0, 
    onSuccess: (data) => {
      setListData([...listData, ...data]);
    },
  });

  return { 
    notificatios: listData,
    pageList: data,
    isLoading,
    error,
    handleNextPage: () => handleNextPage(),
    };
};
