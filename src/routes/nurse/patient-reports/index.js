// import React from "react";
// import { Typography } from "@material-ui/core";
// import { CONSTANTS } from "../../constants";
// import Loading from "../../../components/loader";
// import ModalComponent from "../../../components/modal";
// import {
// 	getUserRequestList,
// 	//getParticularUserRecord,
// 	nurseSetPatientReport,
// 	getPatientReport,
// } from "../../../services/apis/index";
// import {
// 	parseRequestsList,
// 	parseAcceptRequestsList,
// 	parsePatientRecordInfo,
// } from "../../../services/helper/index";
// import Detail from "./detail";
// import { notifError, notifSuccess } from "../../util";
// import TableCmp from "../../../components/tableCmp";
// import { HeadCell } from "../../../components/tableCmp/type";

// const headCells = [
// 	{ name: "Id", label: "ID" },
// 	{ name: "Name", label: "Name" },
// 	{ name: "Dob", label: "DOB" },
// 	{ name: "Email", label: "Email" },
// 	{ name: "Date", label: "Date" },
// 	{ name: "Time", label: "Time" },
// 	{ name: "Status", label: "Status" },
// 	{ name: "action", label: "Action" },
// ];



// class Evaluations extends React.PureComponent{
// 	state = {
// 		details: [],
// 		loading: true,
// 		open: false,
// 		total: 0,
// 		id: -1,
// 		patient_reportInfo: [],
// 		Appointment_Id:-1,
// 	};

// 	componentDidMount() {
// 		this.getAllUserList();
// 	}

// 	getAllUserList = async () => {
// 		let resp = await getUserRequestList("completed");
// 		console.log("report=>", resp);
// 		if (resp.data && resp.data.status) {
// 			let button = {
// 				btnTxt: "View Report",
// 				classname: "nurse btn",
// 				method: this.getUserRecord,
// 			};
// 			const { data = [], count = 0 } = resp.data;
// 			this.setState({
// 				total: count,
// 				details: parseAcceptRequestsList(data, [button]),
// 			});
// 		}
// 		//console.log("status", resp);
// 		this.setState({ loading: false });
// 	};

// 	getUserRecord = async (row) => {
// 		console.log("row==>", row);
// 		let app_id=row["Appointment_Id"];
// 		//currently not live ...
// 		let resp = await getPatientReport(row.Id);
// 		//console.log("Report response", resp);
// 		let parseData = await parsePatientRecordInfo(resp.data.data);
// 		// let resp = await getParticularUserRecord(row.Id);
// 		// console.log("resp", resp);
// 		this.setState({patient_reportInfo:parseData, id: row.Id, open: true,Appointment_Id:app_id });
// 	};

// 	getReport = async (data) => {
// 		//console.log("get", data);
// 		if (data === "cancelButton") console.log("cancelButtonClick");
// 		else {
// 			let payload = { patient_id: this.state.id, detail: data,appointment_id:this.state.Appointment_Id };
// 			let resp = await nurseSetPatientReport(payload);
// 			if (resp.data && resp.data.status) {
// 				notifSuccess(
// 					"Report Submission",
// 					"Report Submitted successfully"
// 				);
// 			} else notifError("Report not submitted");
// 			//console.log("resp+", resp);
// 		}
// 		this.setState({ open: false });
// 	};
// 	_loadDetails = async (page = 0, perPage = 10) => {};

// 	onPageChange = async (perPage, page) => {
// 		const { total, details = [] } = this.state;
// 		if (total > details.length && (page + 1) * perPage > details.length)
// 			await this._loadDetails(page, perPage);
// 		return this.state.details;
// 	};

// 	render() {
// 		const { loading, open, details, total,patient_reportInfo } = this.state;
// 		return (
// 			<>
// 				{open && (
// 					<ModalComponent open={open} alongSidebar={true}>
// 						<Detail buttonAction={this.getReport} prevReport={patient_reportInfo}/>
// 					</ModalComponent>
// 				)}
// 				<div className="content nurse nursePageContainer">
// 					<Typography variant="h3" gutterBottom>
// 						{CONSTANTS.PATIENT_REPORTS}
// 					</Typography>
// 					<div className="table-container">
// 						<TableCmp
// 							onPageChange={this.onPageChange}
// 							total={total}
// 							data={details}
// 							headers={headCells}
// 							title={""}
// 						/>
// 					</div>
// 				</div>
// 				<Loading show={loading} />
// 			</>
// 		);
// 	}
// }

// export default Evaluations;
