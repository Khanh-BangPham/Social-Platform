interface ApiErrorResponse {
  error: string;
  message: string;
}

interface DefaultProps {
  className?: string;
}
interface Atom<T = {}> extends React.FC<T & DefaultProps> {}
