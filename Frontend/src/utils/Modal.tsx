import ReactDOM from "react-dom/client";
import { Popconfirm } from "@components/features/Popconfirm";

const container = document.createElement("div");
document.body.appendChild(container);

export const Modal = {
  confirm: (props: {
    title?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }) => {
    const ui = ReactDOM.createRoot(container);
    ui.render(
      <Popconfirm
        title={props.title}
        onOk={() => {
          props.onOk?.();
          ui.unmount();
        }}
        onCancel={() => {
          props.onCancel?.();
          ui.unmount();
        }}
      />
    );
  },
};
