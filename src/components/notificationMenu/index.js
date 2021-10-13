import React from "react";
import "../Header/style.scss";
import { Notifications, FiberManualRecord } from "@material-ui/icons";
import { Popover } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const details = [];

const NotificationMenu = ({ anchorEl, handleClose }) => {
	const open = Boolean(anchorEl);
	return (
		<>
			<Popover
				id={"simple"}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Typography>
					<div className="notificationMainContainer">
						<div className="notificationHeader">
							<Notifications />
							Notifications
						</div>
						<div className="listContainer">
							{details.map((lists) => (
								<div className="flexNotificationList">
									<div className="notificationList">
										{Object.values(lists).map(
											(list) => (
												<Link to="/new-requests" className="linkStyle">
													<li className="list">
														{list}
													</li>
												</Link>
											))}
									</div>
									<div className="notificationDot">
										<FiberManualRecord
											className={
												lists.check === "true"
													? "greenDot"
													: "greyDot"
											}
										/>
									</div>
								</div>
							))}
						</div>
						{details && !details.length &&
							<div className="flexNotificationList p-tb-10">
								No Notifications
							</div>
						}
					</div>
				</Typography>
			</Popover>
		</>
	);
};
export default NotificationMenu;
