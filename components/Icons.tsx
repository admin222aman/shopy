import React from 'react';

export const ShopifyLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 135 45" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Troqiny">
    <path d="M30.68 15.64C30.08 12.02 28.01 6.51 23.53 4.34C21.48 3.33 19.19 3.23 17.13 4.02C14.23 5.12 12.33 8.06 12.33 8.06L11.02 15.64H30.68ZM34.52 15.64H32.69L33.72 9.66C33.72 9.66 35.9 8.73 35.9 6.59C35.9 5.02 34.8 3.78 33.25 3.04C27.43 0.21 24.49 -0.11 20.95 -0.11C15.44 -0.11 11.75 1.52 9.36 3.61C6.76 5.89 5.84 9.66 5.84 9.66L4.8 15.64H3.49C1.47 15.64 0 17.21 0 18.98V38.43C0 40.2 1.47 41.81 3.49 41.81H32.35C34.37 41.81 35.83 40.2 35.83 38.43V18.98C35.83 17.21 34.37 15.64 32.35 15.64H34.52ZM11.02 28.77L18.37 32.33C19.11 32.7 20.21 32.7 20.95 32.33L27.93 28.77L24.63 22.39L20.95 24.51C20.21 24.87 19.11 24.87 18.37 24.51L14.7 22.39L11.02 28.77Z" fill="#95BF47"/>
    <text x="42" y="32" fontFamily="'Inter', -apple-system, sans-serif" fontWeight="800" fontSize="26" fill="#202223" letterSpacing="-0.03em">troqiny</text>
  </svg>
);

export const AppleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.8 10.95c-.05-2.6 2.15-3.8 2.25-3.85-1.25-1.8-3.15-2.05-3.8-2.1-1.6-.15-3.15.95-3.95.95-.85 0-2.15-.9-3.55-.85-1.8.05-3.5 1.05-4.4 2.65-1.9 3.3-.5 8.15 1.35 10.85.9 1.3 1.95 2.75 3.35 2.7.55 0 .8-.15 1.2-.25.4-.1.95-.3 1.7-.3.7 0 1.25.2 1.65.3.4.1.7.25 1.25.25 1.45-.05 2.5-1.3 3.4-2.65.65-1 1-1.95 1.05-2-.05-.05-2-1.25-2-3.85h.05zM15.55 4.8c.75-1 1.3-2.3 1.15-3.65-1.15.05-2.55.75-3.35 1.7-.7.8-1.35 2.15-1.2 3.45 1.3.1 2.6-.5 3.4-1.5z"/>
  </svg>
);

export const FacebookLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const GoogleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const KeyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-7.6 7.6a6.5 6.5 0 1 1-2.4-5.5 6.5 6.5 0 0 1 2.4 5.5Z"/>
    <path d="m21.4 2.6-7.4 7.4"/>
    <path d="M17 5 9 13"/>
  </svg>
);
