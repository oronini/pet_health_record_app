import {
  Card,
  CardContent,
  CardTimes,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { RecordType } from '@/lib/types/records';
import CardTxts from './CardTxts';

const RecordCard = ({ record }: { record: RecordType }) => {
  return (
    <li>
      <Card>
        <CardHeader>
          <div className="flex gap-2 justify-between flex-wrap">
            <CardTitle>{record.action}</CardTitle>
            <CardTimes>
              <Image
                src="/images/icons/clock_icon.svg"
                alt="時計アイコン"
                width={14}
                height={14}
              />
              {record.datetime}
            </CardTimes>
          </div>
        </CardHeader>
        <CardContent>
          {record.status ? (
            <CardTxts
              txt={`状態：${record.status}`}
              alt="状態アイコン"
              src="/images/icons/ECG_icon.svg"
            />
          ) : (
            ''
          )}
          {record.amount ? (
            <CardTxts
              txt={`量：${record.amount}`}
              alt="体重アイコン"
              src="/images/icons/weight_icon.svg"
            />
          ) : (
            ''
          )}
          {record.note ? (
            <CardTxts
              txt={`備考：${record.note}`}
              alt="備考アイコン"
              src="/images/icons/note_icon.svg"
            />
          ) : (
            ''
          )}
        </CardContent>
      </Card>
    </li>
  );
};

export default RecordCard;
