import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { PostDocument } from './appwrite';

const useAppWrite = (fn: () => Promise<PostDocument[]>) => {
	const [isLoading, setisLoading] = useState(false);
	const [data, setData] = useState<PostDocument[] | []>([]);

	const fetchData = async () => {
		setisLoading(true);
		try {
			const response = await fn();
				setData(response);
		} catch (error: any) {
			Alert.alert('Error', error.message);
		} finally {
			setisLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => fetchData();
	return { data, isLoading, refetch };
};

export default useAppWrite;
