import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import LayoutWithNav from '../components/LayoutWithNav';
import { ProfilePic } from '../components/ProfilePic';

import { characterState } from '../features/atoms';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const TopWrap = styled.div<{scrolled: boolean}>`
  position: sticky;
  top: 0;
  transition: 0.5s;

  display: flex;
  justify-content: center;
  
  @media (min-width: 320px) and (max-width: 519px) {
    border-radius: 0 0 15px 15px;
    padding: ${props => props.scrolled ? 16 : 30}px 30px ${props => props.scrolled ? 16 : 20}px 30px;
    ${props => props.scrolled ? `background-color: ${colors.grayscale.white};` : ''}
    ${props => props.scrolled ? `height: 60px;` : ''}
    ${props => props.scrolled ? `span { opacity: 0; transition: 0.5s }` : ''}
  }

  @media (min-width: 520px) {
    padding: 30px 30px 20px 30px;
    background-color: ${colors.grayscale.white};
  }
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 519px) {
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 520px) {
    width: 100%;
    max-width: 500px;
  }
`;

function Title() {
  const [character, setCharacter] = useRecoilState(characterState);
  const [scrollPosition, setScrollPosition] = useState(0);
  const setScroll = useCallback(() => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  },
  []);
  useEffect(() => {
    console.log("a");
    window.addEventListener('scroll', setScroll);
    return () => {
      window.removeEventListener('scroll', setScroll);
    }
  }, [setScroll]);

  const getScrolled = useCallback(() => {
    return scrollPosition > 0;
  }, [scrollPosition]);
  const scrolled = useMemo(() => getScrolled(), [getScrolled]);

  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 519px)"
  });

  if (character.isLogined) {
    return (
      <TopWrap scrolled={scrolled}>
        <TitleWrap>
          <span>
            <Text.Subtitle2B>
              {character.characterName}
            </Text.Subtitle2B>
            <Text.Subtitle2R>
              의<br />피드
            </Text.Subtitle2R>
          </span>
          <ProfilePic
            size={scrolled && isMobile ? 28 : 40}
            image={character.image}
          />
        </TitleWrap>
      </TopWrap>
      )
  }
  else {
    return (
      <TopWrap scrolled={scrolled}>
        <TitleWrap>
          <span>
            <Text.Subtitle2R>
              눈길이 가는
            </Text.Subtitle2R>
            <Text.Subtitle2B>
              <br />피드
            </Text.Subtitle2B>
          </span>
          <ProfilePic
            size={scrolled && isMobile ? 28 : 40}
          />
        </TitleWrap>
      </TopWrap>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Home() {
  const [character, setCharacter] = useRecoilState(characterState);

  useEffect(() => {
    setCharacter({
      isLogined: true,
      characterName: '단호좌현지',
      caption: '나는 나보다 약한 자의 말은 듣지 않는다',
      image: 'https://images.unsplash.com/photo-1626688226927-33257a21236f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80',
    });
  }, [setCharacter]);

  return (
    <Background>
      <Head>
        <title>홈</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutWithNav>
        <Title />
        <p>b</p>
        <p>b</p>
        <p>b</p>
        <p>b</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>b</p>
        <p>b</p>
        <p>b</p>
      </LayoutWithNav>
    </Background>
  )
}
