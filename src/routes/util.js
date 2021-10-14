import { store as notify } from "react-notifications-component";

export const resetRouter = () => {
	window.location.href = "/";
};

export const notifError = (title, message) => {
	notify.addNotification({
		title,
		message,
		type: "danger",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	});
};

export const notifSuccess = (title, message) => {
	notify.addNotification({
		title,
		message,
		type: "success",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	});
};

export const notifWarning = (title, message) => {
	notify.addNotification({
		title,
		message,
		type: "warning",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	});
};

export const verifyPassword = (value) => {
	if (
		value.length < 8 ||
		!/[a-z]/.test(value) ||
		!/[A-Z]/.test(value) ||
		!/[0-9]/.test(value) ||
		!/[!@#\$%\^&\*]/.test(value)
	) {
		return "Password should contain : \n Minimum length of 8 characters \n Atleast 1 Numeric character \n Atleast 1 Uppercase letter \n Atleast 1 Lowercase letter \n Atleast 1 Special character";
	}

	return "";
};

export const removeBlankInput = (values) => {
	let keys = Object.keys(values);
	let payload = {};
	keys.map((key) => {
		if (!key.includes("-input")) {
			payload[key] = values[key];
		} else if (key.includes("-input") && values[key] !== "") {
			payload[`${key}`] = values[key];
		}
	});
	return payload;
};

const preZero = (n) => (n > 9 ? n : "0" + n);

export const formatDate = (d) => {
	return `${preZero(d.getMonth() + 1)}/${preZero(
		d.getDate()
	)}/${d.getFullYear()}`;
};

export const formatDateTime = (d) => {
	return `${preZero(d.getMonth() + 1)}/${preZero(
		d.getDate()
	)}/${d.getFullYear()} ${preZero(d.getHours())}:${preZero(d.getMinutes())}`;
	// ${parseHourAndMinutes(d)}`;
};

export const parseHourAndMinutes = (d) => {
	let hour = d.getHours();
	let min = preZero(d.getMinutes());
	if (hour > 12) return preZero(hour % 12) + ":" + min + " " + "pm";
	else if (hour === 12) return 12 + ":" + min + " " + "pm";
	else if (hour === 0) return 12 + ":" + min + " " + "am";
	else return preZero(hour) + ":" + min + " " + "am";
};
