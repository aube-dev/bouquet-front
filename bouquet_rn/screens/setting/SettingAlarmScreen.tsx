import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import SettingItem from '../../components/item/SettingItem';
import HeaderItem from '../../components/item/HeaderItem';
import useUser from '../../logics/hooks/useUser';

export default function SettingAlarmScreen(): React.ReactElement {
  const user = useUser();
  const navigation = useNavigation();
  const titles = [
    i18n.t('팔로우하는 캐릭터의 새 글'),
    i18n.t('내 글이 받은 햇빛'),
    i18n.t('내 글에 달린 댓글'),
    i18n.t('다른 캐릭터가 나를 팔로우'),
  ];

  return (
    <area.Container>
      <HeaderItem
        isAccount
        isBackButton
        name={user.name}
        profileImg={user.profile_img}
        routePrefix="ProfileTab"
      />

      <View style={{ marginVertical: 20, paddingHorizontal: 30 }}>
        <text.Subtitle2B textColor={colors.black} style={{ marginBottom: 11 }}>
          {i18n.t('캐릭터별 알림 설정')}
        </text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem
            content={titles[0]}
            onPress={() =>
              navigation.navigate('SettingAlarmCustom', { title: titles[0] })
            }
          />
          <SettingItem
            content={titles[1]}
            onPress={() =>
              navigation.navigate('SettingAlarmCustom', { title: titles[1] })
            }
          />
          <SettingItem
            content={titles[2]}
            onPress={() =>
              navigation.navigate('SettingAlarmCustom', { title: titles[2] })
            }
          />
          <SettingItem
            content={titles[3]}
            onPress={() =>
              navigation.navigate('SettingAlarmCustom', { title: titles[3] })
            }
          />
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}
