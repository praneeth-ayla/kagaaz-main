import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../prisma/db";

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const postId = searchParams.get("postId");

	if (postId) {
		try {
			const data = await db.posts.update({
				where: {
					id: postId,
				},
				data: {
					views: { increment: 1 },
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

	return NextResponse.json({
		message: "API route for request relating post",
	});
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const userDetails = await getServerSession(authOptions);
	// @ts-ignore
	const authorId = userDetails?.user?.id;

	try {
		console.log("=========================================");
		console.log(body);
		console.log("=========================================");
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
