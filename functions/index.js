import { https } from "firebase-functions";
import {qwikApp} from './server/entry_firebase.mjs';


export const app = https.onRequest(qwikApp)
