"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "../lib/uploadThing";
import { useState } from "react";
import axios from "axios";

const dataSchema = {
	title: "",
	description: "",
	tags: "",
	url: "",
};

export default function UploadPost() {
	const [data, setData] = useState(dataSchema);

	async function handleSubmit() {
		const res = await axios.post("/api/post", data);
		console.log("hoadjflasdi", res);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add post</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Post</DialogTitle>
					<DialogDescription>Upload your notes!</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="title"
							className="text-right">
							Title
						</Label>
						<Input
							id="title"
							onChange={(e) => {
								setData({ ...data, title: e.target.value });
							}}
							className="col-span-3"
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="description"
							className="text-right">
							Description
						</Label>
						<Input
							id="description"
							onChange={(e) => {
								setData({
									...data,
									description: e.target.value,
								});
							}}
							className="col-span-3"
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="tags"
							className="text-right">
							Tags
						</Label>
						<Input
							id="tags"
							onChange={(e) => {
								setData({ ...data, tags: e.target.value });
							}}
							className="col-span-3"
						/>
					</div>
				</div>
				<main className="">
					<UploadDropzone
						appearance={{
							uploadIcon: { height: "50px" },
						}}
						className="border-2"
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							// Do something with the response
							setData({ ...data, url: res[0].url });
							// alert("Upload Completed");
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(
								`ERROR! There seems to be some problem on our end.`
							);
							console.log(error.message);
						}}
						config={{ appendOnPaste: true }}
					/>
				</main>
				<DialogFooter>
					{data.url !== "" && (
						<Button
							type="submit"
							onClick={() => {
								handleSubmit();
							}}>
							Upload file
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
