import { ConfirmationDialog } from '@/components/global/ConfirmationDialog/ConfirmationDialog';
import React, { useCallback, useState } from 'react';

interface IProps {
  headerText: string;
  onConfirmClick(): void;
}
export default function useConfirmationDialog({ headerText, onConfirmClick }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const Dialog = useCallback(
    () => (
      <ConfirmationDialog
        headerText={headerText}
        isOpen={isOpen}
        onConfirmClick={onConfirmClick}
        onClose={onClose}
      />
    ),
    [isOpen]
  );

  return {
    Dialog,
    onOpen,
  };
}
