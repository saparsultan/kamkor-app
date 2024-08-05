import {NextResponse} from "next/server";
import {confirmTourCode} from "@/app/api/helper";

export async function GET(request) {
    const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
    const agentlogin = searchParams.get('agentlogin');
    const agentpass = searchParams.get('agentpass');
    const tour = searchParams.get('tour');
    const phone = searchParams.get('phone');
    let result = await confirmTourCode(agentlogin, agentpass, tour, phone);
    return NextResponse.json(result);
}