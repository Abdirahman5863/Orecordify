"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Assume you're using a switch for enabling/disabling WhatsApp
import { useState } from "react";

const SettingsPage = () => {
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleWhatsappConnect = () => {
    // Simulate connecting to WhatsApp API
    setWhatsappConnected(true);
    alert("Connected to WhatsApp successfully!");
  };

  const handleNotificationsToggle = () => {
    // Simulate toggling notifications
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="p-8 space-y-8">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Configure general application settings here.</p>
          <div className="mt-4">
            <label className="flex items-center space-x-3">
              <span className="text-gray-700">Enable Notifications</span>
              <Switch
                checked={notificationsEnabled}
                onChange={handleNotificationsToggle}
                className="bg-blue-500"
              />
            </label>
            <p className="text-sm text-gray-400 mt-2">
              Toggle to enable or disable email and SMS notifications for users.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Connect your system with WhatsApp to send updates.</p>
          <div className="mt-4 flex items-center space-x-4">
            {whatsappConnected ? (
              <div>
                <p className="text-green-600 font-bold">Connected to WhatsApp</p>
              </div>
            ) : (
              <Button onClick={handleWhatsappConnect} className="bg-green-500">
                Connect to WhatsApp
              </Button>
            )}
          </div>
          {whatsappConnected && (
            <div className="mt-4">
              <p className="text-gray-500">
                WhatsApp is now connected. You can start sending notifications through WhatsApp.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Choose your preferred theme.</p>
          <div className="mt-4">
            <Button className="bg-blue-500 text-white">Switch to Dark Mode</Button>
            <Button className="ml-4 bg-gray-300 text-black">Switch to Light Mode</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
