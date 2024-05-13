import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';

import { useOnboardingStatus } from '@/src/app/hooks/useOnBoardingStatus';
import { storage } from '@/src/storage';

const checkIfFirstLaunch = async () => {
  try {
    const hasFirstLaunched = storage.getString('user_onboarded');
    if (hasFirstLaunched === undefined) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

const useGetOnboardingStatus = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isFirstLaunchIsLoading, setIsFirstLaunchIsLoading] = useState(true);
  const { setOnBoardingStatus } = useOnboardingStatus();

  const setAppLaunch = async () => {
    try {
      storage.set('user_onboarded', false);
      setIsFirstLaunch(false);
      setOnBoardingStatus(false);
      auth().signInAnonymously();
    } catch {
      return false;
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const firstLaunch = await checkIfFirstLaunch();
      setIsFirstLaunch(firstLaunch);
      setIsFirstLaunchIsLoading(false);
    };
    fetchData();
  }, [isFirstLaunch]);

  return {
    isFirstLaunch,
    setAppLaunch,
    isLoading: isFirstLaunchIsLoading,
    setIsFirstLaunch,
  };
};

export default useGetOnboardingStatus;
