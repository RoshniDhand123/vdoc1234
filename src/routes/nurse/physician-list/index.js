import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import Loading from "../../../components/loader";
import Detail from "./detail";
import ModalComponent from "../../../components/modal";
import { getPhysicianRequestList, getPhysicianInfo } from "../../../services/apis/index";
import { parseRequestsList, parsePhysicianRequestsList, parsePhysicianRecordInfo } from "../../../services/helper/index";
import { PatientReportType } from "../patient-reports";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import SearchBy from "../../../components/SearchByInput";


const headCells = [
	{ name: 'Id', label: 'ID' },
	{ name: 'Name', label: 'Name' },
	{ name: 'Dob', label: 'DOB' },
	{ name: "Email", label: "Email" },
	//{ name: "Date", label: "Date" },
	{ name: "Address", label: "Address" },
	{ name: "Contact", label: "Contact" },
    { name: "action", label: "Action" },
];
let id=-1;
class PhysicianList extends React.PureComponent{
	state = {
		loading: true,
		details: [],
		searchDetails:[],
		total: 0,
		open:false,
		physician_reportInfo:[],
		searchData: "",
		searchBy: "",
		fields: [],
		count: 0,
		physicianId:-1,
		patientDetails:[]
	};

	componentDidMount() {
		this.getRequestList();
	}

	getRequestList = async () => {
		let resp = await getPhysicianRequestList();
		let button={
			btnTxt: "View",
			classname: "nurse btn videoCallButton",
			method: this.getUserRecord,
		}
		console.log("heyy2",resp.data.status)
		if (resp.data.status) {
			let data = parsePhysicianRequestsList(resp.data.data,[button])
			this.setState({ details: data ,patientDetails:data});
			//console.log("inside details",this.state.details,data);
		}
		this.setState({ loading: false });
	};

	getUserRecord = async (row) => {
		console.log("row", row,row.Id);
		this.setState({physicianId:row.Id});
		id=row.Id;
		console.log("physician id SET",this.state.physicianId,id);
		//currently not live ...
		let resp = await getPhysicianInfo(row.Id);
		// let resp = await getParticularUserRecord(row.Id);
		 console.log("resp", resp);
		 console.log("resp for button click", resp.data);
		let parseData =  parsePhysicianRecordInfo(resp.data);
		this.setState({ physician_reportInfo: parseData ,open: true });
		//this.setState({ open: true });
	};
    
	
    
	onEnter = async (search_value, search_by) => {
		console.log("search_by", search_value);

		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn",
			method: this.getUserRecord,
		};
		this.setState({ searchData: search_value });
		let original_list = this.state.details;
		let phys_List= this.state.patientDetails;
		console.log("check searching??",phys_List);
		if(search_value!="")
		{
			let filterData=[];
			phys_List.map((value)=>{
				Object.values(value).map((key)=>{
					if(key.toString().toLowerCase().includes(search_value.toLowerCase()))
					{
						if(filterData.indexOf(value)<0)
						filterData.push(value);
					}
				})

			});
			this.setState({details:filterData})
			//this.setState({details:phys_List})
			console.log("filterData if",this.state.filterValues);
		}else if(search_value===""){
			console.log('this.details:', phys_List)
			this.setState({details:phys_List})
			// this.setState({ details: [] }, ()=>{
			// 	this.setState({
			// 		details: [...this.details]
			// 	})
			// })
		}
		else{
			console.log("+++")
		}
		console.log("detail in state",this.state.details)
		// else{
		// 	this.setState({details:search_list});
		// }

		// //this.setState({details:search_list});
		// //console.log("insiSearch", search_list);
		// //console.log("inside search",phys_List.map(i=>{}))
		// if(search_value ===""){
		// 	this.setState({searchDetails: this.state.details})
        //     console.log("emptyyyyy",this.state.searchDetails);
		// 	console.log("helooooo",this.state.details);
		// } else{
		// 	this.setState({searchDetails:search_list});
		// }
		
	};

	getReport = (data) => {
		console.log("get modal data", data);
		if (data === "cancelButton") {
			console.log("cancelButtonClick");
		}
		this.setState({ open: false });
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
		let { loading, total, details, open, physician_reportInfo,fields,searchDetails,searchData} = this.state;
			 
		return (
			<>
			    {open && (
					<ModalComponent open={open} alongSidebar={true}>
						<Detail buttonAction={this.getReport} prevReport={physician_reportInfo} id={id}/>
					</ModalComponent>
				)}
				<div className="content nurse nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.PHYSICIAN_LIST}
					</Typography>
					<div className="table-container">
						<SearchBy
						placeholder="Type here"
						searchByList={fields}
						onEnter={this.onEnter}
						SearchByText="Search By"
						SearchButtonText="Search"
						buttonCss="nurse btn"
						searchByButton={false}
						/>
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

export default PhysicianList;