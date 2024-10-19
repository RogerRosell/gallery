"use client";

// import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui/button';

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
    );
  }

  return (    
    <Button variant="outline" className="" onClick={() => signIn()}>Sign in</Button>
  )
}

export default function NavMenu() {
  return (
    <div className="w-full flex justify-end">
      <AuthButton />
    </div>
  )
}