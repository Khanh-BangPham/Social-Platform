import angryGif from '@assets/icon/angry.gif';
import careGif from '@assets/icon/care.gif';
import hahaGif from '@assets/icon/haha.gif';
import likeGif from '@assets/icon/like.gif';
import loveGif from '@assets/icon/love.gif';
import sadGif from '@assets/icon/sad.gif';
import wowGif from '@assets/icon/wow.gif';
import { Dropdown } from '@components/atoms/Dropdown';
import { FC } from 'react';

export const MessageEmoji: FC<{ children: any }> = ({ children }) => {
  return (
    <Dropdown
      trigger={['hover']}
      placement="bottomRight"
      delay={500}
      content={
        <div className="flex gap-1.5">
          <img
            className="w-8 cursor-pointer hover:scale-125 transition-all"
            src={likeGif}
          />
          <img
            className="w-8 cursor-pointer hover:scale-125 transition-all"
            src={loveGif}
          />
          <img
            className="w-8 cursor-pointer hover:scale-125 transition-all"
            src={careGif}
          />
          <img
            className="w-8 cursor-pointer hover:scale-125 transition-all"
            src={hahaGif}
          />
          <img
            className="w-8 cursor-pointer hover:scale-125 transition-all"
            src={wowGif}
          />
          <img
            className="w-8 cursor-pointer hover:scale-125 transition-all"
            src={sadGif}
          />
          <img
            className="w-8 cursor-pointer hover:scale-125 transition-all"
            src={angryGif}
          />
        </div>
      }
    >
      {children}
    </Dropdown>
  );
};
