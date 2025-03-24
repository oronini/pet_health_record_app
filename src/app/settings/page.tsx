import SettingForm from '@/components/forms/SettingForm';

const SettingsPage = () => {
  return (
    <div className="contentWrapper mt-6">
      <div className="newRecords mt-8">
        <h2 className="text-h2">設定</h2>
        <div className="max-w-lg mx-auto mt-4">
          <SettingForm />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
