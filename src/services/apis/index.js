import { Response, login_type, reset_pswd_type } from "./types";
import { notifError } from "../../routes/util";
import Request from "./request";
import { Category } from "@material-ui/icons";

const Apis = {
	GET_TREATMENT: "treatments",
	GET_PLANS: "plans/",
	GET_QUETIONNAIRE: "questionnaire/",
	CHECK_EMAIL: "checkemail/",
	CREATE_PROFILE: "signup",
	LOGIN: "auth/login",
	FORGOT_PASSWORD: "forgot/",
	RESET_PASSWORD: "resetpassword",
	GET_PROFILE: "profile",
	GET_BILLING: "billing",
	UPDATE_PROFILE: "profile",
	UPDATE_BILLING: "billing",
	UPDATE_PAYMENT: "",
	UPDATE_QUESTIONNAIRE: "questionnaire",
	UPLOAD_FILE: "document",
	SET_APPOINTMENT: "appointment/booking",
	USER_REQUEST: "list/patient",
	PATIENT_REQUEST: "nurse/counseling/list",
	PHYSICIAN_REQUEST:"list/physician",
	PATIENT_LIST: "appointment/booking",
	SET_ROOM_TOKEN: "appointment/call/video",
	DELETE_PATIENTCALL: "appointment/call/video",
	ALLPATIENT_LIST: "/appointment/patient/search?q=",
	USER_REPORT: "/appointment/report/",
	PATIENT_MEDICATION_ORDERS: "/appointment/medicine/",
	PATIENT_REPORT_REQUEST: "nurse/counseling/accept/",
	PHYSICIAN_SPECIALITY: 'phy/specialties/',
	ASSIGN_REQUEST: 'nurse/counseling/assign/',
	HISTORY_REQUEST: 'nurse/counseling/history',
	PATIENT_COUNSELING_TIME: 'phy/counseling/time/',
	CHAT_REQUEST: 'chat/room/patient/',
};

const verifyResponse = (resp) => {
	try {
		if (resp.data && !resp.data.status) {
			let message;
			if (resp.data?.msg.msg) message = resp.data.msg.msg[0];
			else message = resp.data.msg;
			console.log(message, typeof message)
			if (message && typeof message === "string")
				notifError("", message || "Something went wrong");
			else
				notifError("", "Something went wrong");

		}
	} catch (err) {
		console.log("ERROR: ", err);
	}

	return resp;
};

export const assignPhys = async(id,speciality)=>{
let resp = await Request.post(Apis.ASSIGN_REQUEST+id+'/'+speciality);
}

export const  userChat = async(id)=>{
let resp = await Request.get(Apis.CHAT_REQUEST +id);	
}
export const getSpecialityList = async(category)=>{
let resp = await Request.get(Apis.PHYSICIAN_SPECIALITY +category);
console.log("specialityresponse",resp);
return verifyResponse(resp);
}


export const getPhysicianInfo= async (id)=>{
	let resp = await Request.get(Apis.PATIENT_COUNSELING_TIME +id);
	return verifyResponse(resp);
}


export const getPatientReport= async (id)=>{
   let resp = await Request.get(Apis.PATIENT_REPORT_REQUEST +id);
   console.log("patientRecord",resp);
   return verifyResponse(resp);
};

export const getUserRequestList = async (page = "") => {
	//console.log("hey enter");
	let resp = await Request.get(Apis.USER_REQUEST);
	//console.log("patientlist",resp);
	return verifyResponse(resp);
};


export const getPatientRequestList = async (page = "") => {
	//console.log("hey enter");
	let resp = await Request.get(Apis.PATIENT_REQUEST);
	console.log("patientlist",resp);
	return verifyResponse(resp);
};

export const getPatientHistoryList = async (page = "") => {
	//console.log("hey enter");
	let resp = await Request.get(Apis.HISTORY_REQUEST);
	console.log("patientlist",resp);
	return verifyResponse(resp);
};

export const getPhysicianRequestList = async (page = "") => {
	//console.log("hey enter");
	let resp = await Request.get(Apis.PHYSICIAN_REQUEST);
	//console.log("patientlist",resp);
	return verifyResponse(resp);
};


export const getTreatments = async () => {
	let treatments = await Request.get(Apis.GET_TREATMENT);
	return verifyResponse(treatments);
};

export const getPlans = async (id) => {
	let plans= await Request.get(Apis.GET_PLANS + id);
	return verifyResponse(plans);
};

export const getQuestionnaire = async (id) => {
	let questionnaire = await Request.get(Apis.GET_QUETIONNAIRE + id);
	return verifyResponse(questionnaire);
};

export const verifyEmail = async (email) => {
	let resp = await Request.get(Apis.CHECK_EMAIL + email);
	return verifyResponse(resp);
};

export const createProfile = async (payload) => {
	let resp = await Request.post(
		Apis.CREATE_PROFILE,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const login = async (payload) => {
	let resp = await Request.post(Apis.LOGIN, JSON.stringify(payload));
	return verifyResponse(resp);
};

export const forgotPassword = async (email) => {
	let resp = await Request.get(Apis.FORGOT_PASSWORD + email);
	console.log("resp", resp)
	return verifyResponse(resp);
};

export const resetPassword = async (payload) => {
	let resp = await Request.post(
		Apis.RESET_PASSWORD,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getProfile = async () => {
	let resp = await Request.get(Apis.GET_PROFILE);
	return verifyResponse(resp);
};

export const getBillingDetails = async () => {
	let resp = await Request.get(Apis.GET_BILLING);
	return verifyResponse(resp);
};

export const editProfile = async (payload) => {
	let resp = await Request.put(
		Apis.UPDATE_PROFILE,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const editBilling = async (payload) => {
	let resp = await Request.put(
		Apis.UPDATE_BILLING,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const submitBillingWithPayment = async (payload, token) => {
	const { access_token } = token;
	let resp = await Request.post(
		Apis.UPDATE_PROFILE,
		JSON.stringify(payload),
		access_token
	);
	return verifyResponse(resp);
};

export const editPaymentInfo = async (payload) => {
	// let resp: any = await Request.put(Apis.UPDATE_PAYMENT,JSON.stringify(payload));
	// return verifyResponse(resp);
};

export const getQuestionnaireForUpdate = async () => {
	let resp = await Request.get(Apis.UPDATE_QUESTIONNAIRE);
	return verifyResponse(resp);
};

//check........need to setApiUrl
export const editQuestionnaire = async (payload) => {
	let resp = await Request.put(
		Apis.UPDATE_BILLING,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const uploadFileDetail = async (payload) => {
	let resp = await Request.postFile(Apis.UPLOAD_FILE, payload);
	return verifyResponse(resp);
};

export const getFileDetails = async (page) => {
	let resp = await Request.get(Apis.UPLOAD_FILE + page);
	return verifyResponse(resp);
};



export const getParticularUserRecord = async (requestId) => {
	let resp = await Request.get(Apis.USER_REPORT + requestId);
	return verifyResponse(resp);
};

export const getPatientList = async (page = "") => {
	let resp = await Request.get(Apis.PATIENT_LIST + page);
	console.log("patientlist",resp);
	return verifyResponse(resp);
};
///api/v1/appointment/patient/search?q=rk&field=name,email  ALLPATIENT_LIST: "/appointment/patient/search?q=",
export const getAllPatientList = async (payload, page = "") => {
	let resp = await Request.get(Apis.ALLPATIENT_LIST + payload + page);
	return verifyResponse(resp);
};

export const getSearchList = async (payload) => {
	let resp = await Request.get(
		Apis.ALLPATIENT_LIST +
		payload.search_value +
		"&field=" +
		payload.search_by
	);
	return verifyResponse(resp);
};

export const patientMedicationOrder = async (requestId) => {
	let resp = await Request.get(
		Apis.PATIENT_MEDICATION_ORDERS + requestId
	);
	return verifyResponse(resp);
};

export const acceptRejectRequestList = async (payload) => {
	let resp = await Request.put(
		Apis.PATIENT_LIST,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const appointmentDetail = async (payload) => {
	let resp = await Request.post(
		Apis.SET_APPOINTMENT,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getVideoToken_RoomName = async (payload) => {
	let resp = await Request.post(
		Apis.SET_ROOM_TOKEN,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const updatePatientCallDetail = async (payload) => {
	let resp = await Request.put(
		Apis.SET_ROOM_TOKEN,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const passUpdatedQuestionnaire = async (payload) => {
	let resp = await Request.put(
		Apis.UPDATE_QUESTIONNAIRE,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const deletePatientCall = async (payload) => {
	let resp = await Request.delete(
		Apis.DELETE_PATIENTCALL,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};




