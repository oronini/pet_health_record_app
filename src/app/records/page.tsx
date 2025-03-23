import Image from 'next/image';
import RecordCard from '@/components/parts/RecordCard';
import { pets, records1, records2, records3 } from '@/lib/data/recored';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecordsPage = () => {
  return (
    <div className="contentWrapper mt-6">
      <div className="newRecords mt-8">
        <h2 className="text-h2">記録一覧</h2>
        <Tabs defaultValue="pet1" className="w-full mt-4">
          <TabsList>
            {pets.map((pet) => (
              <TabsTrigger key={pet.value} value={pet.value}>
                <Image
                  src="/images/icons/pawprint_icon_2_active.svg"
                  alt="アイコン"
                  width={18}
                  height={18}
                />
                {pet.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4">
            <TabsContent value="pet1">
              <ul className="recordList flex flex-col gap-4">
                <RecordCard record={records1} />
                <RecordCard record={records1} />
                <RecordCard record={records1} />
              </ul>
            </TabsContent>
            <TabsContent value="pet2">
              <ul className="recordList flex flex-col gap-4">
                <RecordCard record={records2} />
                <RecordCard record={records2} />
                <RecordCard record={records2} />
              </ul>
            </TabsContent>
            <TabsContent value="pet3">
              <ul className="recordList flex flex-col gap-4">
                <RecordCard record={records3} />
                <RecordCard record={records3} />
                <RecordCard record={records3} />
              </ul>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default RecordsPage;
