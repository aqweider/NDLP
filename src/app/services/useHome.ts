import {API_BASE} from '@env';
import request  from '@/src/app/utils/request';
import { storage } from '@/src/storage';
const lang = storage.getString('language')

export async function getHomeData() {
  return request(`${API_BASE}home_content?lang=${lang}`, {
    method: 'get',
  });
}