import { NextResponse } from 'next/server';
import { updateSheet } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convert the form data object to an array format for Google Sheets
    const rowData = [
      data.name || '',
      data.email || '',
      data.address || '',
      data.unit || '',
      data.postal || '',
      new Date().toISOString() // Add timestamp
    ];
    
    await updateSheet(rowData);
    return NextResponse.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form data' },
      { status: 500 }
    );
  }
}