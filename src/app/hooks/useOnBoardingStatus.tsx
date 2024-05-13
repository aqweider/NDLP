import React, { useContext } from 'react';

interface UserContextProps {
  onBoardingStatus: boolean;
  setOnBoardingStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
const OnBoardingStatusContext = React.createContext({} as UserContextProps);

export default OnBoardingStatusContext;

export const useOnboardingStatus = () => {
  const { onBoardingStatus, setOnBoardingStatus } = useContext(
    OnBoardingStatusContext,
  );

  return { onBoardingStatus, setOnBoardingStatus };
};
