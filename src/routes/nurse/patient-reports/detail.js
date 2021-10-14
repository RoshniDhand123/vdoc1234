// import React, { useState } from "react";
// import ButtonComponent from "../../../components/button";
// import "./style.css";

// // const previousReport = {
// // 	physician: "report created by physician",
// // 	nurse: "report created by nurse",
// // };


// const Detail = (props) => {
// 	const [data, setReportData] = React.useState();
// 	const [previous, setPrevious] = React.useState(false);

// 	const getReportData = (e) => {
// 		//console.log("e", e.target.value);
// 		setReportData(e.target.value);
// 	};
// 	const handlePreviousFile = () => {
// 		setPrevious(!previous);
// 	};
// 	const show = (list) => {
// 		return (
// 			<div style={{ borderBottom: "1px solid white" }}>
// 				{Object.entries(list).map(([key, value], index) => {
// 					return (
// 						<div>
// 							<div className="heading">{key}</div>
// 							<div>{value}</div>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		);
// 	};
// 	return (
// 		<div className="PatientDetailContainer">
// 			{previous ? (
// 				<div className="previous-record">
// 					{props.prevReport.length > 0 ? (
// 						props.prevReport.map(show)
// 					) : (
// 						<div>Previous Report not exist</div>
// 					)}
// 					{/* {Object.entries(previousReport).map(([key, value]) => {
// 						return (
// 							<div>
// 								<div className="heading">{key}</div>
// 								<div>{value}</div>
// 							</div>
// 						);
// 					})} */}
// 				</div>
// 			) : (
// 				<textarea
// 					className="textArea"
// 					value={data}
// 					onChange={getReportData}
// 				></textarea>
// 			)}
// 			<div className="buttonContainer">
// 				<ButtonComponent
// 					btnText={previous ? "New Report" : "Previous Report"}
// 					className="nurse btn buttonStyle"
// 					onClick={handlePreviousFile}
// 				/>
// 				{!previous ?<ButtonComponent
// 					btnText="Submit"
// 					className="nurse btn buttonStyle"
// 					onClick={() => props.buttonAction(data)}
// 				/>:""}
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
