/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Subscription {
  id: string;
  status: string;
  ordersUsed: number;
  trialEndsAt: string;
  currentPeriodEnd?: string;
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription');
      if (!response.ok) throw new Error('Failed to fetch subscription');
      const data = await response.json();
      setSubscription(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subscription details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch('/api/subscription/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: 'MONTHLY_PLAN',
        }),
      });
      
      const order = await response.json();
      return order.id;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create subscription order",
        variant: "destructive",
      });
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const response = await fetch('/api/subscription/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      });

      const subscription = await response.json();
      setSubscription(subscription);
      
      toast({
        title: "Success",
        description: "Subscription activated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate subscription",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Subscription</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Free Trial</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>20 orders included</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>14-day trial period</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-2xl font-bold">Free</p>
                  {subscription?.status === 'trialing' && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Trial ends on {new Date(subscription.trialEndsAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Orders used: {subscription.ordersUsed}/20
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pro Plan</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Unlimited orders</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Custom reports</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-2xl font-bold">$10/month</p>
                  {subscription?.status === 'active' ? (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Next billing date: {new Date(subscription.currentPeriodEnd!).toLocaleDateString()}
                      </p>
                      <Button className="mt-4" variant="outline" disabled>
                        Currently Active
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        style={{ layout: "horizontal" }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {subscription?.status === 'trialing' && subscription.ordersUsed >= 15 && (
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Trial limit approaching
                  </h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    Youve used {subscription.ordersUsed} out of 20 orders. Consider upgrading to continue using all features.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </PayPalScriptProvider>
  );
}