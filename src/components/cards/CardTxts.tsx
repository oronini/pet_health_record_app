import Image from 'next/image';
import { CardTxtsType } from '@/lib/types/records';

const CardTxts = ({ txt, alt, src }: CardTxtsType) => {
  return (
    <div className="flex gap-1">
      <Image
        src={src}
        alt={alt}
        width={14}
        height={14}
        className="w-auto h-auto"
      />
      <p>{txt}</p>
    </div>
  );
};

export default CardTxts;
