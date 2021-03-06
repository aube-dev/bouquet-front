import React from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import SettingToggleItem from '../../components/item/SettingToggleItem';
import HeaderItem from '../../components/item/HeaderItem';
import useUser from '../../logics/hooks/useUser';
import useCharacterList from '../../logics/hooks/useCharacterList';

type ParamList = {
  SettingAlarm: {
    title: string;
  };
};
export default function SettingAlarmCustomScreen(): React.ReactElement {
  const user = useUser();
  const characterList = useCharacterList();

  // navigation param
  const route = useRoute<RouteProp<ParamList, 'SettingAlarm'>>();
  const title: string = route.params?.title;

  return (
    <area.Container>
      <HeaderItem
        isAccount
        isBackButton
        name={user.name}
        profileImg={user.profile_img}
        routePrefix="ProfileTab"
      />

      <View style={{ paddingHorizontal: 30 }}>
        <text.Subtitle2B textColor={colors.black} style={{ marginBottom: 11 }}>
          {title}
        </text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={characterList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(obj) => (
                  <SettingToggleItem
                    characterInfo={obj.item}
                    routePrefix="ProfileTab"
                  />
                )}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}
