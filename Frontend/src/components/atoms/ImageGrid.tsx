import { cn } from '@utils';

export interface ImageGridProps {
  images: string[];
}

const upload1ImageClass = 'h-[500px] [&>*:nth-child(1)]:inset-[calc(0%_+_0px)]';
const upload2ImageClass =
  'h-[466px] [&>*:nth-child(1)]:inset-[calc(0%_+_0px)_calc(50%_+_1.01px)_calc(0%_+_0px)_calc(0%_+_0px)] [&>*:nth-child(2)]:inset-[calc(0%_+_0px)_calc(0%_+_0px)_calc(0%_+_0px)_calc(50%_+_1.01px)]';
const upload3ImageClass =
  'h-[466px] [&>*:nth-child(1)]:inset-[calc(0%_+_0px)_calc(33.3333%_+_1.01px)_calc(0%_+_0px)_calc(0%_+_0px)] [&>*:nth-child(2)]:inset-[calc(0%_+_0px)_calc(0%_+_0px)_calc(50%_+_1.01px)_calc(66.6667%_+_1.01px)] [&>*:nth-child(3)]:inset-[calc(50%_+_1.01px)_calc(0%_+_0px)_calc(0%_+_0px)_calc(66.6667%_+_1.01px)]';
const upload4ImageClass =
  'h-[466px] [&>*:nth-child(1)]:inset-[calc(0%_+_0px)_calc(33.3333%_+_1.01px)_calc(0%_+_0px)_calc(0%_+_0px)] [&>*:nth-child(2)]:inset-[calc(0%_+_0px)_calc(0%_+_0px)_calc(66.6667%_+_1.01px)_calc(66.6667%_+_1.01px)] [&>*:nth-child(3)]:inset-[calc(33.3333%_+_1.01px)_calc(0%_+_0px)_calc(33.3333%_+_1.01px)_calc(66.6667%_+_1.01px)]  [&>*:nth-child(4)]:inset-[calc(66.6667%_+_1.01px)_calc(0%_+_0px)_calc(0%_+_0px)_calc(66.6667%_+_1.01px)]';
const upload5ImageClass =
  'h-[400px] [&>*:nth-child(1)]:inset-[calc(0%_+_0px)_calc(50%_+_1.01px)_calc(40%_+_1.01px)_calc(0%_+_0px)] [&>*:nth-child(2)]:inset-[calc(0%_+_0px)_calc(0%_+_0px)_calc(40%_+_1.01px)_calc(50%_+_1.01px)] [&>*:nth-child(3)]:inset-[calc(60%_+_1.01px)_calc(66.6667%_+_1.01px)_calc(0%_+_0px)_calc(0%_+_0px)] [&>*:nth-child(4)]:inset-[calc(60%_+_1.01px)_calc(33.3333%_+_1.01px)_calc(0%_+_0px)] [&>*:nth-child(5)]:inset-[calc(60%_+_1.01px)_calc(0%_+_0px)_calc(0%_+_0px)_calc(66.6667%_+_1.01px)]';

let map = {
  1: upload1ImageClass,
  2: upload2ImageClass,
  3: upload3ImageClass,
  4: upload4ImageClass,
  5: upload5ImageClass,
};

export const ImageGrid: Atom<ImageGridProps> = ({ images, ...props }) => {
  let _images = images.slice(0, 5);

  let classIndex = images.length <= 5 ? images.length : 5;

  return (
    <div className={cn('relative', props.className, (map as any)[classIndex])}>
      {_images.map((e, i) => (
        <div className="absolute overflow-hiddens" key={e}>
          <img className="w-full h-full object-cover" src={e} />
          {images.length > 5 && i === 4 && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white flex text-4xl items-center justify-center font-semibold">
              + {images.length - _images.length + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
