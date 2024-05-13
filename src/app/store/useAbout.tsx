import { useQuery } from 'react-query';
import _ from 'lodash';

import { getAboutData } from '@/src/app/services/useAbout';

export const UseGetAboutDataApi = () => {
    const { isLoading, error, data } = useQuery(['getAboutData'], () => getAboutData());
  
    return { 
      aboutData: data,
      aboutLoading: isLoading,
      aboutError: error

    };
  };