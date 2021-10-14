import React, { useState } from "react";
import ButtonComponent from "../../../components/button";
import { userChat } from "../../../services/apis";
import ChatScreen from  "../chating-module/App";
import "./style.css";


const Detail = (props) => {
	const [data, setReportData] = React.useState();
	const [previous, setPrevious] = React.useState(true);
	const [physicianId, setPhysicianId ]= useState(props.id);

	console.log('physician id in detail page',props.id);
	
    const handleChatClick = async () => {
		// setPhysicianId(props.prevReport[0].Id);
		// let resp = await userChat(physicianId)
		setPrevious(!previous);
	};

	const handleBack=()=>{
		setPrevious(!previous);		
	}

	const getReportData = (e) => {
		//console.log("e", e.target.value);
		setReportData(e.target.value);
	};
	const handlePreviousFile = () => {
		setPrevious(!previous);
	};
	const show = (list,index) => {
		return (
			<div className="border-Bottom">
				{index==0 && <div className="counseling-heading">Counseling List</div>}
				{Object.entries(list).map(([key, value], index) => {
					return (<div className='datatab' style={{display:"flex"}}>
						
							<div className="heading">{key}:</div>
							<div className="info">{value}</div>
							{/* {{key} === "Image"?<div> <div className="heading">{key}:</div>
							<img className="pic" alt="pic" src={`http://192.168.4.54:8001${value}`}/> </div> : <div style={{display:"flex"}}><div className="heading">{key}:</div>
							<div className="info">{value}</div></div>  }  */}
				
						</div>
					); 
				})}
			</div>
		);
	};

	console.log("prevReport", props.prevReport);	
	return (
		
		<div className="PatientDetailContainer">
			{previous ? (
				<div className="previous-record">
					{props.prevReport.length > 0 ? (
						props.prevReport.map(show)
					) : (
						<div className="counseling-msg">Counseling does not exist</div>
					)}
				</div>
			) : (
				<ChatScreen/>
			)}
			<div className="buttonContainer">
				{previous?<ButtonComponent
					btnText={"Chat" }
					className="nurse btn buttonStyle"
					onClick={handleChatClick}
				/>:null}
				{!previous ?<ButtonComponent
					btnText="Back"
					className="nurse btn buttonStyle"
					onClick={handleBack}
				/>:""}
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
