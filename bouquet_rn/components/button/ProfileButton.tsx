import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';
import { useRecoilState } from 'recoil';

import { characterListState } from '../../logics/atoms';
import useCharacterView from '../../logics/useCharacterView';
import useUserView from '../../logics/useUserView';

type ProfileButtonProps = {
  diameter: number;
  isAccount: boolean;
  name: string;
  profile: string;
};
export default function ProfileButton({
  diameter,
  isAccount,
  name,
  profile,
}: ProfileButtonProps): React.ReactElement {
  const navigation = useNavigation();
  const [characterList, setCharacterList] = useRecoilState(characterListState);
  const [characterView, setCharacterView] = useCharacterView();
  const [viewUser, setViewUser, isMe] = useUserView();

  function goProfileDetail() {
    let characterToView: string | number = name;
    for (const ch of characterList) {
      if (ch.name === name) {
        characterToView = ch.id;
        break;
      }
    }
    setCharacterView(characterToView);
    navigation.navigate('ProfileItem');
  }
  function goAccount() {
    setViewUser({ name: name, profileImg: profile });
    navigation.navigate('ProfileAccount');
  }

  return (
    <TouchableWithoutFeedback onPress={isAccount ? goAccount : goProfileDetail}>
      <area.RowArea>
        <elses.CircleImg diameter={diameter} source={{ uri: profile }} />
        <View style={{ marginLeft: 8 }} />
        <text.Body2B color={colors.black}>{name}</text.Body2B>
      </area.RowArea>
    </TouchableWithoutFeedback>
  );
}