import fs from 'fs';
import { google } from 'googleapis';
import { config } from '../config'
import { OAuth2Client } from 'googleapis-common';

export async function ExportToDrive(fileName: string, type: string) {
  try {
    const auth = new google.auth.OAuth2(
      config.googleDrive.client_id,
      config.googleDrive.client_secret,
      config.googleDrive.redirect_uris,
    );
    auth.setCredentials({ refresh_token: config.googleDrive.refresh_token });
    const mimeType = type === 'csv' ? 'text/csv' : 'application/vnd.ms-excel';
    upload(auth, { name: fileName, mimeType });
  } catch (e) {
    return e;
  }
}

function upload(auth: OAuth2Client, metadata: { name: string; mimeType: string }) {
  const { name, mimeType } = metadata;
  const drive = google.drive({ version: 'v3', auth });
  drive.files.create(
    {
      requestBody: {
        name,
        parents: [config.googleDrive.folder],
        mimeType,
      },
      media: {
        mimeType,
        body: fs.createReadStream(`temp/${name}`),
      },
      fields: 'id',
    },
    function (err, file) {
      if (err) {
        console.error(err);
      }
    }
  );
}
