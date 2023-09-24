import { Button } from '@components/atoms/Button';
import { Dropdown } from '@components/atoms/Dropdown';
import { IconArrowDown } from '@components/atoms/Icon/IconArrow';
import { ButtonIconCamera } from '@components/atoms/Icon/IconCamera';
import { IconEye } from '@components/atoms/Icon/IconEye';
import { IconLock } from '@components/atoms/Icon/IconLock';
import { Input } from '@components/atoms/Input';
import { Menu } from '@components/atoms/Menu';
import { Modal, ModalProps } from '@components/atoms/Modal';
import { Skeleton } from '@components/atoms/Skeleton';
import { Textarea } from '@components/atoms/Textarea';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { UploadFile } from '@components/atoms/UploadFile';
import { convertFileToImage } from '@utils';
import { useMemo, useState } from 'react';

export interface ModalCreateNewGroupProps extends ModalProps {}

export const ModalCreateNewGroup: Atom<ModalCreateNewGroupProps> = ({
  ...props
}) => {
  const { t } = useTranslate();
  const [img, setImg] = useState('');
  const [cover, setCover] = useState('');
  const Visibility = useMemo(
    () => [
      {
        label: t('Public'),
        icon: <IconEye />,
        description: t(`Anyone can see who's in the group and what they post.`),
      },
      {
        label: t('Private'),
        icon: <IconLock />,
        description: t(
          `Only members can see who's in the group and what they post.`,
        ),
      },
    ],
    [t],
  );
  const [visibility, setVisibility] = useState(Visibility[0]);

  return (
    <Modal
      {...props}
      title={t('Create new group')}
      width={500}
      overlayCloseable={false}
      keyboard={false}
    >
      <div className="p-4">
        <UploadFile
          onChange={async ([file]) => setCover(await convertFileToImage(file))}
        >
          <div className="h-[150px] border border-base rounded-lg overflow-hidden">
            {cover ? (
              <img src={cover} />
            ) : (
              <Skeleton className="overflow-hidden object-cover w-full h-full rounded-none" />
            )}
          </div>
        </UploadFile>
        <div className="flex justify-center -mt-7">
          <UploadFile
            onChange={async ([file]) => setImg(await convertFileToImage(file))}
            className="flex flex-col gap-2 items-center justify-center border-[5px] border-slate-900 rounded-full"
          >
            <div className="relative">
              <div className="cursor-pointer rounded-full overflow-hidden border border-base w-20 h-20 relative">
                {img ? (
                  <img src={img} />
                ) : (
                  <Skeleton
                    image
                    className="rounded-full overflow-hidden w-full h-full object-cover"
                  />
                )}
              </div>
              <ButtonIconCamera className="absolute -bottom-2 -right-2" />
            </div>
          </UploadFile>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center mt-4">
            <span className="text-sm">{t('Choose privacy')}</span>
            <Dropdown
              autoClose
              content={
                <Menu
                  onChange={(menu) =>
                    setVisibility(menu as (typeof Visibility)[0])
                  }
                  menus={Visibility}
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
          <Input placeholder={t('Group name')} />
          <Textarea
            className="bg-transparent text-sm h-full border-base border focus:!border-primary outline-none p-2 w-full rounded dark:text-white dark:bg-slate-800 dark:border-slate-700"
            placeholder={t('Description')}
          />
          <div className="mt-4">
            <Button className="w-full" type="primary">
              {t('Create')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
