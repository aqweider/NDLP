import _ from 'lodash';
import axios, {AxiosError, AxiosResponse} from 'axios';
// import {Navigation} from 'react-native-navigation';
import {StatusBar} from 'react-native';
// import {showErrorMessage} from '@helpers';
// import {authRoute} from '@navigation';

// const onMessageHide = () => {
//   StatusBar.setBarStyle('dark-content', true);
// };
const parseErrorMessage = (data, status) => {
  const codeMessage = {
    401: 'The user does not have permission (the token, username, password is wrong).',
    500: 'An error occurred on the server, please check the server.',
    502: 'Gateway error.',
    503: 'The service is unavailable, and the server is temporarily overloaded or maintained.',
    504: 'The gateway timed out.',
  };
  const statusCode = _.get(data, 'statusCode', status);
  if (_.isObject(data) && data.error) {
    return data.error;
  }
  const message = _.get(codeMessage, statusCode);
  if (message) {
    return message;
  }
  if (!Object.keys(codeMessage).includes(status)) {
    return data;
  }
  return codeMessage['500'];
};
/**
 * Exception handler
 */
const errorHandler = (error: AxiosError) => {
  const response: AxiosResponse = _.get(error, 'response');
  if (error.response && __DEV__) {
  }
  if (!response) {
    //Show toast message
    return {isError: true};
  }
  const {status, data} = response;
  if (data && data.feedback) {
    let errorText = '';
    if (data.feedback.code === 'ELM_YAKEEN_UNEXPECTED_ERROR') {
      const errorCode = _.get(data, 'feedback.details.error.errorCode');
      const errorMessage = _.get(data, 'feedback.details.error.errorMessage');
      const remoteServiceError = _.get(
        data,
        'feedback.details.error.remoteServiceError',
      );
      if (remoteServiceError) {
        errorText = remoteServiceError.message;
      } else {
        errorText = errorMessage;
      }
    }
    // if (data.feedback.statusCode === 401) {
    //   Navigation.setRoot(authRoute());
    // }
    // showErrorMessage(errorText);
  }

  if (response && response.status) {
    const {feedback} = data;
    let errorText = '';
    if (feedback && feedback.fields) {
      console.log('feedback.fields', feedback.fields);

      if (feedback.fields.email) {
        errorText = feedback.fields.email[0].en;
      }
      if (feedback.fields.phone) {
        errorText = feedback.fields.phone.feedback.en;
      }
      if (feedback.fields.birthDate) {
        errorText = feedback.fields.birthDate[0].en;
      }
      if (feedback.fields.password) {
        errorText = feedback.fields.password.feedback.en;
      }
      if (feedback.fields.personId) {
        errorText = feedback.fields.personId[0].en;
      }
      if (feedback.fields.mobileNumberWithCountryCode) {
        errorText = feedback.fields.mobileNumberWithCountryCode[0].en;
      }
      if (feedback.date) {
        errorText = feedback.fields.data.en;
      }
    } else {
      if (feedback.code) {
        errorText = feedback.message.en
          ? feedback.message.en
          : feedback.message;
      }
    }

    // const errorText =
    //   response.status === 400
    //     ? data.Message
    //     : codeMessage[response.status] || response.statusText;
    // showErrorMessage(errorText);
  } else if (!response) {
    // showErrorMessage(
    //   'Can’t connect. Please check your network connection and try again.',
    // );
  }
  return {
    isError: true,
    error: parseErrorMessage(data, status),
  };
};
const request = axios.create({
  headers: {
    Accept: 'application/json',
  },
});
request.interceptors.response.use(function (response) {
  if (response.data) {
    return response.data;
  }
  return response;
}, errorHandler);
request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
export default request;
