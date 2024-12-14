"use client";

import { UserButton } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="p-8 space-y-8">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Manage your account, update profile details, or sign out.
            </p>
            {/* User Profile Actions */}
            <div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
