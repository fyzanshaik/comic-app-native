import { getCurrentUser } from '@/lib/appwrite';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserType = object | null;

type GlobalContextType = {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	user: UserType;
	setUser: (value: UserType) => void;
	isLoading: boolean;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const useGlobalConst = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalConst must be used within a GlobalProvider');
	}
	return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<UserType>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLoggedIn(true);
					setUser(res);
				} else {
					setIsLoggedIn(false);
					setUser(null);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const value: GlobalContextType = {
		isLoggedIn,
		setIsLoggedIn,
		user,
		setUser,
		isLoading,
	};

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalProvider, useGlobalConst };
