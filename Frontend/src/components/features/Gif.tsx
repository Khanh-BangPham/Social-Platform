import { ContextMenu } from '@components/atoms/ContextMenu';
import { setDropFileData } from '@components/atoms/DropFile';
import { IconHeart } from '@components/atoms/Icon/IconHeart';
import { InfinityLoading } from '@components/atoms/InfinityLoading';
import { Input } from '@components/atoms/Input';
import { Menu } from '@components/atoms/Menu';
import { Tag, TagProps } from '@components/atoms/Tag';
import { useDebounce } from '@hooks/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import _ from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { Popover } from '../atoms/Popover';

export interface GifProps {
  children?: any;
  placement?: 'bottom' | 'top';
  onSelect?: (value: string, control: { close: () => void }) => void;
}

const getRandomGif = (q: string, offset = 0) =>
  axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=6NDG2hBns5T88WJfT7QBjEAIWxePgwy8&q=${q}&limit=20&offset=${offset}&rating=pg-13&lang=en&bundle=messaging_non_clips`,
  );

export const Gif: Atom<GifProps> = ({ children, onSelect }) => {
  const [tag, setTag] = useState('memo');
  const [value, setValue, currentValue, setCurrentValue] = useDebounce('', 500);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  let {
    data = {} as any,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['meme', tag, value],
    cacheTime: Infinity,
    keepPreviousData: true,
    queryFn: async ({ pageParam = 0 }) => {
      let res = await getRandomGif(currentValue || tag, pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.offset + 20;
    },
  });
  let { pages = {} } = data;
  let _data = _.reduce<any, any[]>(
    pages,
    (cum, cur) => [...cum, ...cur.data],
    [],
  );

  const registerTag = (tagName: string) => {
    return {
      color: currentValue === '' && tag === tagName ? 'primary' : undefined,
      onClick: () => {
        wrapRef.current?.scrollTo({ top: 0 });
        setCurrentValue('');
        setTag(tagName);
      },
    } as unknown as TagProps;
  };

  const close = useCallback(() => setOpen(false), []);
  return (
    <Popover
      open={open}
      onCancel={() => setOpen(false)}
      width={350}
      height={500}
      content={
        <div className="flex gap-2 flex-col overflow-auto">
          <Input
            value={currentValue}
            onClick={(ev) => ev.stopPropagation()}
            onChange={(ev) => {
              ev.preventDefault();
              setCurrentValue(ev.currentTarget.value);
              setValue(ev.currentTarget.value);
            }}
            className="h-8 text-sm"
            placeholder="Tìm kiếm ảnh gif"
          />
          <div className="flex gap-2 whitespace-nowrap overflow-auto pb-2">
            <Tag onClick={(ev) => ev.preventDefault()}>Yêu thích</Tag>
            <Tag {...registerTag('memo')}>Meme</Tag>
            <Tag {...registerTag('people')}>Con người</Tag>
            <Tag {...registerTag('animal')}>Động vật</Tag>
            <Tag {...registerTag('tree')}>Cây cối</Tag>
            <Tag {...registerTag('phenomena')}>Hiện tượng</Tag>
          </div>
          <InfinityLoading
            ref={wrapRef}
            loading={isFetching}
            onNext={fetchNextPage}
            haveNext={hasNextPage}
            className=" overflow-auto flex-1"
          >
            <div className="grid-cols-2 grid gap-2">
              {_data?.map((e: any) => (
                <ContextMenu
                  key={e.id}
                  content={
                    <Menu
                      menus={[
                        { label: 'Lưu vào yêu thích', icon: <IconHeart /> },
                      ]}
                    />
                  }
                >
                  <div
                    className="cursor-pointer border-base border rounded-lg overflow-hidden h-[150px]"
                    onClick={() => onSelect?.(e.images.original.url, { close })}
                  >
                    <img
                      onDragStart={(ev) =>
                        setDropFileData(ev, 'img', e.images.original.url)
                      }
                      className="w-full h-full object-cover "
                      src={e.images.fixed_width_downsampled.url}
                    />
                  </div>
                </ContextMenu>
              ))}
            </div>
          </InfinityLoading>
        </div>
      }
    >
      <div onClick={() => setOpen(!open)}>{children}</div>
    </Popover>
  );
};
