import {NextResponse} from "next/server";
import {authTravelAgent} from "@/app/api/helper";
export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
    const agentlogin = searchParams.get('agentlogin');
    const agentpass = searchParams.get('agentpass');
    let result = await authTravelAgent(agentlogin, agentpass);
    return NextResponse.json(result);
}