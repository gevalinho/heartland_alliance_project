import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const digits = formData.get("Digits");
    const callSid = formData.get("CallSid");

    // Update the call record in the database
    await prisma.call.update({
      where: { id: callSid as string },
      data: {
        status: "completed",
        notes: `Patient response: ${digits === "1" ? "Taken" : "Not taken"}`,
      },
    });

    const response = new Response();
    response.headers.set("Content-Type", "text/xml");

    const twiml = `
      <Response>
        <Say>${
          digits === "1"
            ? "Thank you for confirming. Keep up the good work!"
            : "Please remember to take your medication as prescribed. Your health is important."
        }</Say>
        <Pause length="1"/>
        <Say>Goodbye!</Say>
      </Response>
    `;

    return new Response(twiml, {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("Error processing gather:", error);
    return NextResponse.json(
      { error: "Failed to process response" },
      { status: 500 }
    );
  }
}

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const makeCall = async (to: string, from: string, message: string) => {
  try {
    const call = await client.calls.create({
      to,
      from,
      twiml: `<Response><Say>${message}</Say></Response>`,
    });
    return call;
  } catch (error) {
    console.error("Twilio Error:", error);
    throw error;
  }
};
export const sendSMS = async (to: string, from: string, message: string) => {
  try {
    const sms = await client.messages.create({
      body: message,
      to,
      from,
    });
    return sms;
  } catch (error) {
    console.error("Twilio Error:", error);
    throw error;
  }
};
