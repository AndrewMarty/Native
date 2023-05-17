import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	TextInput,
	RefreshControl,
	Text,
	FlatList,
	View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
import React, { useCallback } from "react";
import styled from "styled-components";
import { TodoItem } from "./components/TodoItem";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

export default function App() {
	const [fontsLoaded] = useFonts({
		"Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
		"Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
	});
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	const [list, setList] = React.useState([]);
	const [name, setName] = React.useState("");
	const [load, setLoad] = React.useState(true);
	React.useEffect(() => {
		getItems();
	}, []);
	function getItems() {
		setLoad(true);
		fetch("http://192.168.100.141:5000/get")
			.then(response => {
				return response.json();
			})
			.then(data => {
				setList(data);
			})
			.catch(err => {
				alert("Произошла ошибка при получении данных с сервера!");
			});
		setLoad(false);
	}
	function handleSubmit(event) {
		event.preventDefault();
		fetch("http://192.168.100.141:5000/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name.trim(), complete: false }),
		})
			.then(async response => {
				if (response.ok) {
					const item = await response.json();
					const newItems = [...list];
					newItems.push(item);
					setList(newItems);
				}
			})
			.catch(err => {
				alert("Error: " + err.message);
			});
		setName("");
	}
	function deleteTodo(id) {
		fetch(`http://192.168.100.141:5000/delete/${id}`)
			.then(response => {
				if (response.ok) {
					const newItems = list.filter(item => item._id !== id);
					setList(newItems);
				}
			})
			.catch(err => {
				alert("Error: " + err.message);
			});
	}
	if (!fontsLoaded) {
		return null;
	}
	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<Title>Tasks</Title>
			<Inner>
				<Field
					onChangeText={setName}
					value={name}
					placeholder="Add new todo"
					placeholderTextColor="#FFF"
				/>
				<Add onPress={handleSubmit}>
					<Text>
						<Icon name="plus" size={12} color="#fff" />
					</Text>
				</Add>
			</Inner>
			{list.length > 0 ? (
				<>
					<FlatList
						refreshControl={
							<RefreshControl refreshing={load} onRefresh={getItems} />
						}
						data={list}
						renderItem={({ item }) => (
							<TodoItem
								del={deleteTodo}
								data={item}
								keyExtractor={item => item._id}
							/>
						)}
					/>
				</>
			) : (
				<AddTodo>Add own first todo!</AddTodo>
			)}

			<StatusBar style="auto" />
		</View>
	);
}
const AddTodo = styled.Text`
	color: #fff;
	font-weight: 500;
	text-align: center;
`;
const Inner = styled.View`
	flex-direction: row;
	padding: 8px;
	border-radius: 30px;
	background: #2b2d37;
	margin-bottom: 16px;
`;
const Add = styled.TouchableOpacity`
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	min-width: 30px;
	min-height: 30px;
	background-color: #38bc80;
`;
const Field = styled.TextInput`
	flex: 1;
	color: #fff;
	padding: 5px;
	height: 30px;
	font-size: 12px;
	margin-right: 10px;
	border: none;
	width: 100%;
	margin-right: 10px;
	font-weight: 500;
	font-size: 16px;
	background: #2b2d37;
	font-family: "Inter-Medium";
`;
const Title = styled.Text`
	color: #fff;
	font-family: "Inter-Black";
	font-size: 32px;
	margin-bottom: 10px;
	padding-bottom: 5px;
`;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1e1f25",
		color: "#fff",
		paddingTop: Platform.OS === "android" ? 50 : 30,
		paddingLeft: 10,
		paddingRight: 10,
	},
});
