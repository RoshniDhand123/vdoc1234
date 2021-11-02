import React from "react";
import LoginForm from "./form";
//import { payload_type } from "./types";
import Loading from "../../components/loader";
import AppLogo from "../../components/app-logo";
import BigLogo from "../../assets/img/biglogo.png";
import Vdoc from "../../assets/img/Vdoc-1-biglogo.png";
import { login } from "../../services/apis";
import{notifError,notifSuccess} from '../../routes/util';
import "./style.scss";

class Login extends React.PureComponent {
    state = { loading: false };

    UNSAFE_componentWillMount() {
        if (this.props.userRole) window.location.href = "/";
    }

    doSignin = async (payload) => {
        console.log("sign in start", payload);
        this.setState({ loading: true });
        let resp = await login(payload);
        console.log("resp");
        if (resp.data && resp.data.status) {
            console.log("first");

            this.props.onLogin(resp.data.tokens, this.props.history);
            notifSuccess("","SuccessFully LogIn");
            this.setState({ loading: false });
        }
        if (resp.data && !resp.data.status) {
            console.log("second");

            console.log("resp data", resp);
            console.log("resp data msg", resp.data.msg.msg[0]);
            // notifError("","Wrong Credentials");
            // this.setState({ errorMessage: resp.data.msg.msg[0] });
            this.setState({ loading: false });
        }
        console.log("outside");
        this.setState({ loading: false });
    };

    render() {
        return (
            <>
                <div className="flex-space-around container root-form-container">
                    <AppLogo logo={Vdoc} className="app-logo big-logo" />
                    <LoginForm
                        onSubmit={this.doSignin}
                      
                    />
                    {this.state.loading && <Loading />}
                </div>
            </>
        );
    }
}

export default Login;
