import {API_BASE} from '@env';
import request from '@/src/app/utils/request';
import {storage} from '@/src/storage';
const lang = storage.getString('language');

export async function getSegmentData(id: number) {
  return request(`${API_BASE}segments_content?lang=${lang}&id=${id}`, {
    method: 'get',
  });
}
