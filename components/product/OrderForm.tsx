"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please provide your complete address"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    size: string;
    color: string;
  };
  onSuccess: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ product, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          _csrf: csrfToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const result = await response.json();
      setIsSuccess(true);

      toast({
        title: "Order Submitted Successfully",
        description: `Your order #${result.orderId} has been received.`,
      });

      setTimeout(() => {
        form.reset();
        onSuccess();
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setCsrfToken(Math.random().toString(36).substring(2));
  }, []);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">Order Submitted!</h3>
        <p className="mb-6 text-muted-foreground">
          Thank you for your order. We'll contact you shortly to confirm the
          details.
        </p>
        <Button variant="outline" onClick={onSuccess}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 rounded-lg bg-muted/50 p-3">
        <h3 className="mb-1 text-sm font-medium">Order Summary</h3>
        <p className="text-sm font-semibold">{product.name}</p>
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-muted-foreground">Size: {product.size}</span>
          <span className="font-medium">TzS {product.price.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="123 Main St, Apt 4B, City, State, Zip Code"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or questions?"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Complete Order"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By completing this order, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
