import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import type {RegisterProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import NameNText from '../components/NameNText';

export default function RegisterScreenFour({navigation} : RegisterProps){
  const[name,setName]=useState('undefined');

  const goNext=()=>{
    navigation.navigate("RegisterFour");
  }

  return(
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="회원가입 완료!" step={4}/>
      </area.ContainerBlank20>

      <View style={styles.middleArea}>
        <elses.Circle radius={120} vertical={16}/>
        <NameNText name={name} sub="님,"/>
        <text.Subtitle2R color={colors.black}>환영합니다!</text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea>
          <ConditionButton active={1} press={goNext} content="시작"/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}

const styles = StyleSheet.create({
  middleArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
})