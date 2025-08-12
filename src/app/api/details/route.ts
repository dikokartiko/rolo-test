import { NextResponse } from 'next/server';
import { updateSheet } from '@/lib/sheets';

export async function POST(request: Request) {
  const data = await request.json();
  await updateSheet(data);
  return NextResponse.json({ message: 'Form submitted successfully!' });
}