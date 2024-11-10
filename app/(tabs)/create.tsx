import { useState } from 'react';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { icons } from '../../constants';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
const CreateComic = () => {
	const [form, setForm] = useState({
		comicName: '',
		authorName: '',
		genre: 'supernatural',
		description: '',
		bannerImage: null,
		coverImage: null,
	});

	const genres = ['supernatural', 'fantasy', 'comedy', 'action', 'adventure', 'slice of life', 'drama', 'superhero', 'thriller', 'romance'];

	const openPicker = async (imageType: string) => {
		const result = await DocumentPicker.getDocumentAsync({
			type: ['image/png', 'image/jpg'],
		});

		if (!result.canceled) {
			setForm({
				...form,
				[imageType]: result.assets[0],
			});
		} else {
			setTimeout(() => {
				Alert.alert('Document picked', JSON.stringify(result, null, 2));
			}, 100);
		}
	};

	const submit = async () => {
		if (form.comicName === '' || form.authorName === '' || form.description === '' || !form.bannerImage || !form.coverImage) {
			return Alert.alert('Please provide all fields');
		}

		console.log('Submitting form:', form);
		Alert.alert('Success', 'Comic book added successfully');
		router.push('/home');
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView className="px-4 my-6">
				<Text className="text-2xl text-white font-psemibold">Add New Comic</Text>

				<FormField title="Comic Name" value={form.comicName} placeholder="Enter the name of your comic..." handleChangeText={(e: any) => setForm({ ...form, comicName: e })} otherStyles="mt-10" />

				<FormField title="Author Name" value={form.authorName} placeholder="Enter the author's name..." handleChangeText={(e: any) => setForm({ ...form, authorName: e })} otherStyles="mt-7" />

				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">Genre</Text>
					<View className="border-2 border-stone-800 rounded-2xl">
						<Picker selectedValue={form.genre} onValueChange={(itemValue: any) => setForm({ ...form, genre: itemValue })} style={{ color: 'white' }}>
							{genres.map((genre) => (
								<Picker.Item key={genre} label={genre.charAt(0).toUpperCase() + genre.slice(1)} value={genre} />
							))}
						</Picker>
					</View>
				</View>

				<FormField title="Description" value={form.description} placeholder="Describe your comic..." handleChangeText={(e: any) => setForm({ ...form, description: e })} otherStyles="mt-7" />

				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">Banner Image</Text>
					<TouchableOpacity onPress={() => openPicker('bannerImage')}>
						{form.bannerImage ? (
							<Image source={{ uri: '' }} resizeMode="cover" className="w-full h-40 rounded-2xl" />
						) : (
							<View className="w-full h-40 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center">
								<Image source={icons.upload} resizeMode="contain" alt="upload" className="w-10 h-10" />
								<Text className="text-sm text-gray-100 font-pmedium mt-2">Upload Banner Image</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">Cover Image</Text>
					<TouchableOpacity onPress={() => openPicker('coverImage')}>
						{form.coverImage ? (
							<Image source={{ uri: '' }} resizeMode="cover" className="w-full h-64 rounded-2xl" />
						) : (
							<View className="w-full h-64 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center">
								<Image source={icons.upload} resizeMode="contain" alt="upload" className="w-10 h-10" />
								<Text className="text-sm text-gray-100 font-pmedium mt-2">Upload Cover Image</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<CustomButton title="Save Comic & publish" handlePress={submit} containerStyles="mt-7" />
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateComic;
