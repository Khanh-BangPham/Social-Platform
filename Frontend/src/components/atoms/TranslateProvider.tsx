import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface TranslateContextProps {
  t: (k: string) => string;
  selectLang: (k: string) => void;
  lang: string;
}

export type TranslateList = '';

const TranslateContext = createContext<TranslateContextProps>({
  t: (k) => k,
  selectLang: () => {},
  lang: '',
});

export interface ProviderProps<T> {
  children: any;
  defaultLang: keyof T;
  translate: { [k in keyof T]: { [k: string]: string } };
}

export const TranslateProvider = <T extends any>({
  children,
  defaultLang,
  translate,
}: ProviderProps<T>) => {
  const [lang, selectLang] = useState<keyof T>(defaultLang);

  const t: TranslateContextProps['t'] = useCallback(
    (k: string) => {
      return translate?.[lang]?.[k] || k;
    },
    [translate, lang],
  );

  const value = useMemo<TranslateContextProps>(() => {
    return { t, selectLang, lang } as any;
  }, [t, selectLang, lang]);
  return (
    <TranslateContext.Provider value={value}>
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslate = () => useContext(TranslateContext);
