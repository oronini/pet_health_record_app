'use client';

import RecordCard from '@/components/cards/RecordCard';
import Image from 'next/image';
import AddRecordDialog from '@/components/forms/AddRecordDialog';
import { AddRecordType } from '@/lib/types/records';
import { usePetsContext } from '@/context/petsContext';
import { useRecordContext } from '@/context/recordContext';

const Home = () => {
  const { petsData } = usePetsContext();
  const { recordData, setRecordData } = useRecordContext();

  const newRecords = petsData.map((pet) => ({
    petId: pet.petId,
    petName: pet.petName,
    records: recordData.filter((record) => record.petId === pet.petId),
  }));

  const handleAddRecord = (newRecord: AddRecordType) => {
    const now = new Date();
    setRecordData((prevRecordData) => [
      ...prevRecordData,
      {
        recordId: now.getTime(),
        petId: petsData[0].petId,
        datetime: newRecord.datetime,
        action: newRecord.action,
        status: newRecord.status || '',
        amount: newRecord.amount || '',
        note: newRecord.note || '',
      },
    ]);
  };

  return (
    <div className="contentWrapper mt-6">
      <AddRecordDialog onSubmit={handleAddRecord} />
      <div className="newRecords mt-8">
        <h2 className="text-h2">最新の記録</h2>
        <ul className="petNamesList flex gap-5 w-full mt-4">
          {newRecords.map((record) => (
            <li
              key={record.petId}
              className={`petNameItem ${
                newRecords.length === 1
                  ? 'w-full'
                  : newRecords.length === 2
                  ? 'w-1/2'
                  : 'w-1/3'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Image
                  src="/images/icons/pawprint_icon_1.svg"
                  alt="ペットのアイコン"
                  width={20}
                  height={20}
                  className="w-auto h-auto"
                />
                <div className="petName text-base">{record.petName}</div>
              </div>
              <ul className="flex flex-col gap-4 mt-2">
                {record.records.map((record) => (
                  <li key={record.recordId}>
                    <RecordCard record={record} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
