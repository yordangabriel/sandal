"use client";

import React, { useState } from "react";
import { BadgeCheck, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import OrderDialog from "./OrderDialog";
import image1 from "../../app/images/1.png";
import image2 from "../../app/images/2.png";
import image3 from "../../app/images/3.png";
import image4 from "../../app/images/4.png";

// Product data
const productData = {
  id: "sandal-premium-001",
  name: "Premium Leather Sandals",
  price: 5000,
  originalPrice: 25000,
  description:
    "These premium leather sandals have only been worn for 3 days and are in pristine condition. They feature genuine leather straps, ergonomic footbed, and durable rubber outsole for maximum comfort and style.",
  useStatus: "Used for only 3 days",
  condition: "Like new",
  material: "Genuine leather",
  color: "Tan Brown",
  size: "43 EU / 10 US",
  brand: "ArtisanStep",
  includes: "Original box and dust bag included",
  highlights: [
    "Premium leather construction",
    "Ergonomic footbed for all-day comfort",
    "Worn only for 3 days - practically new",
    "Original packaging included",
    "Neutral color that matches everything",
  ],
  images: [image1, image2, image3, image4],
};

const SandalsProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openOrderDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="container px-4 py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <ProductImageGallery images={productData.images} />

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <ProductInfo product={productData} onOrderNow={openOrderDialog} />

            {/* Benefits */}
            <div className="mt-4 rounded-lg border bg-background p-4">
              <h3 className="mb-3 text-base font-medium">Why Shop With Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Authenticated Items</p>
                    <p className="text-xs text-muted-foreground">
                      All items are verified for authenticity
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Fast Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      Ships within 24 hours of purchase
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Buyer Protection</p>
                    <p className="text-xs text-muted-foreground">
                      Full refund if item doesn't match description
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shop with confidence */}
            <div className="mt-2 flex items-center justify-between rounded-lg border bg-background p-4">
              <div className="flex flex-col">
                <p className="text-sm font-medium">Need more information?</p>
                <p className="text-xs text-muted-foreground">
                  Ask us anything about this product
                </p>
              </div>
              <button
                onClick={openOrderDialog}
                className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                Contact <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Dialog */}
      <OrderDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        product={productData}
      />
    </div>
  );
};

export default SandalsProduct;
