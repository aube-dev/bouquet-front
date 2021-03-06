import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';

import LayoutWithNav from '../components/LayoutWithNav';
import ProfileMini from '../components/ProfileMini';
import SearchInput from '../components/SearchInput';
import EpisodeMini from '../components/EpisodeMini';
import Icon from '../components/Icons';
import PostMini from '../components/PostMini';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const RecentTagWrap = styled.div`
  height: 28px;
  background-color: ${colors.grayscale.white};
  padding: 2px 2px 2px 10px;
  border-radius: 10px;

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto 24px;
  align-items: center;
`;

const TagText = styled(Text.Caption)`
  white-space: nowrap;
`;

type RecentTagProps = {
  content: string;
}

function RecentTag({ content }: RecentTagProps) {
  return (
    <RecentTagWrap>
      <TagText>
        {content}
      </TagText>
      <Icon name="X" width={24} height={24} />
    </RecentTagWrap>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 40px;
  padding-top: 10px;
  justify-items: start;
`;

const TabWrap = styled.div`
`;

const PostTabWrap = styled.div`
  margin-top: 40px;
`;

const HorizontalWrap = styled.div<{gap: number}>`
  margin-top: 12px;
  display: grid;
  grid-auto-flow: column;
  gap: ${props => props.gap}px;
`;

const VerticalWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

type HorizontalProps = {
  gap: number;
  wrap: React.MutableRefObject<any>;
  children: React.ReactNode;
}

function Horizontal({ gap, wrap, children }: HorizontalProps) {
  const [wrapWidth, setWrapWidth] = useState(0);
  const [insideWidth, setInsideWidth] = useState(0);

  const x = useMotionValue(0);
  const inside = useRef(null);

  useEffect(() => {
    // TODO: inside의 width가 변할 때도 setWidth가 작동해야 함
    const setWidth = () => {
      setWrapWidth(wrap.current.offsetWidth);
      setInsideWidth(inside.current.offsetWidth);
    }
    setWidth();
    window.addEventListener('resize', setWidth);
    
    return () => {
      window.removeEventListener('resize', setWidth);
    }
  }, [wrap, inside]);

  return (
    <motion.div
      drag="x"
      style={{x}}
      dragConstraints={{
        left: insideWidth > wrapWidth ? wrapWidth - insideWidth : wrapWidth,
        right: 0
      }}
    >
      <HorizontalWrap
        gap={gap}
        ref={inside}
      >
        {children}
      </HorizontalWrap>
    </motion.div>
    
  )
}

export default function Search() {
  const [scrolled, setScrolled] = useState(false);
  const wrap = useRef(null);

  const exampleCharacter = {
    isLogined: true,
    characterName: '단호좌현지',
    caption: '나는 나보다 약한 자의 말은 듣지 않는다',
    image: 'https://images.unsplash.com/photo-1626688226927-33257a21236f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80',
  };

  return (
    <Background>
      <Head>
        <title>홈</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutWithNav
        setScrolled={setScrolled}
        topElement={<SearchInput scrolled={scrolled} />}
      >
        <Wrap ref={wrap}>
          <TabWrap>
            <Text.Subtitle3>최근 검색어</Text.Subtitle3>
            <Horizontal gap={4} wrap={wrap} >
              <RecentTag content="asdf" />
              <RecentTag content="asdf" />
              <RecentTag content="asdasdfadsfasdff" />
              <RecentTag content="asdfasdfsadfsadfsafa" />
              <RecentTag content="asdfasfdasdfasdfasdfafs" />
              <RecentTag content="asdf" />
              <RecentTag content="asdf" />
              <RecentTag content="asdf" />
              <RecentTag content="asdf" />
              <RecentTag content="asdf" />
              <RecentTag content="asdf" />
              <RecentTag content="asdf" />
            </Horizontal>
          </TabWrap>
          <TabWrap>
            <Text.Subtitle3>인기 부캐</Text.Subtitle3>
            <Horizontal gap={10} wrap={wrap} >
              <ProfileMini varient="vertical" />
              <ProfileMini varient="vertical" />
              <ProfileMini varient="vertical" />
              <ProfileMini varient="vertical" />
              <ProfileMini varient="vertical" />
              <ProfileMini varient="vertical" />
            </Horizontal>
          </TabWrap>
          <TabWrap>
            <Text.Subtitle3>인기 에피소드</Text.Subtitle3>
            <Horizontal gap={10} wrap={wrap} >
              <EpisodeMini varient="vertical" />
              <EpisodeMini varient="vertical" />
              <EpisodeMini varient="vertical" />
              <EpisodeMini varient="vertical" />
              <EpisodeMini varient="vertical" />
              <EpisodeMini varient="vertical" />
            </Horizontal>
          </TabWrap>
        </Wrap>
        <PostTabWrap>
            <Text.Subtitle3>인기 게시물</Text.Subtitle3>
            <VerticalWrap>
              <PostMini character={exampleCharacter} text="Lorem ipsum dolor sit amet" sunshine={2500} />
              <PostMini character={exampleCharacter} text="Lorem ipsum dolor sit amet" sunshine={2500} />
              <PostMini character={exampleCharacter} text="Lorem ipsum dolor sit amet" sunshine={2500} />
              <PostMini character={exampleCharacter} text="Lorem ipsum dolor sit amet" sunshine={2500} />
              <PostMini character={exampleCharacter} text="Lorem ipsum dolor sit amet" sunshine={2500} />
              <PostMini character={exampleCharacter} text="Lorem ipsum dolor sit amet" sunshine={2500} />
            </VerticalWrap>
          </PostTabWrap>
      </LayoutWithNav>
    </Background>
  )
}