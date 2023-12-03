import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import ProtectedRoute from "../components/ProtectedRoute";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { Divider } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function list() {
  const router = useRouter();

  const { flight, bookingReq } = useSelector((state) => state.flight);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user, flight);
  }, []);

  return (
    <ProtectedRoute>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
          flexDirection: "column",
        }}
      >
        {flight?.data?.map((item, index) => {
          return (
            <>
              <Card
                sx={{ minWidth: 275 }}
                style={{
                  width: "90%",
                  display: "flex",
                  alignSelf: "center",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#121212",
                  }}
                >
                  <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={4}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="subtitle2">
                          From Station
                        </Typography>
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0]?.arrival_airport},{" "}
                          {item?.flightitineraries[0]?.arrival_location}
                        </Typography>
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0]?.arrival_at}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={4}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <TrendingFlatIcon />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={4}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="subtitle2">To Station</Typography>
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0]?.departure_airport},{" "}
                          {item?.flightitineraries[0]?.departure_location}
                        </Typography>
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0]?.departure_at}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardContent
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: 24,
                  }}
                >
                  <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={12}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {bookingReq?.class_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />

                  <Box key={index} sx={{ flexGrow: 1, display: "flex" }}>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        lg={2}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <img
                          src={item?.flightitineraries[0].airline_logo}
                          alt="#NA"
                          style={{ height: 80, width: 80 }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={4}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {
                            item?.flightitineraries[0]?.arrival_at?.slice(
                              " "
                            )[1]
                          }
                        </Typography>
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0]?.arrival_iata}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
              </Card>
            </>
          );
        })}
      </div>
    </ProtectedRoute>
  );
}

export default list;
