import React from "react";
import LoginForm from "./form";
//import { payload_type } from "./types";
import Loading from "../../components/loader";
import AppLogo from "../../components/app-logo";
import BigLogo from "../../assets/img/biglogo.png";
import Vdoc from "../../assets/img/Vdoc-1-biglogo.png";
import { login } from "../../services/apis";
import "./style.scss";

class Login extends React.PureComponent {
    state = { loading: false, errorMessage: "" };

    UNSAFE_componentWillMount() {
        if (this.props.userRole) window.location.href = "/";
    }

    doSignin = async (payload) => {
        this.setState({ loading: true });
        let resp = await login(payload);
        this.setState({ loading: false });
        if (resp.data && resp.data.status) {
            this.props.onLogin(resp.data.tokens, this.props.history);
        }
        if (resp.data && !resp.data.status) {
            console.log("resp data", resp);
            console.log("resp data msg", resp.data.msg.msg[0]);
            this.setState({ errorMessage: resp.data.msg.msg[0] });
        }
    };

    render() {
        return (
            <>
                <div className="flex-space-around container root-form-container">
                    <AppLogo logo={Vdoc} className="app-logo big-logo" />
                    <LoginForm
                        onSubmit={this.doSignin}
                        errorMessage={this.state.errorMessage}
                    />
                    <Loading show={this.state.loading} />
                </div>
            </>
        );
    }
}

export default Login;
