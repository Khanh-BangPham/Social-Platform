import { Avatar } from '@components/atoms/Avatar';
import { IconImage } from '@components/atoms/Icon/IconImage';
import { IconPoll } from '@components/atoms/Icon/IconPoll';
import { Event } from '@utils/event';

export const NewPost = () => {
  // useEffect(() => {
  //   let event = (newPost: EventHandlerType['CreatePost']) => {
  //     setPost((post: any) => ({
  //       ...post,
  //       ...newPost,
  //       images: [...(post?.images || []), ...(newPost?.images || [])],
  //     }));
  //     setOpen(true);
  //   };
  //   Event.on(EventName.CreatePost, event);

  //   return () => {
  //     Event.off(EventName.CreatePost, event);
  //   };
  // }, []);
  return (
    <>
      <div className="shadow bg-white rounded-lg px-3 py-4 flex gap-4 dark:bg-slate-900">
        <Avatar />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-full overflow-hidden dark:bg-slate-800">
            <input
              className="cursor-pointer dark:hover:bg-white hover:!bg-opacity-10 hover:bg-black bg-transparent outline-none text-sm px-3 leading-8 w-full"
              placeholder="Tell your friends about your thoughts..."
              onFocus={() => Event.emit('CreatePost', {})}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <div
              onClick={() => Event.emit('CreatePost', {})}
              className="whitespace-nowrap flex bg-gray-100 rounded-full text-sm text-gray-900 items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <div className="text-emerald-500">
                <IconImage />
              </div>
              Photo/video
            </div>
            <div
              onClick={() => Event.emit('CreatePost', {})}
              className="whitespace-nowrap flex bg-gray-100 rounded-full text-sm text-gray-900 items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <div className="text-orange-500">
                <IconPoll />
              </div>
              Poll
            </div>
            {/* <div
              onClick={() => setOpen(true)}
              className="whitespace-nowrap flex bg-gray-100 rounded-full text-sm text-gray-900 items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <div className="text-blue-500">
                <IconCalendar />
              </div>
              Schedule
            </div>
            <div
              onClick={() => setOpen(true)}
              className="whitespace-nowrap flex bg-gray-100 rounded-full text-sm text-gray-900 items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <div className="text-red-500">
                <IconVideo />
              </div>
              Live video
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
