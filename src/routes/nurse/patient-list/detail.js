import React, { useState } from "react";
import ButtonComponent from "../../../components/button";
import { getSpecialityList ,assignPhys, userChat } from "../../../services/apis";
import ChatScreen from  "../chating-module/App";
import "./style.css";



const Detail = (props) => {
	console.log("previous Report",props.prevReport)
	const [data, setReportData] = React.useState();
	const [previous, setPrevious] = React.useState(true);
	const [categoryState,setCategoryState] = useState(null);
    const [specialityList,setSpecialityList] = useState();
	const [patientId, setPatientId ]= useState(props.prevReport[0].Id);
    const [physSpeciality,setPhysSpeciality]=useState();

	console.log('hshhs',props);
	const getReportData = (e) => {
		//console.log("e", e.target.value);
		setReportData(e.target.value);
	};
	const handlePreviousFile = async () => {
		//setPrevious(!previous);
		//console.log("props",props.prevReport)
		console.log('speclist+++++',specialityList,physSpeciality,patientId);
		if(specialityList!=undefined && physSpeciality!=undefined){
			let resp = await assignPhys(patientId,physSpeciality)
	    	props.buttonAction("submitData")
			//props.getRequestList
		}
	};

    const handleChatClick = async () => {
		setPrevious(!previous);
		setPatientId(props.prevReport[0].Id);
		let resp = await userChat(patientId)
	};
	const handleBack=()=>{
		setPrevious(!previous);
		console.log("back button click")
	}

    const getSpeciality = async (e)=>{
    //console.log('hello123',e.target.value);
	let resp = await getSpecialityList(e.target.value);
	//console.log('specList',resp.data.data);
	setSpecialityList(resp.data.data);
	setCategoryState(e.target.value)
	//setCategoryState(e.target.value,()=>{setCategoryState(e.target.value)});
	//console.log('state', categoryState,e.target.value);
	console.log('speclist',specialityList,physSpeciality);
	}

	const getPhys = async (e)=>{
		//console.log('hsddd',e.target.value);
		//console.log('heyyyeyey',props.prevReport[0].Id)
		setPatientId(props.prevReport[0].Id);
		setPhysSpeciality(e.target.value);
	}

	const markup =specialityList && specialityList.map((i,idx) => {
     return <option value={i.id} key={idx}>{i.specialty}</option>
	//console.log('heyyye',i);
	})


	const show = (list) => {
		console.log('LIST',list)
		return (
			<div  className="outer-container">
				<div className="main-heading">Patient Detail Information</div>
				{Object.entries(list).map(([key, value], index) => {
					return (
						<div className='datatab' style={{display:"flex"}}>
							<div className="heading">{key}:</div>
							<div className="info">{value}</div>
						</div>
					);
				})}
				<div className="dropDown-heading">Assign Patient</div>
				<div id="physicianSelect">
                  <select id='categoryDropdown' onChange={getSpeciality}>
					<option value='none'></option>
                    <option value='Adults'>Adult</option>
					<option value='Pediatrician'>Pediatrician</option>
				  </select>
				  {categoryState !== null? <select id='specialityDropdown' onChange={getPhys}>
				  <option value='none'></option>
					  {markup}
				  </select> : null}
				  {/* <select id='specialityDropdown'>
					  <option></option>
				  </select> */}
				</div>
			</div>
		);
	};
	return (
		
		<div className="PatientDetailContainer">
			{previous ? (
				<div className="previous-record">
					{props.prevReport.length > 0 ? (
						props.prevReport.map(show)
					) : (
						<div>Previous Report not exist</div>
					)}
					{/* {Object.entries(previousReport).map(([key, value]) => {
						return (
							<div>
								<div className="heading">{key}</div>
								<div>{value}</div>
							</div>
						);
					})} */}
				</div>
			) : (
				<ChatScreen/>
				// <textarea
				// 	className="textArea"
				// 	value={data}
				// 	onChange={getReportData}
				// ></textarea>
			)}
			<div className="buttonContainer">
				{previous?<ButtonComponent
					btnText={"Assign"}
					className="nurse btn buttonStyle"
					onClick={handlePreviousFile}
				/>:null}
				{!previous ?<ButtonComponent
					btnText="Back"
					className="nurse btn buttonStyle"
					onClick={handleBack}
				/>:null}
				{previous?<ButtonComponent
					btnText="Chat"
					className="nurse btn buttonStyle"
					onClick={handleChatClick}
				/>:null}
				<ButtonComponent
					btnText="Cancel"
					className="nurse btn buttonStyle"
					onClick={() => props.buttonAction("cancelButton")}
				/>
			</div>
		</div>
	);
};
export default Detail;
