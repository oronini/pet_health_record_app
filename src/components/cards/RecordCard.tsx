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

const RecordCard = ({
  record,
  recordList,
}: {
  record: RecordType;
  recordList?: boolean;
}) => {
  return (
    <Card className={recordList ? 'gap-0' : 'gap-4'}>
      <CardHeader>
        <div className="flex justify-between flex-wrap gap-2">
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
        {recordList ? (
          <div className="flex justify-end gap-5 mt-2">
            <button className="flex items-center gap-1">
              <Image
                src="/images/icons/edit_icon.svg"
                alt="編集"
                width={18}
                height={18}
              />
              編集
            </button>
            <button className="flex items-center gap-1">
              <Image
                src="/images/icons/delete_icon.svg"
                alt="削除"
                width={18}
                height={18}
              />
              削除
            </button>
          </div>
        ) : (
          ''
        )}
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
  );
};

export default RecordCard;
