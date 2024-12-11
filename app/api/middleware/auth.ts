import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Add JWT validation logic here
}
