# Create auth-form.tsx - part A (imports, Chip, AuthPw, EN dict)
with open('src/app/(auth)/auth-form.tsx', 'w', encoding='utf-8') as f:
    f.write(r"""
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BdMap from './bd-map';
import ThemeButton from './theme-button';
import { validateContact } from '@/lib/validations';

type Lang = 'en' | 'bn';

function Chip({
  img,
  init,
  bg,
  fg,
  name,
  sub,
  style,
}: {
  img: string;
  init: string;
  bg: string;
  fg: string;
  name: string;
  sub: string;
  style?: React.CSSProperties;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className='chip' style={style}>
      <i style={{ background: bg, color: fg, overflow: 'hidden', padding: 0 }}>
        {!err ? (
          <img
            src={img}
            alt={name}
            width={32}
            height={32}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={() => setErr(true)}
          />
        ) : (
          init
        )}
      </i>
      <div>
        <span>{name}</span>
        <small>{sub}</small>
      </div>
    </div>
  );
}

function AuthPw({
  id,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  id: string;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className='f'>
      <i>🔒</i>
      <input
        id={id}
        type={show ? 'text' : 'password'}
        required
        minLength={8}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type='button'
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? '🙈' : '👁'}
      </button>
    </div>
  );
}

const EN: Record<string, string> = {
  loc: 'Dhaka, Bangladesh',
  rt: 'Your people are here',
  s1: 'A familiar name.',
  s2: 'An old story.',
  rh1: 'Let the pull of',
  rh2: 'your people bring you back.',
  c1i: 'R',
  c1n: 'Rima',
  c1s: 'Mirpur-10, Dhaka',
  c2i: 'S',
  c2n: 'Sajid',
  c2s: 'Dhaka · Friend',
  rb1: 'From Dhaka, to every corner of Bangladesh.',
  rb2: 'Same roots, a little closer.',
  leb: 'Your people are right here',
  lh: 'Come back to your people.',
  lede: 'Return to friends, family and everyone who makes it feel like home.',
  idl: 'Email or mobile number',
  idph: 'Your email or mobile',
  pwl: 'Password',
  pwph: 'Enter your password',
  rem: 'Remember me',
  forgot: 'Forgot password?',
  sign: 'Sign in',
  newto: 'New to Twingface?',
  open: 'Create an account',
  rpill: 'Join Twingface in under a minute',
  rtitle: 'Create your account',
  rsub: "A few details and you're on your way.",
  rname: 'Full Name',
  rnameph: 'e.g. Farah Rahman',
  rcont: 'Email or Bangladeshi Mobile',
  rcontph: '+880 1XXX-XXXXXX or you@example.com',
  rpw: 'Password',
  rpwph: 'At least 8 characters',
  rcpw: 'Confirm Password',
  rcpwph: 'Type your password again',
  match: '✓ Passwords match',
  mismatch: '✕ Passwords do not match',
  rterms: "I agree to Twingface's Terms and Privacy Notice.",
  rsign: 'Create my account',
  rcreating: 'Creating your account…',
  rfoot1: 'Already have an account?',
  rfoot2: 'Log in',
  rok: '✓ Account created! Taking you to your dashboard…',
  rfail: 'Could not create your account. Please try again.',
  fix: 'Please correct the highlighted fields.',
  eName: 'Please enter your name (min 2 characters).',
  eContact: 'Enter a valid email or BD mobile (01XXXXXXXXX).',
  ePw: 'Password must be at least 8 characters.',
  ePwCase: 'Include upper and lowercase letters.',
  ePwNum: 'Include at least one number.',
  eTerms: 'Please accept the Terms and Privacy Notice.',
  f1: 'With people, in your own language.',
};
""")
print('PART A written')