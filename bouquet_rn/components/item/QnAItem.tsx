import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// props & logic
import * as cal from '../../logics/non-server/Calculation';

// components
import ProfileButton from '../button/ProfileButton';
import QuestionItem from './QuestionItem';
import SunButton from '../button/SunButton';
import useCharacter from '../../logics/hooks/useCharacter';

type QnAItemProps = {
  question: string;
  answer: string;
};
export default function QnAItem({
  question,
  answer,
}: QnAItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [character, setCharacter] = useCharacter();
  function goPosting() {
    navigation.navigate('Posting');
  }
  return (
    <TouchableWithoutFeedback onPress={() => goPosting}>
      <WholeArea>
        <area.RowArea style={{ marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <ProfileButton
              diameter={30}
              isAccount={false}
              name={character.name}
              profile={character.profileImg}
            />
          </View>
          <text.Caption color={colors.gray5}>
            {cal.timeName(57)} {i18n.t('전')}
          </text.Caption>
        </area.RowArea>
        <QuestionItem question={question} />
        <MiddleLine />
        <text.Body2R
          color={colors.black}
          style={{
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {answer}
        </text.Body2R>
        <View style={{ alignItems: 'flex-start' }}>
          <SunButton sun={0} active={false} />
        </View>
      </WholeArea>
    </TouchableWithoutFeedback>
  );
}

const MiddleLine = styled.View`
  border-width: 1;
  border-color: ${colors.gray5};
  margin-bottom: 10;
  margin-horizontal: 10;
`;

const WholeArea = styled.View`
  padding-horizontal: 10;
  padding-vertical: 10;
  background-color: ${colors.white};
  border-radius: 10;
  margin-bottom: 10;
`;
