import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import { getPatientHistoryList ,getPatientReport} from "../../../services/apis/index";
import { parseRequestsList, parsePatientRecordInfo} from "../../../services/helper/index";
import Detail from "./detail";
import { PatientReportType } from "../patient-reports";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";

const headCells = [
	{ name: 'Id', label: 'ID' },
	{ name: 'Name', label: 'Name' },
	{ name: 'Dob', label: 'DOB' },
	{ name: "Email", label: "Email" },
	//{ name: "Address", label: "Address" },
	{ name: "Contact", label: "Contact" },
	{ name: "Status", label: "Status" },
	
];

class History extends React.PureComponent{
	state = {
		loading: true,
		details: [],
		total: 0,
		open: false,
		patient_reportInfo: [],
	};
	componentDidMount() {
		this.getRequestList();
	}
    
	getRequestList = async () => {
		let resp = await getPatientHistoryList();
		//console.log(resp,"heyyyyyyyyy");
		let button=[{
			btnTxt: "View",
			classname: "nurse btn videoCallButton",
			method: this.getUserRecord,
		    }
		]
		
		//console.log("heyyyy", resp.data);
		//console.log("heyyyy", resp.data.status);
		if (resp.data.status) {
			this.setState({ details: parseRequestsList(resp.data.data,button) });
		}
		this.setState({ loading: false });
	};

// 	getUserRequestHistory = async (page) => {
// 		this.setState({ loading: true })
// 		let resp = await getUserRequestList("rejected");
// 		if (resp.data && resp.data.status) {
// 			const { data = [], count = 0 } = resp.data;
// 			this.setState({ loading: false, count, details: parseRequestsList(data) });
// 		} else this.setState({ loading: false })
// 		console.log("resp", resp);
// 	};
_loadDetails = async (page = 0, perPage = 10) => {
}

onPageChange = async (perPage, page) => {
	const { total, details = [] } = this.state;
	if (total > details.length && (page + 1) * perPage > details.length)
		await this._loadDetails(page, perPage);
	return this.state.details;
}
render() {
	let { loading, total, details ,open, patient_reportInfo } = this.state;
	return (
		<>
			{open && (
				<ModalComponent open={open} alongSidebar={true}>
					<Detail buttonAction={this.getReport} prevReport={patient_reportInfo} />
				</ModalComponent>
			)}
			<div className="content nurse nursePageContainer">
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
export default History;
