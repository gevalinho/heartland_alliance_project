import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { to, message } = req.body;

      const call = await client.calls.create({
        twiml: `<Response><Say>${message}</Say></Response>`,
        to: to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      res.status(200).json({ success: true, callSid: call.sid });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Failed to initiate call" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
