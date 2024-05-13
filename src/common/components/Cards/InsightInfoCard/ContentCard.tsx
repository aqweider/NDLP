import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { GradientView, Icon, Text } from '@/src/common/components';
import { Color, TextSize } from '@/src/theme/const';

type Props = {
  title: string;
  summary: string | Array<{}>;
};

const ContentCard = ({ title, summary }: Props) => {
  const NUM_LINES = 7;

  const { t } = useTranslation();

  const [textShown, setTextShown] = useState(false); // To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); // to show the "Read more & Less Line"
  const [numOfLines, setNumOfLines] = useState(0);

  const toggleNumberOfLines = () => {
    // To toggle the show text or hide it
    setTextShown(prev => !prev);
  };

  const onTextLayout = useCallback(e => {
    e.nativeEvent.lines.length > NUM_LINES &&
      !textShown &&
      setNumOfLines(NUM_LINES); // to check the text is more than 7 lines or not

    e.nativeEvent.lines.length > NUM_LINES &&
      lengthMore !== e.nativeEvent.lines.length > NUM_LINES &&
      setLengthMore(e.nativeEvent.lines.length > NUM_LINES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.headerContainer}>
      {!!title && (
        <GradientView style={styles.linearGradient}>
          <Text style={styles.headerTitle}>{title}</Text>
        </GradientView>
      )}
      {!!summary && typeof summary === 'string' &&  (
        <View style={styles.textContentContainer}>
          <Text
            style={styles.textContent}
            ellipsizeMode="tail"
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? 0 : numOfLines}>
            {summary}
          </Text>

          {lengthMore ? (
            <Pressable
              onPress={toggleNumberOfLines}
              style={styles.toggleContentContainer}>
              <Text style={styles.toggleContentText}>
                {textShown ? t('seeLess') : t('seeMore')}
              </Text>
              <Icon
                name={textShown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={20}
                color={Color.White}
                type="MaterialIcons"
              />
            </Pressable>
          ) : undefined}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  headerTitle: {
    color: Color.White,
    fontFamily: 'TheSansArabic-Plain',
    fontSize: TextSize.Title3,
  },
  linearGradient: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textContent: {
    color: Color.White,
    fontFamily: 'TheSansArabic-Plain',
    fontSize: TextSize.Body2,
    lineHeight: 16,
  },
  textContentContainer: {
    backgroundColor: Color.Jacarta,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  toggleContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  toggleContentText: {
    color: Color.White,
    fontFamily: 'TheSansArabic-Bold',
    marginEnd: 3,
  },
});

export default React.memo(ContentCard);
