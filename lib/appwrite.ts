import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
import { TouchableOpacityProps } from 'react-native';
import { Models } from 'react-native-appwrite';

interface PostDocument extends Models.Document {
	title: string;
	thumbnail: string;
	prompt: string;
	video: string;
	creator: string;
}

interface File {
	mimeType: string;
	[id: string]: any;
}

export const appwriteConfig = {
	endPoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.fyzanshaik.auro',
	projectId: '672e3f6700264460c02f',
	databaseId: '672e40890022c262b753',
	userCollectionId: '672e40af00087a59c333',
	videoCollectionId: '672e40c30035a99c3ce0',
	storageId: '672e41f50007c28f5751',
};

const client = new Client();
client.setEndpoint(appwriteConfig.endPoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

const createUser = async (email: string, password: string, username: string) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, username);
		if (!newAccount) throw Error;
		const avatarUrl = avatars.getInitials(username);
		await signIn(email, password);
		const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), { accountId: newAccount.$id, email, username, avatar: avatarUrl });
		return newUser;
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

const signIn = async (email: string, password: string) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		console.log(session);
		return session;
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;
		const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)]);
		if (!currentUser) throw Error;
		return currentUser.documents[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

const getAllPosts = async (): Promise<PostDocument[]> => {
	try {
		const posts = await databases.listDocuments<PostDocument>(appwriteConfig.databaseId, appwriteConfig.videoCollectionId);
		return posts.documents;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const getLatestPosts = async (): Promise<PostDocument[]> => {
	try {
		const posts = await databases.listDocuments<PostDocument>(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(10)]);
		return posts.documents;
	} catch (error) {
		console.log(error);
		return [];
	}
};
// const getUserPosts = async (userId: string): Promise<PostDocument[]> => {
// 	try {
// 		const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.equal('creator', userId)]);

// 		return posts.documents.map((post: any) => ({
// 			...post,
// 			title: post.title,
// 			thumbnail: post.thumbnail,
// 			prompt: post.prompt,
// 			video: post.video,
// 			creator: {
// 				username: post.creator.username,
// 				avatar: post.creator.avatar,
// 			},
// 		})) as PostDocument[];
// 	} catch (error: any) {
// 		console.log(error);
// 		throw new Error(error);
// 	}
// };

const signOut = async () => {
	try {
		const session = await account.deleteSession('current');
		return session;
	} catch (error: any) {
		throw new Error(error);
	}
};

const getUserPosts = async (userId: string): Promise<PostDocument[]> => {
	try {
		const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.equal('creator', userId)]);
		return posts.documents as PostDocument[];
	} catch (error: any) {
		throw new Error(error);
	}
};

const searchPosts = async (query: string): Promise<PostDocument[]> => {
	try {
		const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.search('title', query)]);
		if (!posts) throw new Error('Something went wrong');
		return posts.documents as PostDocument[];
	} catch (error: any) {
		throw new Error(error);
	}
};
const uploadFile = async (file: File, type: string): Promise<string | undefined> => {
	if (!file) return;

	// Destructure required fields from `file`
	const { name, size, type: mimeType, uri } = file;
	const asset = { name, size, type: mimeType, uri };

	try {
		// Upload the file to Appwrite
		const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);

		// Get the file preview or view URL
		const fileUrl = await getFilePreview(uploadedFile.$id, type);
		return fileUrl;
	} catch (error: any) {
		throw new Error(error);
	}
};

const getFilePreview = async (fileId: string, type: string): Promise<string | undefined> => {
	let fileUrl;
	try {
		if (type === 'video') {
			// Get the video view URL and convert it to string
			fileUrl = storage.getFileView(appwriteConfig.storageId, fileId).toString();
		} else if (type === 'image') {
			// Use `ImageGravity` enum to specify gravity instead of string
			// fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 100).toString();
		} else {
			throw new Error('Invalid file type');
		}

		if (!fileUrl) throw new Error('File URL not found');
		return fileUrl;
	} catch (error: any) {
		throw new Error(error);
	}
};

const createVideoPost = async (form: { title: string; thumbnail: File; video: File; prompt: string; userId: string }): Promise<PostDocument> => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([uploadFile(form.thumbnail, 'image'), uploadFile(form.video, 'video')]);
		const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, ID.unique(), {
			title: form.title,
			thumbnail: thumbnailUrl,
			video: videoUrl,
			prompt: form.prompt,
			creator: form.userId,
		});
		return newPost as PostDocument;
	} catch (error: any) {
		throw new Error(error);
	}
};

const getAccount = async (): Promise<Models.User<Models.Preferences>> => {
	try {
		const currentAccount = await account.get();
		return currentAccount;
	} catch (error: any) {
		throw new Error(error);
	}
};

export { signIn, createUser, getCurrentUser, getAllPosts, PostDocument, getLatestPosts, signOut, getUserPosts };
