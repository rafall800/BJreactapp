import { useState, useEffect, useRef, FC, SVGProps } from 'react';
import { StyledCard } from './Card.styles';
interface CardProps {
  symbol: string;
  number: number;
}

const Card: FC<CardProps> = ({ symbol, number }) => {
  const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (
          await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/cards/${symbol}.svg`)
        ).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [symbol]);

  if (!loading && ImportedIconRef.current) {
    const ImportedIcon = ImportedIconRef.current;
    return (
      <StyledCard number={number}>
        <ImportedIcon />
      </StyledCard>
    );
  }

  return null;
};
export default Card;
