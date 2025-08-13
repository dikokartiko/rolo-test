import { google } from 'googleapis';

export async function updateSheet(data: any[]) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();
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