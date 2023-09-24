import { Button } from '@components/atoms/Button';
import { Card } from '@components/atoms/Card';
import { Dropdown } from '@components/atoms/Dropdown';
import { IconNotification } from '@components/atoms/Icon/IconNotification';
import { IconPlus } from '@components/atoms/Icon/IconPlus';
import { ButtonIconThreeDotAction } from '@components/atoms/Icon/IconThreeDotAction';
import { Menu } from '@components/atoms/Menu';
import { Tag } from '@components/atoms/Tag';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { useState } from 'react';
import { ModalCreateNewGroup } from './Group/ModalCreateGroup';

export const CardGroup = () => {
  const { t } = useTranslate();
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  return (
    <>
      <ModalCreateNewGroup
        open={openCreateGroup}
        onCancel={() => setOpenCreateGroup(false)}
      />
      <Card
        title={t('The group is participating')}
        className="pb-6"
        action={
          <Dropdown
            placement="bottomRight"
            autoClose
            content={
              <Menu
                menus={[
                  {
                    label: t('Manage notifications'),
                    icon: <IconNotification />,
                  },
                  {
                    className: '!bg-transparent',
                    label: (
                      <Button
                        iconPrefix={<IconPlus />}
                        className="w-[200px] mt-2"
                        type="primary"
                        onClick={() => setOpenCreateGroup(true)}
                      >
                        {t('Create a new group')}
                      </Button>
                    ),
                  },
                ]}
              />
            }
          >
            <ButtonIconThreeDotAction transparent />
          </Dropdown>
        }
      >
        <div className="flex gap-2 mt-4 flex-wrap">
          <Tag>#Product</Tag>
          <Tag>#Website</Tag>
          <Tag>#Spacedev.vn</Tag>
          <Tag>#Reactjs</Tag>
          <Tag>#Nodejs</Tag>
          <Tag>#PHP</Tag>
          <Tag>#AWS</Tag>
          <Tag>#Python</Tag>
          <Tag>#Go</Tag>
          <Tag>#Product</Tag>
          <Tag>#Website</Tag>
          <Tag>#Spacedev.vn</Tag>
          <Tag>#Reactjs</Tag>
          <Tag>#Nodejs</Tag>
          <Tag>#PHP</Tag>
          <Tag>#AWS</Tag>
          <Tag>#Python</Tag>
        </div>
        {/* <div className="mt-3 gap-3 grid grid-cols-3 flex-wrap">
      <a href="#" className="">
        <div className="rounded-lg flex-1 overflow-hidden aspect-square">
          <img
            className="object-cover w-full h-full"
            src={`https://unsplash.it/150/150?t=${Math.random()}`}
          />
        </div>
        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
          Ronald Peters
        </p>
      </a>
    </div> */}
      </Card>
    </>
  );
};
