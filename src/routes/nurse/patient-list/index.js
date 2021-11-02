import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import {
    getPatientRequestList,
    getPatientReport,
} from "../../../services/apis/index";
import {
    parseRequestsList,
    parsePatientRecordInfo,
} from "../../../services/helper/index";
import Detail from "./detail";
import { PatientReportType } from "../patient-reports";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import { notifSuccess } from "../../util";


const headCells = [
    { name: "Id", label: "ID" },
    { name: "Name", label: "Name" },
    { name: "Dob", label: "DOB" },
    { name: "Email", label: "Email" },
    //{ name: "Address", label: "Address" },
    { name: "Contact", label: "Contact" },
    { name: "Status", label: "Status" },
    { name: "action", label: "   Actions" },
];

class PatientList extends React.PureComponent {
   
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
       
        let resp = await getPatientRequestList();
        //console.log(resp,"heyyyyyyyyy");
        let button = [
            {
                btnTxt: "View",
                classname: "nurse btn videoCallButton",
                method: this.getUserRecord,
            },
        ];

        console.log("heyyyy", resp);

        if (resp.data.status) {
            this.setState({
                details: parseRequestsList(resp.data.data, button),
            });
        }
        console.log("response state", this.state.details);
        this.setState({ loading: false });
    };

    getUserRecord = async (row) => {
        // notifSuccess("","Nurse Can view Patient Detail");
        console.log("row", row);
        // let patient_id = row['Id'];
        //console.log("p_id",patient_id);
        let resp = await getPatientReport(row.Id);
        //currently not live ...
        //let resp = await getParticularUserRecord(row.Id);
        //console.log("resp for button click", resp.data.data);
        if (resp && resp.data && resp.data.status && resp.data.data) {
            let parseData = parsePatientRecordInfo(resp.data.data);
            console.log("looking1", resp.data.data);
            console.log("looking2", parseData);
            this.setState({ patient_reportInfo: parseData, open: true });
            console.log("resp for button click", this.state.patient_reportInfo);
        } else {
            this.setState({ open: true });
        }
    };

    getReport = (data) => {
        console.log("get modal data", data);
        if (data === "submitData") {
            //console.log("cancelButtonClick");
        }
        this.setState({ open: false });
        this.getRequestList();
        //window.location.reload();
    };

    _loadDetails = async (page = 0, perPage = 10) => {};

    onPageChange = async (perPage, page) => {
        const { total, details = [] } = this.state;
        if (total > details.length && (page + 1) * perPage > details.length)
            await this._loadDetails(page, perPage);
        return this.state.details;
    };
    render() {
        let { loading, total, details, open, patient_reportInfo } = this.state;
        return (
            <>
                {/* {open && ( */}
                <ModalComponent open={open} alongSidebar={true}>
                    <Detail
                        buttonAction={this.getReport}
                        prevReport={patient_reportInfo}
                        getRequestList={this.getRequestList}
                    />
                </ModalComponent>
                {/* )} */}
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

export default PatientList;
