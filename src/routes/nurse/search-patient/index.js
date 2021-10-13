import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import SearchBy from "../../../components/SearchByInput";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import TableComponent from "../../../components/Table";
import PatientChart from "../patient-chart";
import {
	getAllPatientList,
	getSearchList,
	patientMedicationOrder,
} from "../../../services/apis/index";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";

const headers = [
	{ name: "first_name", label: "First Name" },
	{ name: "last_name", label: "Last Name" },
	{ name: "email", label: "Email" },
	{ name: "dob", label: "DOB" },
	{ name: "action", label: "Action" },
]

const patientDetails = [
	{
		"Patient Name": "Ravi",
		"No. Of Orders": "1",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Ashna",
		"No. Of Orders": "5",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Parveen",
		"No. Of Orders": "10",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Vivek",
		"No. Of Orders": "12",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Surekha",
		"No. Of Orders": "2",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Ravi",
		"No. Of Orders": "3",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
];

// type PatientType = {
// 	dob: string;
// 	email: string;
// 	first_name: string;
// 	last_name: string;
// 	action?: any;
// }

const parseSearchPatient = (patients, button) => {
	return patients.map((patient) => ({
		...patient,
		action: button
	}))
}

class SearchPatient extends React.PureComponent{
	state = {
		open: false,
		loading: false,
		fields: [],
		searchData: "",
		searchBy: "",
		details: [],
		count: 0
	};

	componentDidMount() {
		this.getUserData();
	}

	getUserData = async () => {
		this.setState({ loading: true });
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn",
			method: this.getUserRecord,
		};
		let resp = await getAllPatientList("");
		console.log("patientresp", resp);
		if (resp.data && resp.data.status) {
			const { data = [], count = 0 } = resp.data;
			this.setState({
				details: parseSearchPatient(data, [button]),
				count
			});
			this.getFieldsValue(this.state.details[0]);
		}
		this.setState({ loading: false });
	};

	getUserRecord = async (row) => {
		// const requestId = "12";
		// let resp = await patientMedicationOrder(requestId);
		this.setState({ open: true });
		//console.log("row", row);
	};

	closeModel = () => {
		this.setState({ open: false });
	};

	onEnter = async (search_value, search_by) => {
		console.log("search_by", search_value);
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn",
			method: this.getUserRecord,
		};
		this.setState({ searchData: search_value });
		if (search_by !== "") {
			this.setState({ searchBy: search_by });
			this.setState({ loading: true });
			let resp = await getSearchList({ search_value, search_by });
			console.log("respon...e", resp);
			if (resp.data && resp.data.status) {
				const { data = [], count = 0 } = resp.data;
				this.setState({
					details: parseSearchPatient(data, [button]),
					count,
					loading: false
				});
			}
		} else if (search_value) {
			this.setState({ searchBy: "" });
			//this.setState({ loading: true });
			let resp = await getAllPatientList(search_value);

			if (resp.data && resp.data.status) {
				const { data = [], count = 0 } = resp.data;
				this.setState({
					details: parseSearchPatient(data, [button]),
					count
				});
			}
		} else {
			let resp = await getAllPatientList(search_value);
			if (resp.data && resp.data.status) {
				const { data = [], count = 0 } = resp.data;
				this.setState({
					details: parseSearchPatient(data, [button]),
					count
				});
			}
			console.log("check");
		}
		//console.log("search_value", search_value);
		//this.setState({ loading: false });
	};

	getFieldsValue = (patientObject) => {
		let fields = [];
		Object.keys(patientObject).map((field) => fields.push(field));
		this.setState({ fields: fields });
	};
	_loadDetails = async (page = 0, perPage = 10) => {
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn",
			method: this.getUserRecord,
		};
		this.setState({ loading: true });
		let resp = await getAllPatientList("", `&page=${page + 1}`);
		if (resp.data && resp.data.status) {
			const { data = [], count = 0 } = resp.data;
			this.setState({
				details: [...this.state.details, ...parseSearchPatient(data, [button])],
				count,
				loading: false
			});
		}
		else this.setState({ loading: false });
	}
	onPageChange = async (perPage, page) => {
		const { count, details = [] } = this.state;
		if (count > details.length && (page + 1) * perPage > details.length)
			await this._loadDetails(page, perPage);
		return this.state.details;
	}
	render() {
		const { loading, open, details, fields, count } = this.state;
		return (
			<>
				{open && (
					<ModalComponent open={open} alongSidebar={true}>
						<PatientChart closeModel={this.closeModel} />
					</ModalComponent>
				)}
				<div className="content nurse nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.SEARCH_PATIENT}
					</Typography>
					<SearchBy
						placeholder="Type here"
						searchByList={fields}
						onEnter={this.onEnter}
						SearchByText="Search By"
						SearchButtonText="Search"
						buttonCss="nurse btn"
					/>
					<div className="table-container">
						<TableCmp
							onPageChange={this.onPageChange}
							total={count}
							data={details}
							headers={headers}
							title={""}
						/>
					</div>
				</div>
				<Loading show={loading} />
			</>
		);
	}
}

export default SearchPatient;
