'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AuthState = { error?: string; message?: string } | null

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mockmateapp.com'
}

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    // Supabase returns "Invalid login credentials" for both wrong password AND
    // unconfirmed email (intentional security obfuscation). Give users a helpful hint.
    if (
      error.message.includes('Invalid login credentials') ||
      error.message.includes('invalid_credentials')
    ) {
      return {
        error:
          'Invalid email or password. If you just signed up, please verify your email first.',
      }
    }
    if (
      error.message.includes('Email not confirmed') ||
      error.message.includes('email_not_confirmed')
    ) {
      return {
        error:
          'Please verify your email before logging in. Check your inbox or use "Resend verification email" below.',
      }
    }
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signup(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      },
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // If email confirmation is disabled in Supabase, session is returned immediately.
  if (data.session) {
    redirect('/dashboard')
  }

  // Email confirmation required — send the user to login with a prompt.
  redirect('/login?message=check_email')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function forgotPassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get('email') as string,
    {
      redirectTo: `${siteUrl()}/auth/callback?next=/reset-password`,
    },
  )

  if (error) {
    return { error: error.message }
  }

  return {
    message:
      'Password reset email sent. Check your inbox and spam folder.',
  }
}

export async function resetPassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = formData.get('password') as string
  const confirm = formData.get('confirm_password') as string

  if (password !== confirm) {
    return { error: 'Passwords do not match.' }
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    if (error.message.includes('Auth session missing')) {
      return {
        error:
          'This reset link has expired. Please request a new password reset.',
      }
    }
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function resendVerification(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient()

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: formData.get('email') as string,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return {
    message:
      'Verification email sent. Check your inbox and spam folder.',
  }
}
