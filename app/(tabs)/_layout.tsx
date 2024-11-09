import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';

interface TabIconProps {
	focused: boolean;
	name: string;
	color: string;
	icon: object;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
	return (
		<View className="items-center justify-center  gap-2 ">
			<Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6 " />
			<Text
				className={`${focused ? 'font-psemibold' : 'font-pregular'} text-sx `}
				style={{
					color: color,
				}}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#FFA001',
					tabBarInactiveTintColor: '#CDCDE0',
					tabBarStyle: {
						backgroundColor: '#161622',
						borderTopWidth: 1,
						borderTopColor: '#232533',
						height: 84,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: 'Home',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} color={color} name="Home" focused={focused}></TabIcon>,
					}}
				/>
				<Tabs.Screen
					name="bookmark"
					options={{
						title: 'Bookmark',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused}></TabIcon>,
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: 'create',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.plus} color={color} name="Create" focused={focused}></TabIcon>,
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: 'Profile',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}></TabIcon>,
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
