import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

const Welcome = () => {
  return (
    <div>
      <Container maxWidth="xs">
        <Paper
          sx={{
            // padding: "1rem",
            py: "3rem",
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            marginTop: "2rem",
            borderRadius: "15px",
            border: "5px solid #233044",
            // backgroundColor: "#4a6690",
            backgroundColor: "#fff",
          }}
          elevation={24}
        >
          <Stack spacing={3}>
            <Typography
              sx={{
                textAlign: "left",
                fontFamily: "Poppins",
                fontSize: "2rem",
                fontWeight: "bolder",
              }}
            >
              Login
            </Typography>
            <Login />
          </Stack>
        </Paper>
      </Container>

      <Container maxWidth="xl" sx={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Grid
            width={"100%"}
            container
            sx={
              {
                // border: `1px solid black`
              }
            }
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={
                {
                  // border: `1px solid black`,
                  //  height: "70vh"
                }
              }
            >
              Marketing
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={
                {
                  // border: `1px solid black`,
                  // height: "70vh"
                }
              }
            >
              <Signup />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Welcome;
