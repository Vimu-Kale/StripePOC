import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Login from "../Login/Login";
import LogoutButton from "../Logout/LogoutButton";

const RespAppBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#233044",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.6rem",
            }}
          >
            Crediblock
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box> */}

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              flexGrow: 0,
              // paddingTop: "1rem"
            }}
          >
            <Paper
              sx={{
                padding: "1rem",
                margin: "1rem",
                borderRadius: "10px",
                // backgroundColor: "#4a6690",
                backgroundColor: "#fff",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Login />
            </Paper>
          </Box>
          <LogoutButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default RespAppBar;
