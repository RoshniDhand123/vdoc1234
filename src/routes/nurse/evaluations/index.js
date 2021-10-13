import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import CallCard from "../../../components/call-card";
import { getPatientList } from "../../../services/apis/index";
import Loading from "../../../components/loader";
import { parseEvaluationRequestList } from "../../../services/helper/index";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import VideoCall from "../../../components/VideoCalling";
import ModalComponent from "../../../components/modal";

const headers = [
	{ name: "Patient Name", label: "Patient Name" },
	{ name: "Appointment Time", label: "Appointment Time" },
	{ name: "Date Of Birth", label: "Date Of Birth" },
	{ name: "action", label: "Action" },
]

//import OneSignal from "react-onesignal";

// const Call = (
// 	<ButtonComponent btnText="start Video call" className="nurse btn" />
// );

class Evaluations extends React.PureComponent {
	// state = {
	// 	first_appointmentTime: "",
	// 	details: [],
	// 	loading: false,
	// 	filterArray: [],
	// 	count: 0,
	// 	open: false
	// };
	// timer;
	// componentDidMount = async () => {
	// 	this.getPatientDetailList();
	// };
	// componentWillUnmount = () => {
	// 	clearInterval(this.timer);
	// };

	// checkValidAppointmentTime = (time) => {
	// 	let d = new Date();
	// 	let start_hr = 0,
	// 		start_min = 0,
	// 		end_hr = 0,
	// 		end_min = 0;
	// 	let current_hr = d.getHours();
	// 	let current_min = d.getMinutes();
	// 	start_hr = parseInt(time.substring(0, 2));
	// 	start_min = parseInt(time.substring(3, 5));
	// 	if (parseInt(time.substring(3, 5)) + 15 >= 60) {
	// 		end_hr = start_hr + 1;
	// 		end_min = parseInt(time.substring(3, 5)) + 15 - 60;
	// 	} else {
	// 		end_hr = start_hr;
	// 		end_min = parseInt(time.substring(3, 5)) + 15;
	// 	}
	// 	if (
	// 		current_hr > end_hr ||
	// 		(current_hr === end_hr && current_min > end_min)
	// 	) {
	// 		return false;
	// 	}
	// 	return true;
	// };

	// openModel = () => {
	// 	this.setState({ open: true });
	// };
	// closeModal = (callDetails) => {
	// 	console.log("callDetail", callDetails);
	// 	this.setState({ open: false });

	// };

	// checkAppointmentTime = (row) => {
	// 	let d = new Date();
	// 	let time = row["Appointment Time"];
	// 	let current_hr = d.getHours();
	// 	let current_min = d.getMinutes();
	// 	let start_hr;
	// 	let start_min;
	// 	let end_hr;
	// 	let end_min;
	// 	start_hr = parseInt(time.substring(0, 2));
	// 	start_min = parseInt(time.substring(3, 5));
	// 	if (parseInt(time.substring(3, 5)) + 15 > 60) {
	// 		end_hr = start_hr + 1;
	// 		end_min = parseInt(time.substring(3, 5)) + 15 - 60;
	// 	} else {
	// 		end_hr = start_hr;
	// 		end_min = parseInt(time.substring(3, 5)) + 15;
	// 	}
	// 	if (
	// 		(current_hr === end_hr &&
	// 			end_hr === start_hr &&
	// 			start_min <= current_min &&
	// 			current_min <= end_min) ||
	// 		(start_hr < end_hr &&
	// 			(start_min <= current_min || current_min <= end_min))
	// 	) {
	// 		this.openModel();
	// 	} else if (
	// 		current_hr > end_hr ||
	// 		(current_hr === end_hr && current_min > end_min)
	// 	) {
	// 		alert("your time has gone");
	// 	} else {
	// 		alert("your need to wait some time");
	// 	}
	// };

	// filterArrayList = () => {
	// 	let filterData = [];
	// 	let i = 0;
	// 	if (this.state.details) {
	// 		this.state.details.map((object) => {
	// 			Object.entries(object).map(([key, value]) => {
	// 				let data = value;
	// 				if (key === "Appointment Time") {
	// 					let check = this.checkValidAppointmentTime(data);
	// 					if (check) {
	// 						if (filterData.indexOf(object) < 0) {
	// 							let obj = {};
	// 							// get appointment time and request id from first row
	// 							if (i === 0) {
	// 								this.setState({
	// 									first_appointmentTime:
	// 										object["Appointment Time"],
	// 								});
	// 								localStorage.setItem(
	// 									"requestId",
	// 									JSON.stringify(object["Request Id"])
	// 								);
	// 								obj["action"] = [{
	// 									btnTxt: "Start Video Call",
	// 									classname: "nurse btn videoCallButton",
	// 									callBack: this.checkAppointmentTime.bind(this, obj)
	// 								}]
	// 							}
	// 							obj["Patient Name"] = object["Patient Name"];
	// 							obj["Appointment Time"] =
	// 								object["Appointment Time"];
	// 							obj["Date Of Birth"] = object["Dob"];
	// 							filterData.push(obj);
	// 							i++;
	// 						}
	// 					}
	// 				}
	// 			});
	// 		});
	// 		this.setState({ filterArray: filterData });
	// 	} else this.setState({ filterArray: this.state.details });
	// };

	// getPatientDetailList = async () => {
	// 	this.setState({ loading: true });
	// 	let resp = await getPatientList();
	// 	console.log("resp..?", resp);
	// 	if (resp.data.length) {
	// 		localStorage.setItem(
	// 			"nurseId",
	// 			JSON.stringify(resp.data.data[0].nurse_id)
	// 		);
	// 	}
	// 	if (resp.data && resp.data.status) {
	// 		const { data = [], count = 0 } = resp.data;
	// 		await this.setState({
	// 			count,
	// 			details: parseEvaluationRequestList(data,),
	// 		});
	// 		if (data && data.length)
	// 			this.timer = setInterval(this.filterArrayList, 1000);
	// 	}
	// 	this.setState({ loading: false });
	// 	//this.filterArrayList();
	// };
	// _loadDetails = async (page = 0, perPage = 10) => {
	// 	this.setState({ loading: true });
	// 	let resp = await getPatientList(`?page=${page + 1}`);
	// 	if (resp.data && resp.data.status) {
	// 		const { data = [], count = 0 } = resp.data;
	// 		this.setState({
	// 			details: [...this.state.details, ...parseEvaluationRequestList(data)],
	// 			count,
	// 			loading: false
	// 		});
	// 		clearInterval(this.timer);
	// 		this.timer = setInterval(this.filterArrayList, 1000);
	// 	}
	// 	else this.setState({ loading: false });
	// }
	// onPageChange = async (perPage, page) => {
	// 	const { count, details = [] } = this.state;
	// 	if (count > details.length && (page + 1) * perPage > details.length)
	// 		await this._loadDetails(page, perPage);
	// 	return this.state.filterArray;
	// }
	render() {
		// const { open, loading, filterArray, first_appointmentTime, count } = this.state;
		return (
			<div style={{color:'#53dbcf', marginLeft: '80px'}}>
				<h1>Welcome to VDoc</h1>
				<h4>Wait for new things to come....</h4>
			</div>
		);
	}
}

export default Evaluations;
