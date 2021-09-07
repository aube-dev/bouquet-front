import { useRecoilState } from 'recoil';

// logics
import { viewPostState } from '../atoms';
import { getPostAsync } from '../server/Post';
import useCharacter from './useCharacter';

// utils
import { Post, AllTemplates } from '../../utils/types/PostTypes';

/**
 * Post Detail에 띄울 게시글 정보를 불러오는 custom hook
 * @returns [viewPost, setViewPost]
 */
export default function useViewPost(): [
  Post<AllTemplates> | undefined,
  (postId: number) => Promise<void>,
] {
  const [viewPost, setViewPost] = useRecoilState(viewPostState);
  const [character] = useCharacter();

  async function setViewPostById(postId: number): Promise<void> {
    const result = await getPostAsync(
      postId,
      character ? character.id : undefined,
    );
    if (result.isSuccess) {
      setViewPost(result.result);
    }
  }

  return [viewPost, setViewPostById];
}
