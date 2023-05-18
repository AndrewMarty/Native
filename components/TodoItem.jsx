import styled from "styled-components";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "./CheckBox";
import React from "react";
const TodoWrapper = styled.View`
	padding: 8px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-radius: 6px;
	margin-bottom: 16px;
`;
const TodoText = styled.Text`
	color: #dadada;
	font-size: 18px;
	width: 100%;
	position: relative;
	margin-right: 10px;
	font-family: "Inter-Medium";
`;
const Trash = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;
	background: #454545;
	border-radius: 4px;
	border: 2px solid #0e0e11;
`;
const Row = styled.View`
	flex-direction: row;
`;
const Wrap = styled.View`
	flex: 1;
	flex-direction: row;
	margin-right: 10px;
	position: relative;
`;
const Line = styled.View`
	position: absolute;
	top: 50%;
	width: 100%;
	height: 2px;
	background: #fff;
	z-index: 1;
	opacity: 0;
`;
export const TodoItem = ({ data, del }) => {
	const [complete, setComplete] = React.useState(data.complete);
	function toggleTodo() {
		if (complete) {
			setComplete(false);
			fetch(`http://192.168.100.141:5000/unset/${data._id}`, {
				method: "PUT",
			})
				.then(response => {
					if (response.ok) {
						setComplete(true);
					}
				})
				.catch(err => {
					alert("Error: " + err.message);
				});
		} else {
			setComplete(true);
			fetch(`http://192.168.100.141:5000/complete/${data._id}`, {
				method: "PUT",
			})
				.then(response => {
					if (response.ok) {
						setComplete(false);
					}
				})
				.catch(err => {
					alert("Error: " + err.message);
				});
		}
	}
	return (
		<TodoWrapper>
			<CheckBox state={complete} onClick={toggleTodo} />
			<Wrap>
				<Line style={complete && { opacity: 1 }} />
				<TodoText>{data.name}</TodoText>
			</Wrap>
			<Row>
				<Trash
					onPress={() => {
						del(data._id);
					}}
				>
					<Text>
						<Icon
							name="trash"
							style={{ color: "#fff" }}
							size={12}
							color="#fff"
						/>
					</Text>
				</Trash>
			</Row>
		</TodoWrapper>
	);
};
