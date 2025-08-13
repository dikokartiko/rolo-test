import { google } from 'googleapis';

export async function updateSheet(data: any[]) {
  console.log('--- Google Sheets Integration Debug Info ---');
  console.log('GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL ? 'Set' : 'Not Set');
  console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID ? 'Set' : 'Not Set');
  console.log('GOOGLE_PRIVATE_KEY (first 10 chars):', process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.substring(0, 10) + '...' : 'Not Set');

  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!privateKey) {
    console.error('GOOGLE_PRIVATE_KEY is missing or invalid.');
    throw new Error('Missing GOOGLE_PRIVATE_KEY');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    console.error('GOOGLE_SHEET_ID is missing or invalid.');
    throw new Error('Missing GOOGLE_SHEET_ID');
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data],
      },
    });
    console.log('--- Google Sheets Update Success ---');
  } catch (error) {
    console.error('--- Google Sheets Update Failed ---');
    console.error('Error details:', error);
    throw error;
  }
}