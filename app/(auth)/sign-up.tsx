import { View, Image, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
	const [formFields, setformFields] = useState({
		email: '',
		username: '',
		password: '',
	});

	const [submitting, setSubmitting] = useState(false);
	const onSubmit = async () => {
		if (!formFields.email || !formFields.password || !formFields.username) {
			Alert.alert('Error, Please fill in all details');
		}
		setSubmitting(true);
		try {
			const { username, email, password } = formFields;
			console.log(username, email, password);
			const result = await createUser(email, password, username);
			router.replace('/home');
		} catch (error: any) {
			Alert.alert(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] justify-center px-4 my-6  ">
					<Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
					<Text className="text-2xl text-white text-semibold font-psemibold mt-10">Sign Up</Text>

					<FormField
						title="Username"
						value={formFields.username}
						handleChangeText={(e) => {
							setformFields({ ...formFields, username: e });
						}}
						placeholder="Your unique username"
						otherStyles="mt-5"
						keyboardType="user-name"
					/>
					<FormField
						title="Email"
						value={formFields.email}
						handleChangeText={(e) => {
							setformFields({ ...formFields, email: e });
						}}
						placeholder="Email Address"
						otherStyles="mt-5"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={formFields.password}
						placeholder="Password"
						handleChangeText={(e) => {
							setformFields({ ...formFields, password: e });
						}}
						otherStyles="mt-7"
						keyboardType="password"
					/>
					<CustomButton title="Sign Up" handlePress={onSubmit} containerStyles="mt-7" isLoading={submitting} />
					<View className="justify-center flex-row pt-5 gap-2">
						<Text className="text-lg text-gray-100 font-psemibold">Already have an account?</Text>
						<Link href="/sign-in" className="text-lg font-psemibold text-secondary-200">
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
