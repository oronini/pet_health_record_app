export type RecordListType = {
  action: string;
  datetime: string;
  status?: string;
  amount?: string;
  note?: string;
};

export type AddRecordType = {
  action: string;
  datetime: string;
  status?: string;
  amount?: string;
  note?: string;
};

export type CardTxtsType = {
  txt: string;
  alt: string;
  src: string;
  recordList?: boolean;
};
