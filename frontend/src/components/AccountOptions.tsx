import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

export function AccountOptions() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (value: string) => {
    navigate(`/account/${value}`);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={location.pathname.split('/')[2] || 'profile'}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="text-center py-8">
              <p className="text-gray-500">Redirecting to profile settings...</p>
            </div>
          </TabsContent>
          <TabsContent value="orders">
            <div className="text-center py-8">
              <p className="text-gray-500">Redirecting to orders...</p>
            </div>
          </TabsContent>
          <TabsContent value="wishlist">
            <div className="text-center py-8">
              <p className="text-gray-500">Redirecting to wishlist...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 