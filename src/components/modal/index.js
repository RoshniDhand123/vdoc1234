import Modal from '@material-ui/core/Modal';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './style.scss'



export default function ModalComponent({ className, open, modalHeading, modalText, buttonAction, buttonText, children, alongSidebar }) {
    return (
        <Modal
            open={open}
        >
            <div className={`${alongSidebar ? "modal-beside-sidebar" : ""} modal ${className}`}>
                {children ?
                    children :
                    <div className={`modal-text-beside-sidebar complete-step modal-text`}>
                        <div className="flex-center"><CheckCircleOutlineIcon /></div>
                        <h3 className="m-0 font-30">{modalHeading}</h3>
                        <p className="success-txt font-17">{modalText}</p>
                        <div className="flex-center">
                            <div className="btn-link-txt">
                                <div className="btn" onClick={buttonAction}>{buttonText}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Modal>
    );
}
