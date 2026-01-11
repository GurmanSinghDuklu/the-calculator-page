import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEY_FILE = path.join(__dirname, 'service-account.json');
const keys = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

// The URLs you want to be "Instant Indexed"
const URLS_TO_INDEX = [
  'https://thecalculatorpage.com/',
  'https://thecalculatorpage.com/finance/compound-interest',
  'https://thecalculatorpage.com/finance/mortgage'
];

const jwtClient = new google.auth.JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing']
});

async function notifyGoogle() {
  try {
    await jwtClient.authorize();
    console.log("✓ Authenticated with Google successfully.");

    for (const url of URLS_TO_INDEX) {
      // FIX: Changed endpoint from v1 to v3
      const response = await jwtClient.request({
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        data: {
          url: url,
          type: 'URL_UPDATED'
        }
      });

      console.log(`🚀 Indexing request sent for: ${url} (Status: ${response.status})`);
    }
    console.log("\n✨ All set! Google will crawl these URLs shortly.");
  } catch (error) {
    // If you get a 403 here, ensure the service account email is an OWNER in Search Console
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error("❌ Error sending request:", errorMsg);
  }
}

notifyGoogle();