import "./style.scss";

import { CHOOSE_TREATMENT, FORGOT_PASSWORD } from "../constants";

import Button from "../../components/button";
import Card from "../../components/card";
import Form from "../../components/form";
import FormHeading from "../../components/form-heading";
import { Link } from "react-router-dom";
import React from "react";
import fields from "./fields";
import primaryCard from "../../assets/img/card-primary.png";

const initialValues = { contact: "", password: "" };

export default ({ onSubmit, errorMessage }) => (
    <div className="flex-div">
        <Card className="form-card login">
            <FormHeading
                title="log in"
                card={primaryCard}
                cardStyle="card-style"
            ></FormHeading>
            <div className="padding-lrb-20">
                <Form
                    fields={fields}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    renderCustomSubmit={
                        <Button
                            btnText="Get Started"
                            className="form-button"
                            type="submit"
                        />
                    }
                />
                <div className="flex-space-around account">
                    {/* <div className="form-footer">
                        <Link to={CHOOSE_TREATMENT} className="form-footer-txt">
                            CREATE ACCOUNT
                        </Link>
                    </div> */}
                    <div style={{ color: "red" }}>
                        {errorMessage && errorMessage}
                    </div>
                    <div className="form-footer flex-end">
                        <Link to={FORGOT_PASSWORD} className="form-footer-txt">
                            NEED HELP?
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    </div>
);
