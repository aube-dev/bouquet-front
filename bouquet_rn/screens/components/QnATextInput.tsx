import React from 'react';
import {View, TextInput} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import ProfileButton from './ProfileButton';
import LineButton from './LineButton';
import QuestionItem from './QuestionItem';
import ConditionButton from './ConditionButton';

export default function QnATextInput(){
  return(
    <View style={{paddingHorizontal:10, paddingVertical:10, backgroundColor:colors.white, borderRadius:10, marginBottom:10}}>
      <area.RowArea style={{marginBottom:10}}>
        <View style={{flex:1}}><ProfileButton diameter={30}/></View>
        <LineButton press={()=>{}} content="질문 바꾸기" color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
      </area.RowArea>
      <QuestionItem/>
      <View style={{borderWidth:1, borderColor:colors.gray5, marginBottom:10, marginHorizontal:10}}/>
      <TextInput placeholder="답변을 입력해 보세요." multiline={true} style={{marginBottom:10, paddingHorizontal:10, paddingVertical:10}}/>
      <View style={{alignItems:'flex-end'}}>
        <LineButton press={()=>{}} content="올리기" color={colors.primary} incolor={colors.alpha20_primary} outcolor={'transparent'}/>
      </View>
    </View>
  );
}