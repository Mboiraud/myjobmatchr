"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { resetPassword } from "@/lib/auth/server";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    const result = await resetPassword(email);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setEmail("");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
          <p className="text-green-800 font-medium">Check your email</p>
          <p className="text-green-700 text-sm mt-1">
            We've sent a password reset link to your email. Click the link to
            set a new password.
          </p>
        </div>
        <Link href="/signin" className="text-primary hover:underline text-sm">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleResetPassword} className="space-y-4">
        <p className="text-gray-600 text-sm">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link href="/signin" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
