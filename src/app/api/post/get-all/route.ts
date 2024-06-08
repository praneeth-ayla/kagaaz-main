import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../prisma/db";

export async function GET(request: NextRequest) {
	try {
		const data = await db.posts.findMany({
			include: {
				author: { select: { image: true, name: true, id: true } },
			},
		});
		return NextResponse.json({
			data,
		});
	} catch (error: any) {
		return NextResponse.json({
			message: error.message,
			status: 500,
		});
	}
}
