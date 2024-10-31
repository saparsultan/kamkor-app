import {NextResponse} from "next/server";
import {getAgencies} from "@/app/api/helper";

export async function GET() {
  let result = await getAgencies();
  return NextResponse.json(result);
}
