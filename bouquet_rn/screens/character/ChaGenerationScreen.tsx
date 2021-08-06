import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import { useRecoilState } from 'recoil';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';
import { ChaGenerationStackParam } from '../../utils/types';
import { bottomBarHideState } from '../logics/atoms';

// components
import ProgressArea from '../components/ProgressArea';
// screens
import ChaGenerationScreenOne from './ChaGenerationScreenOne';
import ChaGenerationScreenTwo from './ChaGenerationScreenTwo';
import ChaGenerationScreenThree from './ChaGenerationScreenThree';
import ChaGenerationScreenFour from './ChaGenerationScreenFour';
import { StackNavigationProp } from '@react-navigation/stack';

function setTitle(step:number){
  if(step===1) return i18n.t("어떤 모습인가요");
  else if(step===2) return i18n.t("이 캐릭터는 누구인가요");
  else if(step===3) return i18n.t("어떤 캐릭터인가요");
  else return i18n.t("캐릭터 생성 완료")+"!";
}

function setIntro(step:number){
  if(step===1) return i18n.t("이 캐릭터의 겉모습을 생각해 보아요");
  else if(step===2) return i18n.t("이름, 직업 등 이 캐릭터의 기본 정보를 정해 보아요");
  else if(step===3) return i18n.t("캐릭터의 특징을 생각해 보아요");
  else return null;
}
type ParamList = {
  ProfileDetail: {
    modify: number;
  };
};
export default function ChaGenerationScreen(){
  const[step, setStep]=useState(1);
  const navigation = useNavigation<StackNavigationProp<ChaGenerationProps>>();
  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();
  const modify = route.params?.modify;
  const [hide, setHide] = useRecoilState(bottomBarHideState);

  const [image, setImage] = useState(null);

  useEffect(() => {
    setHide(true);

    return () => {
      setHide(false);
    }
  }, []);

  const pressBack = () => {
    setHide(false);
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container> 
        <View style={{paddingHorizontal:20, paddingTop:20}}>
          <ProgressArea back={()=>setStep(step-1)} step={step} title={setTitle(step)} intro={setIntro(step)} navigation={navigation} press={pressBack}/>
        </View>
        {step===1 ? <ChaGenerationScreenOne modify={modify} onChange={()=>setStep(step+1)} setImage={setImage}/> :
        step===2 ? <ChaGenerationScreenTwo modify={modify} onChange={()=>setStep(step+1)}/> :
        step===3 ? <ChaGenerationScreenThree modify={modify} onChange={()=>setStep(step+1)}/> : 
        <ChaGenerationScreenFour modify={modify} navigation={navigation}/>}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
