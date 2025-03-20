import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="contentWrapper">
      <Button variant="black">記録ボタン</Button>
      <div className="newRecords">
        <h2>最新の記録</h2>
        <ul className="petNamesList">
          <li className="petNameItem">
            <p className="petName">ペットの名前</p>
          </li>
        </ul>
        <ul className="recordsList">
          <li className="recordsItem">
            <ul className="recordList">
              <li className="listItem">記録情報</li>
              <li className="listItem">記録情報</li>
              <li className="listItem">記録情報</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
