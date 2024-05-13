/* eslint-disable sonarjs/no-nested-template-literals */
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform,Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import useKeyboard from '@/src/app/hooks/useKeyboard';
import { Container, Loader } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export const Help = () => {
  const isKeyboardOpen = useKeyboard();

  const [html, setHtml] = useState('');
  const [loadingPage, setLoadingPage] = useState(false);

  const { i18n } = useTranslation();
  const lang = i18n.language;

  useLayoutEffect(() => {
    setHtml(
      `  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Daleel</title>  
    ${
      lang === 'en'
        ? ` <script>
    var APP_ID = 'y8zll4ny'
    window.intercomSettings = {
      app_id: APP_ID,
      language_override: 'en'
    }
  </script>`
        : ` <script>
  var APP_ID = 'y8zll4ny'
  window.intercomSettings = {
    app_id: APP_ID,
    language_override: 'ar'
  }
</script>`
    }  



    
    <script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>

</head>
<body>
<script>
if(!document.__defineGetter__) {
  Object.defineProperty(document, 'cookie', {
      get: function(){return ''},
      set: function(){return true},
  });
} else {
  document.__defineGetter__("cookie", function() { return '';} );
  document.__defineSetter__("cookie", function() {} );
}
  Intercom('show');
  function callback(mutationList) {
    mutationList.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        frames[1].document.getElementsByClassName('intercom-1wfu0cf')[0].setAttribute('style', 'display:none')
      }
    })
  }
  var observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true
  });
</script>
</body>
</html>
`,
    );
  }, [lang]);

  return (
    <Container>
      <Text></Text>
      {/* <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.contentContainer,
            isKeyboardOpen && { marginBottom: 0 },
          ]}>
          {(loadingPage || !html) && <Loader cover={true} />}
          <WebView
            scrollEnabled={true}
            nestedScrollEnabled={true}
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled={true}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            startInLoadingState={true}
            domStorageEnabled={true}
            renderLoading={() => {
              return <Loader />;
            }}
            onError={error => {
              console.log('web error', error);
            }}
            style={styles.webView}
            source={{ html }}
            automaticallyAdjustContentInsets={false}
            onLoadStart={() => setLoadingPage(true)}
            onLoadEnd={() => setLoadingPage(false)}
          />
        </ScrollView>
      </SafeAreaView> */}
    </Container>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Color.DarkGunMetal,
    flexGrow: 1,
    marginBottom: Platform.OS === 'ios' ? 63 : 92,
  },
  webView: {
    height: '100%',
    width: '100%',
  },
});
