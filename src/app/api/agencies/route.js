import {NextResponse} from "next/server";
import {getAgencies} from "@/app/api/helper";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  let result;
  if(search) {
    result = await getAgencies(search);
  }
  else {
    result = await getAgencies();
  }
  return NextResponse.json(result);
}
