'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RecordForm from '@/components/parts/recordForm';
import { useState } from 'react';

const AddRecordDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>記録ボタン</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>記録入力</DialogTitle>
          <DialogDescription>
            <RecordForm onClose={() => setOpen(false)} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordDialog;
