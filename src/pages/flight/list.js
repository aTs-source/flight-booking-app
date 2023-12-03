import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";

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
import { storeCarts } from "@/redux/reducers/cartSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function list() {
  const router = useRouter();
  const dispatch = useDispatch();

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
                  marginBottom: 24,
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
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      // flexDirection: "row",
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      style={{
                        // display: "flex",
                        // justifyContent: "space-between",
                        alignItems: "row",
                      }}
                    >
                      <Grid item xs={12} sm={12} lg={12}>
                        <Typography variant="subtitle2">
                          {bookingReq?.class_type}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={2} lg={2}>
                        <img
                          src={item?.flightitineraries[0].airline_logo}
                          alt="#NA"
                          style={{ height: 80, width: 80 }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        lg={2}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0].arrival_time}
                        </Typography>
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0].arrival_code}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={4}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TrendingFlatIcon />
                        <Typography
                          variant="subtitle2"
                          style={{ justifyContent: "space-around" }}
                        >
                          {item?.flightitineraries[0]?.duration_text}
                          {" | "}
                          {item?.flightitineraries[0]?.stoppage_text}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        lg={2}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0].departure_time}
                        </Typography>
                        <Typography variant="subtitle2">
                          {item?.flightitineraries[0].departure_code}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        lg={2}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {item?.price}
                        </Typography>
                        <Button
                          onClick={() => dispatch(storeCarts(item))}
                          variant="contained"
                        >
                          Select
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </>
          );
        })}
      </div>
    </ProtectedRoute>
  );
}

export default list;
