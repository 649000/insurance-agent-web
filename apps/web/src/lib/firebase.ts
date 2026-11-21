import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'insurance-agent-dev.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'insurance-agent-dev',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'insurance-agent-dev.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:mockappid',
};

// Initialize Firebase client app (Singleton)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app, 'asia-southeast1');

// Connect to emulators in local development
if (
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true'
) {
  const authEmulatorUrl = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL || 'http://127.0.0.1:9099';
  const functionsEmulatorHost = '127.0.0.1';
  const functionsEmulatorPort = 5001;

  try {
    connectAuthEmulator(auth, authEmulatorUrl, { disableWarnings: true });
    connectFunctionsEmulator(functions, functionsEmulatorHost, functionsEmulatorPort);
  } catch {
    // Emulator connection errors ignored if already connected
  }
}
