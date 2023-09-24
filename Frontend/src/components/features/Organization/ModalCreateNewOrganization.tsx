import { Button } from '@components/atoms/Button';
import { ButtonIconCamera } from '@components/atoms/Icon/IconCamera';
import { Input } from '@components/atoms/Input';
import { Modal, ModalProps } from '@components/atoms/Modal';
import { Skeleton } from '@components/atoms/Skeleton';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { UploadFile } from '@components/atoms/UploadFile';
import { convertFileToImage } from '@utils';
import { useState } from 'react';

export interface ModalCreateNewOrganizationProps extends ModalProps {}

export const ModalCreateNewOrganization: Atom<
  ModalCreateNewOrganizationProps
> = ({ ...props }) => {
  const { t } = useTranslate();
  const [img, setImg] = useState('');
  return (
    <Modal
      {...props}
      title={t('Create new organization')}
      width={500}
      overlayCloseable={false}
      keyboard={false}
    >
      <div className="p-4">
        <div className="flex justify-center">
          <UploadFile
            onChange={async ([file]) => setImg(await convertFileToImage(file))}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <b>{t('Icon')}</b>
            <div className="relative">
              <div className="cursor-pointer rounded-full overflow-hidden border border-base w-20 h-20 relative">
                {img ? (
                  <img src={img} />
                ) : (
                  <Skeleton
                    image
                    className="!rounded-full overflow-hidden w-full h-full object-cover"
                  />
                )}
              </div>
              <ButtonIconCamera className="absolute -bottom-2 -right-2" />
            </div>
          </UploadFile>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            label={t('Organization name')}
            placeholder={t('Organization name')}
            maxLength={20}
          />
          <Input
            label={t('Description')}
            placeholder={t('Description')}
            maxLength={50}
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
