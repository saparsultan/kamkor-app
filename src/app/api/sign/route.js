import {NextResponse} from "next/server";
import {authUser} from "@/app/api/helper";
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const passport = searchParams.get('passport');
  const pushId = searchParams.get('pushId');
  const phone = searchParams.get('phone');
  let result = await authUser(passport, pushId, phone);
  return NextResponse.json(result);
}
