import 'react-native-get-random-values';

import React, { useCallback, lazy, Suspense  } from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
// import convertSvgToPng from 'convert-svg-to-png';

import { Text, ZoomableImage } from '@/src/common/components';
import { Color, TextSize } from '@/src/theme/const';

import ContentCard from './ContentCard';

type Props = {
  info: {
    id: string;
    name: string;
    img?: {url: string }[];
    content: [
      {
        title: string;
        summary: string;
        chart?: string[];
      },
    ];
  };
};

export default  React.memo(({ info }: Props) => {
  const { id, img, name, content } = info;
  const fallbackUI = (
    <View>
      <ActivityIndicator size="small" color={'white'} />
    </View>
  );
  const ZoomableImage = lazy(() => import('../../ZoomableImage/ZoomableImage'))
  // const imgName: keyof typeof Images | false | string =
  //   !!img && img?.split('.')[0]?.replace(/-/gi, '_');
  // console.log('img', img);
  // if (img?.length > 0) {
  //   console.log('eman');
    
  //   const pngData = convertSvgToPng.convert(img[0]);
  //   console.log('pngData', pngData);
    
  // }
  
  
    // console.log('imgName', imgName);
    // console.log('Images[imgName as keyof typeof Images]', Images[imgName as keyof typeof Images]);
    
    // const fallbackUI = (
    //   <View>
    //     <ActivityIndicator size="small" color={'white'} />
    //   </View>
    // );

  const contentCard = useCallback((title: string, summary: string | Array<{}>) => {
    return <ContentCard title={title} summary={summary} />;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.infoName}>{name}</Text>
      {/* {img?.length > 0 && (
        <ZoomableImage
          key={img[0].url}
          passedImage={img[0].url}
        />
      )} */}
      {
        img?.length > 0 && img.map((image, index) => {
          return(
            <Suspense fallback={fallbackUI}>
              <ZoomableImage
                key={index}
                passedImage={image.url}
              />
            </Suspense>
          );
        })
      }
      {content.map(({ title, summary, chart }) => (
        <View key={title}>
          {contentCard(title, summary)}
          {/* {!!chart && chart?.length > 0 && (
            <View>
              {chart.map(item => {
                return (
                  <ZoomableImage
                    key={`${item}`}
                    passedImage={Images[item as keyof typeof Images]}
                  />
                );
              })}
            </View>
          )} */}
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  infoName: {
    color: Color.White,
    fontFamily: 'TheSansArabic-Bold',
    fontSize: TextSize.Title3,
  },
});
