import React from "react";
import PatientList from "../nurse/patient-list";
// const Chart = React.lazy(() => import("../patient/chart"));
// const EditBilling = React.lazy(() => import("../patient/edit-billing"));
// const Orders = React.lazy(() => import("../patient/orders"));
// const MedicalInformation = React.lazy(
// 	() => import("../patient/medical-information")
// );
// const RequestCall = React.lazy(() => import("../patient/request-a-call"));
// const UploadDocuments = React.lazy(() => import("../patient/upload-documents"));
const Evaluation = React.lazy(() => import("../nurse/evaluations"));
const SearchPatient = React.lazy(() => import("../nurse/search-patient"));
//const PatientChart = React.lazy(() => import("../nurse/patient-chart"));
const NewRequests = React.lazy(() => import("../nurse/new-requests"));
const AcceptedRequests = React.lazy(() => import("../nurse/accepted-requests"));
const PatientLists = React.lazy(()=> import("../nurse/patient-list"));
const PhysicianLists = React.lazy(()=> import("../nurse/physician-list"));
const PatientReports = React.lazy(
	() => import("../nurse/patient-reports/index")
);
const History = React.lazy(() => import("../nurse/history"));
const WebSocketDemo = React.lazy(() => import("../nurse/chating-module/App"));

// interface Child {
// 	to: string;
// 	title: string;
// }
// export interface Menu {
// 	title: string;
// 	icon_type?: string;
// 	to?: string;
// 	children?: Child[];
// 	component?: any;
// }
export const nurseRoutes = [
	{
		title: "Evaluations",
		to: "/",
		icon_type: "ViewList",
		component: Evaluation,
	},
	// {
	// 	title: "Search Patient",
	// 	to: "/search-patient",
	// 	icon_type: "SearchIcon",
	// 	component: SearchPatient,
	// },
	// {
	// 	title: "Patient chart",
	// 	to: "/patient-chart",
	// 	icon_type: "BarChart",
	// 	component: PatientChart,
	// },
	{
		title: "Patient List",
		to: "/patient-list",
		icon_type: "PersonAdd",
		component: PatientLists,
	},
	{
		title: "Physician List",
		to: "/physician-list",
		icon_type: "PersonAdd",
		component: PhysicianLists,
	},
	// {
	// 	title: "Chat",
	// 	to: "/chating-module",
	// 	icon_type: "Description",
	// 	component: WebSocketDemo,
	// },
	{
		title: "History",
		to: "/history",
		icon_type: "History",
		component: History,
	},


];

export const physicianRoutes = [];

export const pharmacistRoutes = [];

// export const userRoutes = [
// 	{
// 		title: "My Chart",
// 		to: "/",
// 		icon_type: "BarChart",
// 		component: Chart,
// 	},
// 	{
// 		title: "Billing",
// 		to: "/edit-billing",
// 		icon_type: "CreditCard",
// 		component: EditBilling,
// 	},
// 	{
// 		title: "Orders",
// 		to: "/orders",
// 		icon_type: "ViewList",
// 		component: Orders,
// 	},
// 	{
// 		title: "Request a call",
// 		to: "/request-a-call",
// 		icon_type: "ContactPhone",
// 		component: RequestCall,
// 	},
// 	{
// 		title: "Update medical information",
// 		to: "/update-medical-information",
// 		icon_type: "LocalHospital",
// 		component: MedicalInformation,
// 	},
// 	{
// 		title: "Upload documents",
// 		to: "/upload-documents",
// 		icon_type: "Assignment",
// 		component: UploadDocuments,
// 	},
// ];

export function getRoleRoutes(role) {
	switch (role) {
		case "Nurse":
			return nurseRoutes;
		// case "Physician":
		// 	return physicianRoutes;
		// case "Pharmacist":
		// 	return pharmacistRoutes
		// default:
		// 	return userRoutes
	}
}