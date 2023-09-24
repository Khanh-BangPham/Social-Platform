interface ApiErrorResponse {
  error: string;
  message: string;
}

interface DefaultProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}
type Atom<T = {}> = React.FC<T & DefaultProps>;

interface DropFileType {
  img: string;
  post: {
    id: string;
    url: {
      link: string;
      title: string;
      image: string;
    };
    content: string;
    user: string;
  };
  text: string;
  files: File[];
  url: string;
}

interface EventHandlerType {
  CreatePost: Partial<any>;
  CloseContextMenu: any;
  OpenModalImage: any;
}
