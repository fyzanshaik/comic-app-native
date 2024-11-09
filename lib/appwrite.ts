import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
	endPoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.fyzanshaik.auro',
	projectId: '672e3f6700264460c02f',
	databaseId: '672e40890022c262b753',
	userCollectionId: '672e40af00087a59c333',
	videoCollectionId: '672e40890022c262b753',
	storageId: '672e41f50007c28f5751',
};

const client = new Client();
client.setEndpoint(appwriteConfig.endPoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

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

export { signIn, createUser, getCurrentUser };
