import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import AppLogo from "../app-logo";
import Logo from "../../assets/img/PillTabs.png";
import { Notifications, ArrowBackIos, ExitToApp } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import NotificationMenu from "../notificationMenu";
import { Link } from "react-router-dom";
import "./styles.scss";

const header_styles = makeStyles((theme) => ({
  root: {
    height: 20,
    padding: "25px 20px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    // background: "#d850d4",
  },
  logo: {
    width: "150px",
    marginLeft: "10px",
  },
  divider: {
    width: "90%",
    border: "0.2px solid #ffffff",
    margin: "auto",
  },
}));

const SmallNavHeader = ({
  toggleDrawer,
  routeLink,
  notifications,
  onLogout,
  logout,
  badgeContent,
}) => {
  const classes = header_styles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className={classes.root} id="small-header">
      <div className="left-side">
        <Menu onClick={toggleDrawer} />
        <AppLogo logo={Logo} className={`${classes.logo} header-logo`} />
      </div>

      <div className="right-side">
        {routeLink ? (
          <Link to={routeLink.path}>
            <div className="flex-space-between headerIcon">
              {routeLink.icon ? routeLink.icon : <ArrowBackIos />}{" "}
              <span className="headerText">{routeLink.text}</span>
            </div>
          </Link>
        ) : (
          <>
            {notifications && (
              <div className="notification">
                <Badge color="secondary" badgeContent={badgeContent || 0}>
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
        )}
      </div>
    </div>
  );
};

export default React.memo(SmallNavHeader);
