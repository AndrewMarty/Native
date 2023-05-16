import styled from "styled-components";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const CheckBoxWrap = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: 20px;
	height: 20px;
	border-radius: 4px;
	border: 2px solid #454545;
	margin-right: 8px;
	background: #1f1f1f;
`;
export const CheckBox = ({ state, onClick }) => {
	return (
		<CheckBoxWrap
			onPress={() => {
				onClick();
			}}
			style={state && styles.active}
		>
			<Text>
				<Icon
					name="check"
					style={state ? styles.activeIcon : styles.disableIcon}
					size={10}
					color="#fff"
				/>
			</Text>
		</CheckBoxWrap>
	);
};
const styles = StyleSheet.create({
	active: {
		backgroundColor: "#454545",
	},
	disableIcon: {
		color: "transparent",
	},
	activeIcon: {
		color: "#fff",
	},
});
