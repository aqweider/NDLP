import {API_BASE} from '@env';
import request  from '@/src/app/utils/request';
import { storage } from '@/src/storage';
const lang = storage.getString('language')

export async function getMarketInsights() {
  return request(`${API_BASE}market_insights_content?lang=${lang}`, {
    method: 'get',
  });
}

export async function getMarketInsightsSectors() {
  return request(`${API_BASE}_sector?lang=${lang}`, {
    method: 'get',
  });
}

export async function getSourceOfData() {
  let pageId;
  switch (lang) {
    case 'en':
      pageId = 157
      break;
      case 'ar':
      pageId = 393
      break;
      case 'fr':
      pageId = 8337
      break;
      case 'zh-hant':
      pageId = 8322
      break;
      case 'de':
      pageId = 12184
      break;
      case 'ja':
      pageId = 17812
      break;
      case 'ko':
      pageId = 22236
      break;
    default:
      break;
  }
  return request(`${API_BASE}key_source_for_data?lang=${lang}&page_id=${pageId}`, {
    method: 'get',
  });
}
 