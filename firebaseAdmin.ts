import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'
import serviceAccount from './serviceAccountKey.json' // Make sure tsconfig allows JSON imports

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

const adminDB = admin.firestore();
export { admin, adminDB };
