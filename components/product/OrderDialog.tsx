"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OrderForm from './OrderForm';

interface OrderDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    size: string;
    color: string;
    // Add other product properties as needed
  };
}

const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, setIsOpen, product }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Complete Your Order
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <OrderForm product={product} onSuccess={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;