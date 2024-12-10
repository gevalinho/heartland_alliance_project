import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  try {
    const { phoneNumber, patientName, medicationName } = await request.json();

    const call = await client.calls.create({
      twiml: `
        <Response>
          <Say>Hello ${patientName}, this is your medication reminder call.</Say>
          <Pause length="1"/>
          <Say>Have you taken your ${medicationName} today?</Say>
          <Gather numDigits="1" action="/api/twilio/gather" method="POST">
            <Say>Press 1 for yes, or 2 for no.</Say>
          </Gather>
        </Response>
      `,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error('Error making Twilio call:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}