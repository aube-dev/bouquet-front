import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';

// styles
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

// icons
import Svg from '../../assets/Icon';

// logics
import type { MyCharacter } from '../../utils/types/UserTypes';
import { getImagePickerPermission } from '../../logics/server/Post';

// components
import ConditionButton from '../../components/button/ConditionButton';
import colors from '../../styles/colors';

type CharacterGenerationScreen1Props = {
  isModifying: boolean;
  onPress: () => void;
  newCharacter: MyCharacter;
  setNewCharacter: (param: MyCharacter) => void;
};
/**
 * 캐릭터 이미지 설정하는 화면
 * @param isModifying 수정하는 거니?
 * @param onPress 다음으로 넘어가는 버튼 누를 때 실행되는 함수
 * @param newCharacter 생성/수정할 캐릭터 객체
 * @param setNewCharacter 생성/수정할 캐릭터 객체 set 함수
 * @returns
 */
export default function CharacterGenerationScreen1({
  isModifying,
  onPress,
  newCharacter,
  setNewCharacter,
}: CharacterGenerationScreen1Props): React.ReactElement {
  // 다음 단계 넘어가도 되는지 확인하는 state
  const [IsOK, setIsOK] = useState(false);
  // 이미지 선택하려고 눌렀냐
  // 여러번 누르면 여러번 갤러리가 떠서 방지하기 위해
  const [isSelectImg, setIsSelectImg] = useState(false);

  // 이미지 업로드 할 때 권한이 없다면 일단 권한부터 받는다.
  useEffect(() => {
    (async () => {
      await getImagePickerPermission();
    })();
  }, []);
  // 만약 이미지 사진이 있다면 통과???
  useEffect(() => {
    if (newCharacter.profile_img) setIsOK(true);
  }, [newCharacter]);

  /**
   * 이미지 가져오는 함수
   */
  async function setImage() {
    setIsSelectImg(true);
    const imgResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imgResult.cancelled) {
      setNewCharacter({
        ...newCharacter,
        profile_img: imgResult.uri,
      });
    }
    setIsSelectImg(false);
  }

  return (
    <area.ContainerBlank20>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <TouchableOpacity onPress={() => (isSelectImg ? {} : setImage())}>
          {newCharacter.profile_img ? (
            <elses.CircleImg
              diameter={180}
              source={{ uri: newCharacter.profile_img }}
            />
          ) : (
            <elses.Circle diameter={180} backgroundColor={colors.white}>
              <Svg icon="gallery" size={24} />
            </elses.Circle>
          )}
        </TouchableOpacity>
      </View>
      <area.BottomArea style={{ marginBottom: 16 }}>
        <ConditionButton
          height={44}
          isActive={IsOK}
          onPress={() => (IsOK ? onPress() : undefined)}
          content={
            isModifying ? i18n.t('기본 정보 수정') : i18n.t('기본 정보 입력')
          }
          paddingH={0}
          paddingV={14}
        />
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
