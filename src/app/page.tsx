"use client";

import UploadPost from "@/components/UploadPost";
import { useEffect, useState } from "react";
import { UserPost } from "../lib/types";
import axios from "axios";
import CardEle from "@/components/CardEle";

export default function Home() {
	const [posts, setPosts] = useState<UserPost[]>([]);

	async function fetchPosts() {
		try {
			const res = await axios.get("/api/post/get-all");
			setPosts(res.data.data);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<div className="grid grid-cols-4 h-screen">
				<div className="col-span-1 border ">1</div>
				<div className="col-span-2 flex flex-col  gap-10 p-10">
					{posts.map((post) => (
						<CardEle
							key={post.id}
							cardDetails={post}
						/>
					))}
				</div>
				<div className="col-span-1 border ">3</div>
			</div>
		</div>
	);
}
