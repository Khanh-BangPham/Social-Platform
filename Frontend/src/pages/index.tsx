import { InfinityLoading } from '@components/atoms/InfinityLoading';
import { Sticky } from '@components/atoms/Sticky';
import { CardGroup } from '@components/features/CardGroup';
import { useTitle } from '@hooks/useTitle';
import { fakeApi, mockPosts } from '@utils/mock';
import { useEffect, useState } from 'react';
import { Button } from '../components/atoms/Button';
import { useAuth } from '../components/features//AuthProvider';
import { GeneralInfo } from '../components/features//GeneralInfo';
import { Message } from '../components/features//Message';
import { NewPost } from '../components/features//NewPost';
import { Post, PostLoading } from '../components/features//Post';
import { Story } from '../components/features//Story';
import { SuggestedForYou } from '../components/features//SuggestedForYou';
import { LOGIN_MODAL, setGlobalState } from '../store/queryClient';

export const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(() => mockPosts(3));
  const [loading, setLoading] = useState(false);
  useTitle('Spacedev facinsrule');

  useEffect(() => {
    const event = () => {
      const offset =
        document.body.scrollHeight - window.scrollY - window.innerHeight;
      if (offset < 200) {
        setLoading(true);
        fakeApi(() => mockPosts(5)).then((res) => {
          setPosts([...posts, ...res]);
          setLoading(false);
        });
      }
    };
    window.addEventListener('scroll', event);
    return () => {
      window.removeEventListener('scroll', event);
    };
  }, [posts]);

  return (
    <div className="px-4 flex w-full gap-4 mt-4">
      <div className="w-sidebar">
        <div className="relative h-full">
          <Sticky top={66} bottom={16}>
            <div className="flex gap-4 flex-col ">
              {user ? (
                <>
                  <SuggestedForYou />
                  <CardGroup />
                  {/* <Activity /> */}
                </>
              ) : (
                <>
                  <div className="px-2">
                    <p className="text-sm">
                      Đăng nhập để thực hiện các hành động như like, comment,
                      chia sẻ,...
                    </p>
                    <Button
                      size="large"
                      type="red"
                      className="w-full mt-3"
                      onClick={() => setGlobalState(LOGIN_MODAL, true)}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </>
              )}
              <GeneralInfo />
            </div>
          </Sticky>
        </div>
      </div>
      <div className="flex-1 w-1 pb-4 ">
        <div className="max-w-main-content mx-auto flex flex-col gap-4">
          {user && (
            <>
              <Story />
              <NewPost />
            </>
          )}

          <InfinityLoading
            loading={loading}
            loadingRender={<PostLoading />}
            haveNext
            className="flex flex-col gap-4"
          >
            {posts.map((_, i) => (
              <Post key={i} />
            ))}
          </InfinityLoading>
        </div>
      </div>
      <div className="w-sidebar flex gap-4 flex-col sticky self-end bottom-16">
        {user && <Message />}
      </div>
    </div>
  );
};
