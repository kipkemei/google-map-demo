import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/Notes";
import MenuIcon from "@material-ui/icons/Subject";

export default function () {
    return (
        <AppBar position="static" style={{ backgroundColor: "#d50320" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    style={{
                        marginRight: 2,
                    }}
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <strong>LOGO</strong>
                </Typography>
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "0%",
                            color: "#d50320",
                            height: "20px",
                            width: "20px",
                        }}
                    >
                        <AccountCircle />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}