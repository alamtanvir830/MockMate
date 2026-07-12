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
    email: (formData.get('email') as string).toLowerCase().trim(),
    password: formData.get('password') as string,
  })

  if (error) {
    if (
      error.message.includes('Invalid login credentials') ||
      error.message.includes('invalid_credentials')
    ) {
      return { error: 'Invalid email or password.' }
    }
    // Legacy unconfirmed accounts (created before email confirmation was disabled).
    // New signups are auto-confirmed and won't hit this path.
    if (
      error.message.includes('Email not confirmed') ||
      error.message.includes('email_not_confirmed')
    ) {
      return {
        error:
          'Your account email is unconfirmed. Use "Forgot password" to reset and verify your account.',
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

  const email = (formData.get('email') as string).toLowerCase().trim()
  const password = formData.get('password') as string
  const fullName = (formData.get('full_name') as string).trim()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  })

  if (error) {
    if (
      error.message.includes('User already registered') ||
      error.message.includes('user_already_exists')
    ) {
      return {
        error: 'An account with this email already exists. Try signing in instead.',
      }
    }
    return { error: error.message }
  }

  // Email confirmation disabled in Supabase → session returned immediately.
  if (data.session) {
    redirect('/dashboard')
  }

  // Email confirmation still enabled → prompt user to check inbox.
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
    email: (formData.get('email') as string).toLowerCase().trim(),
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  })

  if (error) {
    if (
      error.message.toLowerCase().includes('rate limit') ||
      error.message.includes('over_email_send_rate_limit') ||
      error.message.includes('security purposes')
    ) {
      return { error: 'Please wait before requesting another email.' }
    }
    if (
      error.message.includes('already confirmed') ||
      error.message.includes('user_already_exists') ||
      error.message.includes('email_exists')
    ) {
      return { error: 'This email is already verified. Try logging in.' }
    }
    return { error: error.message }
  }

  return {
    message: 'Verification email sent. Check your inbox and spam folder.',
  }
}
