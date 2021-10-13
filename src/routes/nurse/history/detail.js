// import React, { useState } from "react";
// import ButtonComponent from "../../../components/button";
// import "./style.css";
// const Detail = (props) => {
// 	const [data, setReportData] = React.useState();

// 	const getReportData = (e) => {
// 		console.log("e", e.target.value);
// 		setReportData(e.target.value);
// 	};

// 	return (
// 		<div className="PatientDetailContainer">
// 			<textarea
// 				className="textArea"
// 				value={data}
// 				onChange={getReportData}
// 			></textarea>
// 			<div className="buttonContainer">
// 				<ButtonComponent
// 					btnText="Submit"
// 					className="nurse btn buttonStyle"
// 					onClick={() => props.buttonAction(data)}
// 				/>
// 				<ButtonComponent
// 					btnText="Cancel"
// 					className="nurse btn buttonStyle"
// 					onClick={() => props.buttonAction("cancelButton")}
// 				/>
// 			</div>
// 		</div>
// 	);
// };
// export default Detail;


import React, { useState } from "react";
import ButtonComponent from "../../../components/button";
import { getSpecialityList ,assignPhys } from "../../../services/apis";
import "./style.css";

// const previousReport = {
// 	physician: "report created by physician",
// 	nurse: "report created by nurse",
// };

//class Detail extends 

const Detail = (props) => {
	const [data, setReportData] = React.useState();
	const [previous, setPrevious] = React.useState(true);
	const [categoryState,setCategoryState] = useState(null);
    const [specialityList,setSpecialityList] = useState();
	const [patientId, setPatientId ]= useState();
    const [physSpeciality,setPhysSpeciality]=useState();
	const getReportData = (e) => {
		//console.log("e", e.target.value);
		setReportData(e.target.value);
	};
	const handlePreviousFile = async () => {
		//setPrevious(!previous);
		//console.log("props",props.prevReport)
        let resp = await assignPhys(patientId,physSpeciality)

	    props.buttonAction("cancelButton")
	};

    const getSpeciality = async (e)=>{
    //console.log('hello123',e.target.value);
	let resp = await getSpecialityList(e.target.value);
	//console.log('specList',resp.data.data);
	setSpecialityList(resp.data.data);
	setCategoryState(e.target.value)
	//setCategoryState(e.target.value,()=>{setCategoryState(e.target.value)});
	//console.log('state', categoryState,e.target.value);
	console.log('speclist',specialityList);
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
		console.log('hadada',list)
		return (
			<div style={{ borderBottom: "1px solid white",  }}>
				{Object.entries(list).map(([key, value], index) => {
					return (
						<div style={{display:"flex"}}>
							<div className="heading">{key}:</div>
							<div className="info">{value}</div>
						</div>
					);
				})}
				<div id="physicianSelect">
                  <select id='categoryDropdown' onChange={getSpeciality}>
					<option value='none'></option>
                    <option value='Adults'>Adult</option>
					<option value='Pediatrician'>Pediatrician</option>
				  </select>
				  {categoryState !== null? <select id='specialityDropdown' onChange={getPhys}>
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
				<textarea
					className="textArea"
					value={data}
					onChange={getReportData}
				></textarea>
			)}
			<div className="buttonContainer">
				<ButtonComponent
					btnText={previous ? "Assign" : "Detail"}
					className="nurse btn buttonStyle"
					onClick={handlePreviousFile}
				/>
				{!previous ?<ButtonComponent
					btnText="Submit"
					className="nurse btn buttonStyle"
					onClick={() => props.buttonAction(data)}
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
