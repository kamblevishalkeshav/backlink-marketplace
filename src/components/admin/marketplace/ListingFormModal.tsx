'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Listing } from '@/types/listing';
import ListingForm from './ListingForm';

interface ListingFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  listing?: Listing;
  onSave: (listing: Omit<Listing, 'id' | 'status' | 'createdAt'>) => void;
}

export default function ListingFormModal({
  isOpen,
  setIsOpen,
  listing,
  onSave,
}: ListingFormModalProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = (data: Omit<Listing, 'id' | 'status' | 'createdAt'>) => {
    onSave(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>
            {listing ? 'Edit Listing' : 'Add New Listing'}
          </DialogTitle>
        </DialogHeader>
        
        <ListingForm
          listing={listing}
          onSave={handleSave}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
} 