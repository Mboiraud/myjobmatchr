"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { updatePassword, getUser } from "@/lib/auth/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    // Check if user has a valid session
    // After the callback exchanges the code, the user should be authenticated
    const checkAuth = async () => {
      const user = await getUser();
      if (!user) {
        setTokenValid(false);
      }
    };
    checkAuth();
  }, []);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const result = await updatePassword(password);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (!tokenValid) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
          <div className="w-96 text-center">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-red-800 font-medium">Invalid or Expired Link</p>
              <p className="text-red-700 text-sm mt-1">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
            </div>
            <a
              href="/reset-password"
              className="inline-block text-primary hover:underline text-sm font-medium"
            >
              Request a new reset link
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
          <div className="w-96 text-center">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <p className="text-green-800 font-medium">Password Reset Successfully</p>
              <p className="text-green-700 text-sm mt-1">
                Your password has been reset. You can now sign in with your new password.
              </p>
            </div>
            <a href="/signin" className="text-primary hover:underline text-sm font-medium">
              Back to sign in
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="w-96">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set Your New Password
          </h1>
          <p className="text-base text-gray-600 mb-8">
            Enter a new password for your account
          </p>

          <form onSubmit={handleSetPassword} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
