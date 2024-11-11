import {NextResponse} from "next/server";
import {getTourCodeInfo} from "@/app/api/helper";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const code = searchParams.get('code');
  let result = await getTourCodeInfo(code);
  return NextResponse.json(result);
}
