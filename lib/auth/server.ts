"use server";

import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Sign up a new user with email and password
 */
export async function signUp(email: string, password: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

/**
 * Sign in a user with email and password
 */
export async function signIn(email: string, password: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/app/dashboard");
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

/**
 * Request a password reset email
 */
export async function resetPassword(email: string) {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

/**
 * Update user password with reset token
 */
export async function updatePassword(password: string) {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/app/dashboard");
}

/**
 * Get the current user session
 */
export async function getSession() {
  const supabase = await createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

/**
 * Get the current user
 */
export async function getUser() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
