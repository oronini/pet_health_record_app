import RecordCard from '@/components/parts/RecordCard';
import Image from 'next/image';
import { records1, records2, records3 } from '@/lib/data/recored';
import AddRecordDialog from '@/components/parts/AddRecordDialog';

const Home = () => {
  return (
    <div className="contentWrapper mt-6">
      <AddRecordDialog />
      <div className="newRecords mt-8">
        <h2 className="text-h2">最新の記録</h2>
        <ul className="petNamesList flex gap-5 w-full mt-4">
          <li className="petNameItem w-1/3 flex items-center gap-1.5">
            <Image
              src="/images/icons/pawprint_icon_1.svg"
              alt="ペットのアイコン"
              width={20}
              height={20}
            />
            <div className="petName text-base">ペットの名前1</div>
          </li>
          <li className="petNameItem w-1/3 flex items-center gap-1.5">
            <Image
              src="/images/icons/pawprint_icon_1.svg"
              alt="ペットのアイコン"
              width={20}
              height={20}
            />
            <div className="petName text-base">ペットの名前2</div>
          </li>
          <li className="petNameItem w-1/3 flex items-center gap-1.5">
            <Image
              src="/images/icons/pawprint_icon_1.svg"
              alt="ペットのアイコン"
              width={20}
              height={20}
            />
            <div className="petName text-base">ペットの名前3</div>
          </li>
        </ul>
        <ul className="recordsList mt-2 flex gap-5 w-full">
          <li className="recordsItem w-1/3">
            <ul className="recordList flex flex-col gap-4">
              <RecordCard record={records1} />
              <RecordCard record={records2} />
              <RecordCard record={records3} />
            </ul>
          </li>
          <li className="recordsItem w-1/3">
            <ul className="recordList flex flex-col gap-4">
              <RecordCard record={records2} />
              <RecordCard record={records2} />
              <RecordCard record={records2} />
            </ul>
          </li>
          <li className="recordsItem w-1/3">
            <ul className="recordList flex flex-col gap-4">
              <RecordCard record={records3} />
              <RecordCard record={records3} />
              <RecordCard record={records3} />
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
