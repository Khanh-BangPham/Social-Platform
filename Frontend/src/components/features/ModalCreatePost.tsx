import { Avatar } from '@components/atoms/Avatar';
import { Button } from '@components/atoms/Button';
import { DropFile } from '@components/atoms/DropFile';
import { Dropdown } from '@components/atoms/Dropdown';
import { IconArrowDown } from '@components/atoms/Icon/IconArrow';
import { IconEye } from '@components/atoms/Icon/IconEye';
import { IconHacker } from '@components/atoms/Icon/IconHacker';
import { ButtonIconImage } from '@components/atoms/Icon/IconImage';
import { IconLock } from '@components/atoms/Icon/IconLock';
import { IconUser } from '@components/atoms/Icon/IconUser';
import { ImageGrid } from '@components/atoms/ImageGrid';
import { Menu } from '@components/atoms/Menu';
import { Modal, ModalProps } from '@components/atoms/Modal';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { UploadFile, UploadfileRef } from '@components/atoms/UploadFile';
import { Event } from '@utils/event';
import { IPost, mockUploadImage } from '@utils/mock';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

export interface ModalCreatePostProps extends ModalProps {
  post?: Partial<IPost>;
}

export const ModalCreatePost: FC<ModalCreatePostProps> = ({
  post,
  ...props
}) => {
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const uploadfileRef = useRef<UploadfileRef>(null);
  const [value, setValue] = useState('');
  const PostVisibility = useMemo(
    () => [
      { label: t('Public'), icon: <IconEye /> },
      { label: t('Just me only'), icon: <IconLock /> },
      { label: t('My friends only'), icon: <IconUser /> },
      { label: t('Anonymous'), icon: <IconHacker /> },
    ],
    [t],
  );

  const [visibility, setVisibility] = useState(PostVisibility[0]);
  useEffect(() => {
    if (post?.images) {
      setImages(post.images.map((e) => e.original) || []);
    }
  }, [post]);
  useEffect(() => {
    if (props.open) {
      inputRef.current?.focus();
    }
  }, [props.open]);

  useEffect(() => {
    const onCreatePost = (post: Partial<any>): void => {
      if (post?.images) {
        setImages([...images, ...post.images]);
      }
      setOpen(true);
    };
    Event.on('CreatePost', onCreatePost);
    return () => {
      Event.off('CreatePost', onCreatePost);
    };
  }, [images]);

  const disableBtn = !value && images.length === 0;
  return (
    <Modal
      {...props}
      open={open}
      onCancel={() => setOpen(false)}
      title={t('Create articles')}
      className="min-h-[500px]"
      keyboard={false}
      overlayCloseable={false}
    >
      <div className="p-3 flex flex-col flex-1">
        <div className="flex gap-3">
          <Avatar size={40} />
          <div className="flex-1">
            <h3 className="font-bold">Charles Schwartz</h3>
            <Dropdown
              getPopupContainer={(parentNode) => parentNode}
              autoClose
              content={
                <Menu
                  onChange={(menu) =>
                    setVisibility(menu as (typeof PostVisibility)[0])
                  }
                  menus={PostVisibility}
                />
              }
            >
              <Button
                iconPrefix={visibility.icon}
                iconSuffix={<IconArrowDown />}
                size="small"
                className="flex items-center"
              >
                {visibility.label}
              </Button>
            </Dropdown>
          </div>
          <div>
            <Button>{t('Write content with AI')}</Button>
          </div>
        </div>
        <DropFile
          className="flex-1"
          backdropClassName="bg-transparent"
          includes={{
            files: async (files) => {
              uploadfileRef.current?.trigger(files);
            },
          }}
        >
          <div className="max-h-[500px] overflow-auto ">
            <div
              ref={inputRef}
              placeholder={t(
                'What do you want to say to the people you care about?..',
              )}
              className="block overflow-hidden stext-xl mb-2 bg-transparent outline-none w-full resize-none dark:after:text-white after:text-black after:!text-opacity-60 mt-3 after:empty:content-[attr(placeholder)] after:absolute after:-translate-y-1/2 after:top-1/2 relative"
              spellCheck={false}
              // onChange={(ev) => setValue(ev.target.value)}
              contentEditable
              onInput={(ev) => {
                if (!ev.currentTarget.innerText.trim()) {
                  ev.currentTarget.innerHTML = '';
                }
                setValue(ev.currentTarget.innerHTML);
              }}
            ></div>
            <ImageGrid
              imgClassName="object-contain"
              images={images}
              onRemove={setImages}
            />
          </div>
        </DropFile>
        <div className="flex gap-2 px-2 items-center mt-2 mb-2">
          <p className="text-sm">{t('Add content to the article?')}</p>
          <UploadFile
            onChange={async (files) => {
              const imgs: string[] = [];

              for (const i in files) {
                const imgSrc = await mockUploadImage(files[i]);
                imgs.push(imgSrc.path);
              }
              setImages([...images, ...imgs]);
            }}
            ref={uploadfileRef}
          >
            <ButtonIconImage />
          </UploadFile>
        </div>
        <div>
          <Button
            className="w-full"
            disabled={disableBtn}
            type={!disableBtn ? 'primary' : 'default'}
            loading
          >
            {t('Create articles')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
