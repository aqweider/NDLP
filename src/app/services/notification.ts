import {API_BASE} from '@env';
import request  from '@/src/app/utils/request';
import { storage } from '@/src/storage';
const lang = storage.getString('language')
import {
  handleNotificationLanguage
} from '@/src/app/utils/pushNotifications_helper';
const langParam = handleNotificationLanguage();

export async function getNotifications(currentPage: number) {
   return request(`${API_BASE}notification_content?lang=${langParam}&page=${currentPage}&per_page=10`, {
    method: 'get',
  });
}

export async function registerNotificationFcmToken(token:string) {
  try {
    const formdata = new FormData();
    formdata.append('action', 'new_install_token_ajax');
    formdata.append('token', token);
    formdata.append('lang', langParam);
    
    const response = await fetch(
      'https://daleel.gov.sa/wp-admin/admin-ajax.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formdata,
      },
    );    
    return await response.json();
  } catch (error) {
    return { status: 'error' };
  }
}
 