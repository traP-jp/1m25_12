import { NextResponse } from "next/server";
import { getMe } from "@/actions/getMe";

export async function GET() {
  const user = await getMe();
  return NextResponse.json(user);
}