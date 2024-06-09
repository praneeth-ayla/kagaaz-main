"use client";

import { useEffect, useState } from "react";
import { UserPost } from "../../../lib/types";
import axios from "axios";
import CardEle from "@/components/CardEle";
import { Input } from "@/components/ui/input";
import { Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatBlock from "@/components/ChatBlock";

export default function Home() {
	const [posts, setPosts] = useState<UserPost[]>([]);
	const [chat, setChat] = useState("");
	const [search, setSearch] = useState("");
	const [filteredPosts, setFilteredPosts] = useState<UserPost[]>([]);

	async function fetchPosts() {
		try {
			const res = await axios.get("/api/post/get-all");
			setPosts(res.data.data);
			setFilteredPosts(res.data.data); // Initially, show all posts
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		if (search) {
			const filtered = posts.filter((post) => {
				if (search.startsWith("#")) {
					const tag = search.substring(1).toLowerCase().trim();
					return post.tags?.toLowerCase().includes(tag);
				} else {
					const inTitle = post.title
						.toLowerCase()
						.includes(search.toLowerCase().trim());

					return inTitle;
				}
			});
			setFilteredPosts(filtered);
		} else {
			setFilteredPosts(posts); // Show all posts if search is empty
		}
	}, [search, posts]);

	async function handleChatSubmit() {
		try {
			const res = await axios.post("/api/chats", {
				message: chat,
			});
			setChat("");
		} catch (error) {
			console.error("Error sending chat:", error);
		}
	}

	return (
		<div className="">
			<div className="fixed grid grid-cols-4 h-screen">
				<div className="col-span-1 text-center text-lg">Filter</div>
				<div className="col-span-2 text-center text-lg">Posts</div>
				<div className="col-span-1 text-center text-lg">
					#General chat
				</div>
				<div className="col-span-1 border border-t-0 h-screen ">
					<div className="flex gap-2 p-2">
						<Input
							placeholder="Search Notes"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="flex-1"
						/>
						<Button
							onClick={() =>
								setFilteredPosts(
									posts.filter(
										(post) =>
											post.title
												.toLowerCase()
												.includes(
													search.toLowerCase()
												) ||
											post.tags
												?.toLowerCase()
												.includes(search.toLowerCase())
									)
								)
							}>
							<Search className="h-5 w-5" />
						</Button>
					</div>
					<div>2</div>
					<div>3</div>
				</div>
				<div className="col-span-2 flex flex-col mb-16 gap-10 p-10 overflow-auto no-scrollbar">
					{filteredPosts.length !== 0 &&
						filteredPosts.map((post) => (
							<CardEle
								key={post.id}
								cardDetails={post}
							/>
						))}
				</div>
				<div className="col-span-1 border flex-col-reverse border-t-0 flex gap-2 mb-16 overflow-auto no-scrollbar">
					<div className="flex gap-3 mt-4 mb-10 px-3">
						<Input
							placeholder="Type your message"
							onChange={(e) => {
								setChat(e.target.value);
							}}
							value={chat}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleChatSubmit();
								}
							}}
							className="top-0"
						/>
						<Button
							className="flex justify-center items-center"
							onClick={handleChatSubmit}>
							<Send className="flex h-5" />
						</Button>
					</div>
					<div className="px-8">
						<ChatBlock />
					</div>
				</div>
			</div>
		</div>
	);
}
