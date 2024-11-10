import { View, Image, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '@/lib/appwrite';

const SignIn = () => {
	const [formFields, setformFields] = useState({
		email: '',
		password: '',
	});

	const [submitting, setSubmitting] = useState(false);
	const onSubmit = async () => {
		if (!formFields.email || !formFields.password) {
			Alert.alert('Error, Please fill in all details');
		}
		setSubmitting(true);
		try {
			const { email, password } = formFields;
			console.log(email, password);
			await signIn(email, password);
			router.replace('/home');
		} catch (error: any) {
			console.log(error.message);
			Alert.alert(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] justify-center px-4 my-6  ">
					<Image source={images.graphytlogo} resizeMode="contain" className="w-[115px] h-[100px]" />
					<Text className="text-2xl text-white text-semibold font-psemibold mt-10">Sign In</Text>

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
					<CustomButton title="Sign In" handlePress={onSubmit} containerStyles="mt-7" isLoading={submitting} />
					<View className="justify-center flex-row pt-5 gap-2">
						<Text className="text-lg text-gray-100 font-psemibold">Don't have an account?</Text>
						<Link href="/sign-up" className="text-lg font-psemibold text-secondary-200">
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
