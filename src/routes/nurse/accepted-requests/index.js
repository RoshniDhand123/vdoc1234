import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import Loading from "../../../components/loader";
import { getUserRequestList } from "../../../services/apis/index";
import { parseRequestsList } from "../../../services/helper/index";
import { PatientReportType } from "../patient-reports";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";


const headCells = [
	{ name: 'Id', label: 'ID' },
	{ name: 'Name', label: 'Name' },
	{ name: 'Dob', label: 'DOB' },
	{ name: "Email", label: "Email" },
	{ name: "Date", label: "Date" },
	{ name: "Time", label: "Time" },
	{ name: "Status", label: "Status" },
];

class AcceptedRequests extends React.PureComponent{
	state = {
		loading: true,
		details: [],
		total: 0
	};

	componentDidMount() {
		this.getRequestList();
	}

	getRequestList = async () => {
		let resp = await getUserRequestList("upcoming");
		if (resp.data && resp.data.status) {
			this.setState({ details: parseRequestsList(resp.data.data) });
		}
		console.log("status", resp);
		this.setState({ loading: false });
	};
	_loadDetails = async (page = 0, perPage = 10) => {
	}

	onPageChange = async (perPage, page) => {
		const { total, details = [] } = this.state;
		if (total > details.length && (page + 1) * perPage > details.length)
			await this._loadDetails(page, perPage);
		return this.state.details;
	}
	render() {
		let { loading, total, details } = this.state;
		return (
			<>
				<div className="content nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.PATIENT_LIST}
					</Typography>
					<div className="table-container">
						<TableCmp
							onPageChange={this.onPageChange}
							total={total}
							data={details}
							headers={headCells}
							title={""}
						/>
					</div>
				</div>
				<Loading show={loading} />
			</>
		);
	}
}

export default AcceptedRequests;