import React,{useState} from "react";
import "./style.scss";
import AppLogo from "../app-logo";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Vdoc-1-header.png";
import {
	Notifications,
	ArrowBackIos,
	ExitToApp,	
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import NotificationMenu from "../notificationMenu";


const Header = ({routeLink,	notifications,logout,onLogout,badgeContent,}) => {
	
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	return (
		<div className="flex-space-betindexween header">
			<div className="inner">
				<AppLogo logo={Logo} className="header-logo" />
			</div>
			<div className="flex-space-between margin-right-20">
				{routeLink ? 
					<Link to={routeLink.path}>
						<div className="flex-space-between headerIcon">
							{routeLink.icon ? routeLink.icon : <ArrowBackIos />}{" "}
							<span className="headerText">{routeLink.text}</span>
						</div>
					</Link>
				 : 
					<>
						{notifications && (
							<div className="notification">
								<Badge
									color="secondary"
									badgeContent={badgeContent || 0}
								>
									<IconButton onClick={handleClick}>
										<Notifications />
									</IconButton>
									<NotificationMenu
										anchorEl={anchorEl}
										handleClose={handleClose}
									/>									
								</Badge>
							</div>
						)}
						{logout && (
							<div className="notification logout">
								<ExitToApp onClick={onLogout} />
							</div>
						)}
					</>
				}
			</div>
		</div>
	);
};

export default Header;
