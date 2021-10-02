import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { debounce } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';

// assets
import Svg from '../../../assets/Icon';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import {
  getTopCharacterListAsync,
  getTopPostListAsync,
} from '../../../logics/server/Search';
import useCharacter from '../../../logics/hooks/useCharacter';

// components
import FloatingButton from '../../../components/button/FloatingButton';

// utils
import { AllTemplates, noPost, Post } from '../../../utils/types/PostTypes';
import { CharacterMini, noCharacter } from '../../../utils/types/UserTypes';

// view
import SearchRecentView from './SearchRecentView';
import SearchCharacterView from './SearchCharacterView';
import SearchPostView from './SearchPostView';

const HEADER_MAX_HEIGHT = 95;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SearchScreen(): React.ReactElement {
  // 더미데이터
  const [recentList, setRecentList] = useState<string[]>([]);

  const [myCharacter] = useCharacter();

  // 검색창 눌러진 상태인지 아닌지
  const [isFocus, setIsFocus] = useState(false);
  // 검색어 값 state
  const [searchInput, setSearchInput] = useState('');
  // 인기 게시글 담을 state
  const [postArray, setPostArray] = useState<Post<AllTemplates>[]>([]);
  // 인기 캐릭터 담을 state
  const [characterArray, setCharacterArray] = useState<CharacterMini[]>([]);

  useEffect(() => {
    const getRecentList = async () => {
      const jsonValue = await AsyncStorage.getItem('recentList');
      const result = jsonValue != null ? JSON.parse(jsonValue) : null;
      setRecentList(result);
      return result;
    };
    getRecentList();
  }, []);

  /**
   * 검색어에 따른 뷰 전환
   * @param searchText 입력된 검색어
   */
  async function getSearch(searchText: string) {
    if (searchText.length < 1) {
      await getCharacter();
      await getPost();
    } else {
      setCharacterArray([noCharacter]);
      setPostArray([noPost]);
    }
  }

  /**
   * async storage
   */
  const storeRecentList = async (value: string[]) => {
    setRecentList(value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('recentList', jsonValue);
  };
  /**
   * debounce
   */
  const debounceHandler = useCallback(
    debounce((input) => getSearch(input), 500),
    [],
  );
  const debounceRecentSearchHandler = useCallback(
    debounce((input) => {
      if (input.length !== 0) {
        let tmpArray = recentList;
        tmpArray.unshift(input);
        tmpArray = tmpArray.filter(
          (item, index) => tmpArray.indexOf(item) === index,
        );
        storeRecentList(tmpArray);
        console.log(recentList);
      }
    }, 2000),
    [],
  );
  /**
   * 검색어가 입력될 때마다 onChangeText에 의해 실행될 함수
   * @param searchText 입력된 검색어
   */
  const setSearchResult = (searchText: string) => {
    setSearchInput(searchText);
    debounceHandler(searchText);
    debounceRecentSearchHandler(searchText);
  };

  /**
   * 인기 캐릭터를 가져오는 함수
   */
  async function getCharacter() {
    const serverResult = await getTopCharacterListAsync();
    if (serverResult.isSuccess) {
      setCharacterArray(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }
  /**
   * 인기 게시글을 가져오는 함수
   */
  async function getPost() {
    const serverResult = await getTopPostListAsync(
      1,
      myCharacter.id ? myCharacter.id : undefined,
    );
    if (serverResult.isSuccess) {
      setPostArray(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }
  // 가장 처음에 인기 캐릭터 및 게시물 가져옴
  useEffect(() => {
    getCharacter();
    getPost();
  }, []);

  /**
   * animation 관련 변수
   * scroll - animation 변수
   * OpacityHeader - 헤더 투명도가 달라진다.
   * TranslateInput - 검색창 이동 정도
   * ColorInput - 검색창 색 변화
   * searchColor - ColorInput을 담는 변수
   */
  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  const TranslateInput = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -18],
    extrapolate: 'clamp',
  });
  const ColorInput = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [colors.white, colors.gray0],
    extrapolate: 'clamp',
  });
  const searchColor = {
    backgroundColor: ColorInput,
  };

  const viewArray = [
    <SearchRecentView
      searchInput={searchInput}
      setSearchResult={setSearchResult}
      recentList={recentList}
      setRecentList={storeRecentList}
    />,
    <SearchCharacterView
      searchInput={searchInput}
      characterArray={characterArray}
    />,
    <SearchPostView searchInput={searchInput} postArray={postArray} />,
  ];

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />

      <View style={{ marginTop: 30, marginHorizontal: 30 }}>
        <SearchArea
          style={[
            {},
            searchColor,
            { transform: [{ translateY: TranslateInput }] },
          ]}
        >
          <View style={{ marginLeft: 18, marginRight: 10 }}>
            {isFocus || searchInput.length > 0 ? (
              <Svg icon="searchViewFocus" size={15} />
            ) : (
              <Svg icon="searchView" size={15} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder={i18n.t('무엇이 궁금한가요')}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChangeText={(textInput: string) => setSearchResult(textInput)}
              value={searchInput}
            />
          </View>
        </SearchArea>
      </View>

      <View style={{ paddingBottom: 30 + 12 }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.FlatList
          style={{
            marginTop: HEADER_MIN_HEIGHT - 30,
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: false },
          )}
          data={viewArray}
          renderItem={(obj) => obj.item}
        />
      </TouchableWithoutFeedback>

      {myCharacter.id === -1 ? null : (
        <FloatingButton routePrefix="SearchTab" />
      )}
    </area.Container>
  );
}

// 0을 해주니까 상태바 길이만큼 위치가 내려간다!
const SearchArea = styled(Animated.View)`
  height: 40;
  padding-vertical: 10;
  background-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  border-radius: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const AnimationHeader = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${colors.white};
  overflow: hidden;
  height: ${HEADER_MIN_HEIGHT + StatusBarHeight};
  border-radius: 15;
`;
