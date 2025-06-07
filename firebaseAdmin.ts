import admin from 'firebase-admin'

const serviceAccount = JSON.parse(
  Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64!, 'base64').toString('utf8')
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const adminDB = admin.firestore();
export { admin, adminDB };
