import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Color } from '@/src/theme/const';

export const useHideBar = () => {
  const navigation = useNavigation();
  const [showTabState, setShowTabState] = useState('flex');

  const showTab = useRef('flex');
  const setShowTab = (state: 'flex' | 'none') => {
    console.log('qwer', state);
    
    if (state !== showTab.current) {
      showTab.current = state;
      setShowTabState(state);
    }
  };

  useEffect(() => {
    const navTab =
      navigation?.getState()?.type === 'tab'
        ? navigation
        : navigation.getParent();

    navTab?.setOptions({
      tabBarStyle: {
        display: showTabState || 'flex',
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
        backgroundColor: Color.DarkPurple,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 94,
        zIndex: 8,
        borderTopWidth: 0,
        elevation: 4,
        shadowColor: Color.Black,
        shadowOffset: {
          width: 2,
          height: 1,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2.62,
      },
    });
  }, [navigation, showTabState]);

  return { setShowTab };
};
