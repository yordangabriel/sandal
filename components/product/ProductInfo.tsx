"use client";

import React from 'react';
import { 
  Star, 
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ProductProps {
  product: {
    name: string;
    price: number;
    originalPrice: number;
    description: string;
    useStatus: string;
    condition: string;
    material: string;
    color: string;
    size: string;
    brand: string;
    includes: string;
    highlights: string[];
  };
  onOrderNow: () => void;
}

const ProductInfo: React.FC<ProductProps> = ({ product, onOrderNow }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-2 text-xs font-medium text-blue-600 dark:text-blue-400">
            {product.condition}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-xs text-muted-foreground">Like New</span>
          </div>
        </div>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{product.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{product.brand} | {product.size}</p>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">TzS {product.price.toFixed(2)}</span>
        <span className="text-sm font-medium text-muted-foreground line-through">
          TzS {product.originalPrice.toFixed(2)}
        </span>
        <Badge className="ml-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          {discount}% OFF
        </Badge>
      </div>
      
      <p className="text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>
      
      <Separator />
      
      <div className="space-y-2">
        <h3 className="text-base font-medium">Highlights</h3>
        <ul className="space-y-2">
          {product.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">Condition</p>
          <p className="text-muted-foreground">{product.condition}</p>
        </div>
        <div>
          <p className="font-medium">Material</p>
          <p className="text-muted-foreground">{product.material}</p>
        </div>
        <div>
          <p className="font-medium">Color</p>
          <p className="text-muted-foreground">{product.color}</p>
        </div>
        <div>
          <p className="font-medium">Size</p>
          <p className="text-muted-foreground">{product.size}</p>
        </div>
        <div className="col-span-2">
          <p className="font-medium">What's Included</p>
          <p className="text-muted-foreground">{product.includes}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <Button 
          onClick={onOrderNow}
          size="lg" 
          className="w-full rounded-md bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-transform hover:scale-[1.02] hover:shadow-md md:text-lg"
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;