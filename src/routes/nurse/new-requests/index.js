import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import {
	getUserRequestList,
	acceptRejectRequestList,
} from "../../../services/apis/index";
import Loading from "../../../components/loader";
import { parseRequestsList } from "../../../services/helper/index";
import { notifError, notifSuccess } from "../../util";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";

// const headCells = [
// 	{ name: 'Id', label: 'ID' },
// 	{ name: 'Name', label: 'Name' },
// 	{ name: 'Dob', label: 'DOB' },
// 	{ name: "Email", label: "Email" },
// 	{ name: "Date", label: "Date" },
// 	{ name: "Time", label: "Time" },
// 	{ name: "Status", label: "Status" },
// 	{ name: "action", label: "Action" },

// ];

// class Request extends React.Component{
// 	state = {
// 		details: [],
// 		loading: true,
// 		current: 0,
// 		next: false,
// 		previous: false,
// 		count: 0,
// 	};

// 	componentDidMount() {
// 		this.getNewRequestList();
// 	}

// 	getNewRequestList = async () => {
// 		let resp = await getUserRequestList("pending");
// 		if (resp.data && resp.data.status) {
// 			this.setState({
// 				details: parseRequestsList(resp.data.data, [{
// 					btnTxt: "Accept",
// 					classname: "style",
// 					method: this.acceptRequest,
// 				}, {
// 					btnTxt: "Reject",
// 					classname: "style",
// 					method: this.rejectRequest,
// 				}]),
// 				count: resp.data.count,
// 				next: resp.data.next ? true : false,
// 				loading: false,
// 			});
// 		}
// 		//this.setState({ loading: false });
// 	};

// 	acceptRequest = async (row) => {
// 		this.setState({ loading: true });
// 		let payload = { id: row.Id, status: "Accept" };
// 		let resp = await acceptRejectRequestList(payload);
// 		console.log("resp..", resp);
// 		const { data: { status = false, msg = "" } } = resp;
// 		if (status)
// 			notifSuccess("New Requests", msg);
// 		else notifError("New Requests", msg || "something went wrong.")
// 		this.getNewRequestList();
// 	};

// 	rejectRequest = async (row) => {
// 		this.setState({ loading: true });
// 		let payload = { id: row.Id, status: "Reject" };
// 		let resp = await acceptRejectRequestList(payload);
// 		console.log("resp", resp);
// 		const { data: { status = false, msg = "" } } = resp;
// 		if (status)
// 			notifSuccess("New Requests", msg);
// 		else notifError("New Requests", msg || "something went wrong.")
// 		this.getNewRequestList();
// 	};

// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevState.details !== this.state.details) {
// 			console.log(" state has changed.");
// 		}
// 	}

// 	setPageData = async (page) => {
// 		let resp;
// 		let moveForward = "";
// 		this.setState({ loading: true });
// 		if (page > this.state.current && this.state.next === true) {
// 			resp = await getUserRequestList(`pending?page=${page + 1}`);
// 			{
// 				resp.data ? (moveForward = "yes") : (moveForward = "no");
// 			}
// 			console.log("nextApi hit", resp);
// 		} else if (page < this.state.current && page !== 0) {
// 			resp = await getUserRequestList(`pending?page=${page + 1}`);
// 			{
// 				resp.data ? (moveForward = "yes") : (moveForward = "no");
// 			}
// 			console.log("backApiHit", resp);
// 		} else if (page === 0) {
// 			resp = await getUserRequestList("pending");
// 			{
// 				resp.data ? (moveForward = "yes") : (moveForward = "no");
// 			}
// 			console.log("initialData", resp);
// 		}
// 		if (moveForward === "yes") {
// 			if (resp.data && resp.data.status) {
// 				this.setState({
// 					details: parseRequestsList(resp.data.data,
// 						[{
// 							btnTxt: "Accept",
// 							classname: "style",
// 							method: this.acceptRequest,
// 						}, {
// 							btnTxt: "Reject",
// 							classname: "style",
// 							method: this.rejectRequest,
// 						}]),
// 					current: page,
// 					next: resp.data.next ? true : false,
// 					previous: resp.data.previous ? true : false,
// 				});
// 				// console.log(
// 				// 	"currentPage",
// 				// 	this.state.current,
// 				// 	this.state.next,
// 				// 	this.state.previous
// 				// );
// 			}
// 		} else notifError("", "No further Data exist");
// 		this.setState({ loading: false });
// 	};

// 	onPageChange = async (perPage, page) => {
// 		const { count, details = [] } = this.state;
// 		if (count > details.length && (page + 1) * perPage > details.length)
// 			await this.setPageData(page);
// 		return this.state.details;
// 	}

// 	render() {
// 		const { count, details, loading } = this.state;
// 		return (
// 			<>
// 				<div className="content nurse nursePageContainer">
// 					<Typography variant="h3" gutterBottom>
// 						{CONSTANTS.NEW_REQUESTS}
// 					</Typography>
// 					<div className="table-container">
// 						<TableCmp
// 							onPageChange={this.onPageChange}
// 							total={count}
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

// export default Request;
