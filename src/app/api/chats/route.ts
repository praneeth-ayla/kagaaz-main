import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../prisma/db";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const userDetails = await getServerSession(authOptions);
	// @ts-ignore
	const authorId = userDetails?.user?.id;

	try {
		const res = await db.posts.create({
			data: {
				title: body.title,
				description: body.description,
				url: body.url,
				authorId: authorId,
				tags: body.tags,
			},
		});
		return NextResponse.json({
			message: "Post added successfully",
			post: res,
		});
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{
				error: "Error creating post",
			},
			{ status: 500 }
		);
	}
}
