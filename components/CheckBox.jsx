import styled from "styled-components";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const CheckBoxWrap = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;
	border-radius: 4px;
	border: 2px solid #0e0e11;
	margin-right: 8px;
	background: #2b2d37;
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
