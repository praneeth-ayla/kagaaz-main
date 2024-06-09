"use client";

import UploadPost from "@/components/UploadPost";
import { useEffect, useState } from "react";
import { UserPost } from "../lib/types";
import axios from "axios";
import CardEle from "@/components/CardEle";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatBlock from "@/components/ChatBlock";

export default function Home() {
	const [posts, setPosts] = useState<UserPost[]>([]);
	const [chat, setChat] = useState("");

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

	async function handleChatSubmit() {
		try {
			const res = await axios.post("/api/chats", {
				message: chat,
			});
			setChat("");
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}

	return (
		<div className="">
			<div className="fixed grid grid-cols-4 h-screen">
				<div className="col-span-1 border h-screen   bg-red-300">1</div>
				<div className="col-span-2 flex flex-col mb-16 gap-10 p-10 overflow-auto no-scrollbar">
					{posts.map((post) => (
						<CardEle
							key={post.id}
							cardDetails={post}
						/>
					))}
				</div>
				<div className="col-span-1 border flex-col-reverse flex gap-2 mb-16  overflow-auto  no-scrollbar">
					<div className="flex gap-3 mt-4 mb-3 px-3">
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
							className="top-0"></Input>
						<Button
							className="flex justify-center items-center"
							onClick={() => {
								handleChatSubmit();
							}}>
							<Send className="flex h-5 "></Send>
						</Button>
					</div>
					<div className="px-8">
						<ChatBlock></ChatBlock>
					</div>
				</div>
			</div>
		</div>
	);
}
