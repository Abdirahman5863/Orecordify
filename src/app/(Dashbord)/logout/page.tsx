"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform logout action here (e.g., clearing tokens, redirecting to login)
    const logout = async () => {
      // Simulate API call to log out
      await fetch("/api/auth/logout", { method: "POST" });
      // Redirect to login page after logout
      router.push("/sign-in");
    };

    logout();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 mb-4">
            You have been logged out successfully. We hope to see you again soon!
          </p>
          <Button onClick={() => router.push("/login")} className="w-full">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoutPage;
