import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../prisma/db";

export async function GET(request: NextRequest) {
	try {
		const res = await db.chats.findMany({
			include: {
				author: {
					select: {
						image: true,
						name: true,
					},
				},
			},
		});

		return NextResponse.json({
			message: "Chats",
			chats: res,
		});
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{
				error: "Error getting chats",
			},
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const userDetails = await getServerSession(authOptions);
	// @ts-ignore
	const authorId = userDetails?.user?.id;

	try {
		const res = await db.chats.create({
			data: {
				message: body.message,
				authorId,
			},
		});
		return NextResponse.json({
			message: "Message added successfully",
		});
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{
				error: "Error creating chats",
			},
			{ status: 500 }
		);
	}
}
