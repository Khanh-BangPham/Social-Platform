import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ButtonIconClose } from "../atoms/Icon/IconClose";
import { Avatar } from "../atoms/Avatar";

export const FloatNotification = () => {
  const [open, setOpen] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    setOpen(true);
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, []);

  return createPortal(
    <motion.div
      className="shadow fixed bottom-3 left-4 rounded-xl p-4 bg-slate-100 dark:bg-slate-700 dark:text-white w-[300px]"
      initial={{ opacity: 0, translateX: "-100%" }}
      transition={{ duration: 0.5, type: "spring" }}
      variants={{
        open: { opacity: 1, translateX: 0 },
        close: { opacity: 0, translateX: "-100%" },
      }}
      animate={open ? "open" : "close"}
      onMouseEnter={() => {
        clearTimeout(timeoutRef.current);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, 3000);
      }}
    >
      <h3 className="text-md font-bold">Thông báo mới</h3>
      <div className="flex gap-2 mt-3">
        <Avatar size={52} />
        <div className="flex-1 text-sm">
          <p>
            <b>Trung tâm đào tạo lập trình spacedev</b>... có 2 bài viết mới
          </p>
          <time className="text-xs text-black dark:text-white !text-opacity-60 mt-1 block">
            30 phút trước
          </time>
        </div>
      </div>
      <ButtonIconClose
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2"
      />
    </motion.div>,
    document.body
  );
};
