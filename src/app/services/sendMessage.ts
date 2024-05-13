import { err } from 'react-native-svg/lib/typescript/xml';
import validator from 'validator';

type messageProps = {
  name: string;
  email: string;
  subject: string;
  phoneNumber: string;
  description: string;
};

export const sendMessageService = async ({
  name,
  email,
  subject,
  phoneNumber,
  description,
}: messageProps) => {
  try {
    const formdata = new FormData();
    formdata.append('type', 'contact-Form');
    formdata.append('action', 'codex_get_ajax');
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('subject', subject);
    formdata.append('description', description);
    if (!validator.isEmpty(phoneNumber.trim())) {
      formdata.append('phone', phoneNumber);
    }

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
    console.log(error);
    return { status: 'error' };
  }
};
