import { FC, SVGProps, useEffect, useRef, useState } from 'react';

export const useDynamicSVGImport = (symbol: string) => {
  const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (await import(`../../assets/cards/${symbol}.svg`)).ReactComponent;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [symbol]);
  return { loading, SvgIcon: ImportedIconRef.current };
};
