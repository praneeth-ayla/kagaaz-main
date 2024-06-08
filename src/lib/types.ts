export interface UserPost {
	id: string;
	title: string;
	url: string;
	description: string;
	elements: string;
	postedOn: string;
	authorId: string;
	tags: string;
	views: number;
	author: {
		id: string;
		name: string;
		image: string;
	};
}
