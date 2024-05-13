import {API_BASE} from '@env';
import request  from '@/src/app/utils/request';
import { storage } from '@/src/storage';
const lang = storage.getString('language')

export async function getAboutData() {
  let pageId;
  switch (lang) {
    case 'en':
      pageId = 159
      break;
      case 'ar':
      pageId = 395
      break;
      case 'fr':
      pageId = 3432
      break;
      case 'zh-hant':
      pageId = 6372
      break;
      case 'de':
      pageId = 11922
      break;
      case 'ja':
      pageId = 17364
      break;
      case 'ko':
      pageId = 22478
      break;
    default:
      break;
  }
  return request(`${API_BASE}about_content?lang=${lang}&page_id=${pageId}`, {
    method: 'get',
  });
}