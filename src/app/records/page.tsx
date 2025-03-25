import Image from 'next/image';
import RecordCard from '@/components/cards/RecordCard';
import { pets, recordData } from '@/lib/data/recored';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecordsPage = () => {
  const petsData = pets;
  const records = petsData.map((pet) => {
    return {
      petId: pet.petId,
      petName: pet.petName,
      records: recordData.filter((record) => record.petId === pet.petId),
    };
  });

  return (
    <div className="contentWrapper mt-6">
      <div className="newRecords mt-8">
        <h2 className="text-h2">記録一覧</h2>
        <Tabs defaultValue="1" className="w-full mt-4">
          <TabsList>
            {petsData.map((pet) => (
              <TabsTrigger
                className="px-4 flex items-center gap-1.5"
                key={pet.petId}
                value={pet.petId.toString()}
              >
                <Image
                  src="/images/icons/pawprint_icon_2_active.svg"
                  alt="アイコン"
                  width={18}
                  height={18}
                />
                {pet.petName}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4">
            {records.map((record) => (
              <TabsContent key={record.petId} value={record.petId.toString()}>
                <ul className="recordList flex flex-col gap-4">
                  {record.records.map((record) => (
                    <RecordCard
                      key={record.recordId}
                      record={record}
                      recordList={true}
                    />
                  ))}
                </ul>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default RecordsPage;
