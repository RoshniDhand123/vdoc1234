//import { request } from "node:http";
import Field from "../../components/Field";
import request from "../apis/request";
import { clearStorage, getItem, getToken, setItem } from "../storage";

var day = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thrusday",
	"friday",
	"saturday",
];
const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];





export const parsePlans = (plans) => {
	let p = [];
	for (let i = 0; i < plans.length; i++) {
		p.push({
			plan: plans[i].name,
			drugName: plans[i].drug,
			dosage: plans[i].dosage,
			frequency: plans[i].frequency,
			amount: plans[i].amount,
			id: plans[i].id,
			detail: plans[i].detail,
		});
	}
	return p;
};

export const parseFileDetails = (documentDetail) => {
	let data = [];
	for (let i = 0; i < documentDetail.length; i++) {
		let obj = {};
		obj["File Name"] = documentDetail[i].detail;
		obj["File Content"] = documentDetail[i].document;
		obj["Date Uploaded"] = formatDate(documentDetail[i].created);
		data.push(obj);
	}
	return data;
};

export const parseUpdateQuestionnaire = (questionnaire) => {

	let data = {};
	let fields = [];
	let initialValue= {};
	for (let i = 0; i < questionnaire.length; i++) {
		let obj= {};
		obj["label"] = questionnaire[i].question;
		obj["type"] = questionnaire[i].types;
		obj["required"] = true;
		obj["name"] = questionnaire[i].id.toString();
		obj["component"] = Field;
		switch (questionnaire[i].types) {
			case "radio":
				initialValue[questionnaire[i].id.toString()] = questionnaire[
					i
				].answer[0].id.toString();
				if (questionnaire[i].value) {
					initialValue[questionnaire[i].id.toString() + "-input"] =
						questionnaire[i].value;
					obj["radioInput"] = true;
				} else {
					obj["radioInput"] = true;
				}
				let op = [];
				for (let j = 0; j < questionnaire[i].options.length; j++) {
					op.push({
						value: questionnaire[i].options[j].id.toString(),
						label: questionnaire[i].options[j].option,
					});
				}
				obj["options"] = op;
				break;
			case "checkbox":
				let arr = [];
				for (let j = 0; j < questionnaire[i].answer.length; j++) {
					arr.push(questionnaire[i].answer[j].id.toString());
				}
				initialValue[questionnaire[i].id.toString()] = arr;
				let op1 = [];
				for (let j = 0; j < questionnaire[i].options.length; j++) {
					op1.push({
						value: questionnaire[i].options[j].id.toString(),
						label: questionnaire[i].options[j].option,
					});
				}
				obj["options"] = op1;
				break;
			default:
				initialValue[questionnaire[i].id.toString()] =
					questionnaire[i].answer;
		}
		fields.push(obj);
	}
	data["field"] = fields;
	data["initialValue"] = initialValue;
	return data;
};

export const parseUpdatedQuestionnaireResult = (questionnaire) => {
	let updatedResult = [];
	Object.entries(questionnaire).map(([key, value]) => {
		let ques = {};
		ques["id"] = key;
		if (key === "1" || key === "2") ques["option_id"] = value;
		else {
			if (Array.isArray(value)) {
				let arr = [];
				value.map((ans) => {
					arr.push(parseInt(ans));
				});
				ques["option_id"] = arr;
			} else ques["option_id"] = parseInt(value );
		}
		updatedResult.push(ques);
	});
	return updatedResult;
};
export const parseQuestionnaire = (questionnaire) => {
	let q = [];
	for (let i = 0; i < questionnaire.length; i++) {
		var ques = {};
		ques["name"] = questionnaire[i].id.toString();
		ques["label"] = i + 1 + ". " + questionnaire[i].question;
		ques["type"] = questionnaire[i].types;
		ques["component"] = Field;
		ques["required"] = true;
		if (
			questionnaire[i].types == "radio" ||
			questionnaire[i].types == "checkbox"
		) {
			let op = [];
			for (let j = 0; j < questionnaire[i].options.length; j++) {
				op.push({
					value: questionnaire[i].options[j].id.toString(),
					label: questionnaire[i].options[j].option,
				});
			}
			ques["options"] = op;
			if (questionnaire[i].types == "radio" && questionnaire[i].input)
				ques["radioInput"] = true;
		} else {
			ques["placeholder"] = questionnaire[i].question;
			if (
				questionnaire[i].question == "Height" ||
				questionnaire[i].question == "Weight"
			) {
				ques["gridItem"] = 6;
				ques["type"] = "number";
				if (questionnaire[i].question == "Height")
					ques["placeholder"] =
						questionnaire[i].question + " (in centimeters)";
				else
					ques["placeholder"] =
						questionnaire[i].question + " (in kgs)";
			}
		}
		q.push(ques);
	}
	return q;
};

export const parseAppointment = (appointment) => {
	let date = formatDate(appointment.start);
	let time = appointment.start.substr(11, 5);
	return { date, time };
};

export const parseQuestionnairePayload = (questionnaire) => {
	let allQues = [];
	for (const item in questionnaire) {
		var ques = {};
		if (item.includes("input")) {
			let radioInput = item.substring(0, item.indexOf("-input"));
			let input = allQues.find((q) => q.question_id == radioInput);
			input["value"] = questionnaire[item];
			allQues[allQues.indexOf(input)] = input;
		} else {
			if (Array.isArray(questionnaire[item])) {
				let checkedOptions = questionnaire[item].map((q) =>
					Number(q)
				);
				ques["option_id"] = checkedOptions;
			} else ques["option_id"] = Number(questionnaire[item]);
			ques["question_id"] = Number(item);
			ques["value"] = "";
			allQues.push(ques);
		}
	}
	return allQues;
};

export const createProfilePayload = () => {
	let personalDetail = getItem("personalDetail");
	let demographics = getItem("demographics");
	let questionnaire = getItem("questionnaire");
	let billing = getItem("billing");
	if (!personalDetail || !demographics || !questionnaire || !billing)
		return false;
	let ques = parseQuestionnairePayload(questionnaire);
	let payload = {
		first_name: personalDetail.firstName,
		last_name: personalDetail.lastName,
		email: personalDetail.email,
		password: personalDetail.password,
		dob: formatDate(demographics.dob),
		gender: demographics.gender,
		marital_status: demographics.maritalStatus,
		employment: demographics.employment,
		race: demographics.race,
		questionnaire: ques,
		billing: {
			add1: billing.billingAddress,
			add2: billing.billingAddress2,
			city: billing.billingCity,
			state: billing.billingState,
			zip_code: billing.billingZipCode,
		},
		shipping: {
			add1: billing.shippingAddress,
			add2: billing.shippingAddress2,
			city: billing.shippingCity,
			state: billing.shippingState,

			zip_code: billing.shippingZipCode,
		},
		payments: billing.payments,
	};
	return payload;
};

export const formatDate = (inputDate, format) => {
	var date = new Date(inputDate);
	let month = getDayOrMonth(date, "month");
	let day = getDayOrMonth(date, "day");
	let year = date.getFullYear();
	switch (format) {
		case "MM/DD/YYYY":
			return month + "/" + day + "/" + year;
		default:
			return month + "/" + day + "/" + year;
	}
};

export const getDayOrMonth = (date, type) => {
	let d;
	if (type == "month") d = date.getMonth() + 1;
	else d = date.getDate();
	if (d.toString().length == 1) return "0" + d;
	return d;
};

export const getDayOrMonthName = (date) => {
	let dayName = day[date.getDay()];
	let monthName = monthNames[date.getMonth()];
	return { dayName, monthName };
};

export const parseToken = (token) => {
	try {
		let access_token = token.access_token;
		var payload = JSON.parse(window.atob(access_token.split(".")[1]));
		return payload;
	} catch (error) {
		clearStorage()
		return null;
	}

};

export const parseProfile = (profile) => {
	return {
		firstName: profile.first_name,
		lastName: profile.last_name,
		email: profile.email,
		dob: profile.dob,
		shippingAddress: profile.address?.add1,
		shippingAddress2: profile.address?.add2,
		shippingCity: profile.address?.city,
		shippingState: profile.address?.state,
		shippingZipCode: profile.address?.zip_code,
		gender: profile.gender,
		maritalStatus: profile.marital_status,
		race: profile.race,
		employment: profile.employment,
	};
};

export const parseBilling = (billing) => {
	return {
		billing: {
			billingAddress: billing.add1,
			billingAddress2: billing.add2,
			billingCity: billing.city,
			billingState: billing.state,
			billingZipCode: billing.zip_code,
		},
		payment: billing.payments,
	};
};

export const ediProfilePayload = (profile) => {
	return {
		first_name: profile.firstName,
		last_name: profile.lastName,
		email: profile.email,
		dob: profile.dob,
		marital_status: profile.maritalStatus,
		employment: profile.employment,
		gender: profile.gender,
		race: profile.race,
		address: {
			add1: profile.shippingAddress,
			add2: profile.shippingAddress2,
			city: profile.shippingCity,
			state: profile.shippingState,
			zip_code: profile.shippingZipCode,
		},
	};
};

export const parseBillingShippingValues = (payload) => {
	let { billing, shipping, token } = payload;
	return {
		billingAddress: billing.add1,
		billingAddress2: billing.add2,
		billingCity: billing.city,
		billingState: billing.state,
		billingZipCode: billing.zip_code,
		shippingAddress: shipping.add1,
		shippingAddress2: shipping.add2,
		shippingCity: shipping.city,
		shippingState: shipping.state,
		shippingZipCode: shipping.zip_code,
		planId: billing.plan_id,
		token: token,
	};
};

export const parseUpdateBillingPayload = (payload) => {
	return {
		add1: payload.billingAddress,
		add2: payload.billingAddress2,
		city: payload.billingCity,
		state: payload.billingState,
		zip_code: payload.billingZipCode,
	};
};

export const createBillingAndPaymentPayload = (payload) => {
	payload.payments.plan_id = payload.planId;
	return {
		billing: {
			add1: payload.billingAddress,
			add2: payload.billingAddress2,
			city: payload.billingCity,
			state: payload.billingState,
			zip_code: payload.billingZipCode,
		},
		shipping: {
			add1: payload.shippingAddress,
			add2: payload.shippingAddress2,
			city: payload.shippingCity,
			state: payload.shippingState,
			zip_code: payload.shippingZipCode,
		},
		payments: payload.payments,
	};
};
const getActions = (buttons, row) => {
	//console.log("buttons", buttons);
	return buttons.map(({ method = () => { }, ...rest }) => ({
		...rest,
		callBack: method.bind(this, row)
	}))
}
const convertStatus = (sts) => {
	switch (sts) {
		case 'resolved':
			return <div className="status-btn resolved">Resolved</div>;
		case 'accept':
			return <div className="status-btn accepted">Accepted</div>
		case 'assign':
			return <div className="status-btn assigned">Assigned</div>
		case 'ongoing':
			return <div className="status-btn ongoing">Ongoing</div>		
		case 'reject':
	     	return <div className="status-btn rejected">Rejected</div>	
		default:
			return <div className="status-btn pending">Pending</div>;
	}
}
export const parseRequestsList = (payload, viewButton) => {
	let requests = [];
	//console.log("helper",payload);
	for (let i = 0; i < payload.length; i++) {
		let obj = {};
		let Name =
			payload[i].patient.first_name + " " + payload[i].patient.last_name;
		 obj["Id"] = payload[i].id;
		 obj["Name"] = Name;
		 obj["Dob"] = payload[i].patient.dob;
		 obj["Email"] = payload[i].patient.email;
		// obj["Date"] = payload[i].date;
		 obj["Address"] = payload[i].patient.address;
		 obj["Status"] = convertStatus(payload[i].status);
		 obj["Contact"]= payload[i].patient.contact;
		if (viewButton)
			obj["action"] = getActions(viewButton, obj);
		// if (assignButton)
		//     obj["action"] = getActions(assignButton, obj);	
		requests.push(obj);
		//console.log(obj,"helperobj");
	}
	
	return requests;
};

export const parsePhysicianRequestsList = (payload, button) => {
	let requests = [];
	//console.log("helper",payload);
	for (let i = 0; i < payload.length; i++) {
		let obj = {};
		let Name =
			payload[i].first_name + " " + payload[i].last_name;
		 obj["Id"] = payload[i].id;
		 obj["Name"] = Name;
		 obj["Dob"] = payload[i].dob;
		 obj["Email"] = payload[i].email;
		// obj["Date"] = payload[i].date;
		 obj["Address"] = payload[i].address;
		 obj["Status"] = convertStatus(payload[i].status);
		 obj["Contact"]= payload[i].contact;
		if (button)
			obj["action"] = getActions(button, obj);
		requests.push(obj);
		//console.log(obj,"helperobj");
	}
	
	return requests;
};

export const parsePatientRecordInfo = (payload)=>{
	console.log("hello payload1",payload);
 let requests= [];
 
  //for (let i=0; i< payload.length; i++){
	let obj ={};
    let Name = payload.first_name + " " + payload.last_name;
    let Src = payload.pic;
	// for(let i=0; i < payload.document.length; i++){
	// //  let docSrc = payload.document[i].document;

	// }
		//let docSrc = payload.document.
    let br = <br/>		
    let image = <img class="p_img" src={Src} alt="pic"/>;
    obj["Id"] = payload.id;
	obj["Profile pic"]= image;
    obj["Name"]= Name;
    obj["Email"]= payload.email;
	obj["Address"]= payload.address; 

	for(let i=0; i < payload.document.length; i++){
      obj[`Report-Detail ${[i+1]}`] = payload.document[i].detail;
	  let docSrc = payload.document[i].document;
	  let img = <a target='_blank' href={docSrc}> <img class="p_image" src={docSrc} alt="pic" /> </a>
	  obj[`Report ${[i+1]}`]= img;
	}
	console.log("patient questions",payload.questions);
	for(let i=0; i < payload.questions.length; i++){
		obj[`Question ${[i+1]}`] = payload.questions[i].question;	

		if(payload.questions[i].types === 'checkbox')
		{
			let answer=""
			for (let j= 0 ; j<payload.questions[i].ans_options.length;j++){
				//obj[`Answer: ${[j+1]}`] = payload.questions[i].ans_options[j].option; 
				if(j===0)
				answer=payload.questions[i].ans_options[j].option;
				else
				answer+=", "+payload.questions[i].ans_options[j].option;
			}
			obj[`Answer ${[i+1]}`] = answer;
		}
	   else if(payload.questions[i].answer === '' && payload.questions[i].types === 'radio'){
			obj[`Answer ${[i+1]}`] = payload.questions[i].ans_options[0].option;
		}	else{
			obj[`Answer ${[i+1]}`]= payload.questions[i].answer;
		}
		
	}
    //obj["Report-type"] = payload.detail;
    //obj["Report"]= payload.document;
    
    requests.push(obj);
   
   console.log("request",requests);
   return requests;
};

export const parsePhysicianRecordInfo =(payload)=>{
	console.log("hello payload",payload);
	let requests= [];
	//let obj ={};
	// accepted_time: "2021-10-13T18:51:58Z"
	// created: "2021-10-11T18:18:42Z"
	// patient: "Clint Barton"
	// patient_id: 27
	
	  	for(let i=0 ; i< payload.data.length; i++){
	     let obj ={};
		 //obj[`physician_Id`] = payload.phy_id;
         obj[`Patient ${[i+1]}`]= payload.data[i].patient_id;
		  let date2 = new Date(payload.data[i].created);
		  obj["Patient"]=payload.data[i].patient;
		  //let index=parseInt(date2.toString().lastIndexOf(":")+2);
		  //console.log("date++",parseInt(date2.toString().lastIndexOf(":")+2) );
		  obj['Requested Time'] = date2.toDateString()+" "+date2.toLocaleTimeString();
		  let date = new Date(payload.data[i].accepted_time);
		  obj['Reviewed At'] = date.toDateString()+" "+date.toLocaleTimeString();
		  requests.push(obj);
		  }
		  
   
	console.log("request",requests);
	return requests;
}

export const parseEvaluationRequestList = (payload,button) => {
	let requests = [];
	for (let i = 0; i < payload.length; i++) {
		let obj = {};
		let Name =
			payload[i].patient.first_name + " " + payload[i].patient.last_name;
		obj["Request Id"] = payload[i].id;
		obj["Patient Name"] = Name;
		obj["Dob"] = payload[i].patient.dob;
		obj["Appointment Time"] = payload[i].time;
		obj["action"] = getActions(button, obj);
		requests.push(obj);
	}
	return requests;
};

export const parseRoom_TokenValue = (payload) => {
	let obj = {};
	obj["room"] = payload.room;
	obj["token"] = payload.token;
	return obj;
};

export const isLoggedIn = () => {
	let token = getToken();
	if (token != null) return true;
	else return false;
};
// export const checkValidAppointmentTime = (time: string) => {
// 	let d = new Date();
// 	let start_hr = 0;
// 	let start_min = 0;
// 	let end_hr = 0;
// 	let end_min = 0;
// 	let current_hr = d.getHours();
// 	let current_min = d.getMinutes();
// 	start_hr = parseInt(time.substring(0, 2));
// 	start_min = parseInt(time.substring(3, 5));
// 	if (parseInt(time.substring(3, 5)) + 15 > 60) {
// 		end_hr = start_hr + 1;
// 		end_min = parseInt(time.substring(3, 5)) + 15 - 60;
// 	} else {
// 		end_hr = start_hr;
// 		end_min = parseInt(time.substring(3, 5)) + 15;
// 	}
// 	if (
// 		(current_hr === end_hr &&
// 			end_hr === start_hr &&
// 			start_min <= current_min &&
// 			current_min <= end_min) ||
// 		(start_hr < end_hr &&
// 			(start_min <= current_min || current_min <= end_min))
// 	) {
// 		return "yes";
// 	} else if (
// 		current_hr > end_hr ||
// 		(current_hr === end_hr && current_min > end_min)
// 	) {
// 		return "time gone";
// 	}
// 	return "wait";
// };
