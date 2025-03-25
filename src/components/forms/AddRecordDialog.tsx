'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RecordForm from '@/components/forms/RecordForm';
import { useState } from 'react';
import { AddRecordType } from '@/lib/types/records';

const AddRecordDialog = ({
  onSubmit,
}: {
  onSubmit: (record: AddRecordType) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>記録ボタン</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>記録入力</DialogTitle>
          <DialogDescription>
            <RecordForm onClose={() => setOpen(false)} onSubmit={onSubmit} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordDialog;
