import styled from "styled-components";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "./CheckBox";
import React from "react";
const TodoWrapper = styled.View`
	padding: 8px;
	background: #1f1f1f;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-radius: 6px;
	margin-bottom: 5px;
`;
const TodoText = styled.Text`
	color: #fff;
	font-weight: 500;
	font-size: 16px;
`;
const Trash = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: 20px;
	height: 20px;
	background: #faa401;
	border-radius: 4px;
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
			fetch(`http://192.168.100.141:5000/unset/${data._id}`).then(response => {
				if (!response.ok) {
					setComplete(true);
				}
			});
		} else {
			setComplete(true);
			fetch(`http://192.168.100.141:5000/complete/${data._id}`).then(
				response => {
					if (!response.ok) {
						setComplete(false);
					}
				}
			);
		}
	}
	return (
		<TodoWrapper>
			<Wrap>
				<Line style={complete && { opacity: 1 }} />
				<TodoText>{data.name}</TodoText>
			</Wrap>
			<Row>
				<CheckBox state={complete} onClick={toggleTodo} />
				<Trash
					onPress={() => {
						del(data._id);
					}}
				>
					<Text>
						<Icon
							name="trash"
							style={{ color: "#000" }}
							size={12}
							color="#fff"
						/>
					</Text>
				</Trash>
			</Row>
		</TodoWrapper>
	);
};
