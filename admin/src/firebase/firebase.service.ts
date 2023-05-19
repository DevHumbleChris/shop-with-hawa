/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseAdmin {
  constructor(private configService: ConfigService) {}

  private app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: this.configService.get('FIREBASE_PROJECT_ID'),
      privateKey: this.configService.get('FIREBASE_PRIVATE_KEY'),
      clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
    }),
  });

  public auth = getAuth(this.app);
  public db = getFirestore(this.app);
}
