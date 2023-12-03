import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MenuIcon from "@mui/icons-material/Menu";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/userSlice";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { decryptData, encryptData } from "@/utilities/crypto";
import ProtectedRoute from "../components/ProtectedRoute";
import { storeFlights } from "@/redux/reducers/flightSlice";

const airports = [
  { name: "John F. Kennedy International Airport", iata: "JFK" },
  { name: "Los Angeles International Airport", iata: "LAX" },
  { name: "Heathrow Airport", iata: "LHR" },
  { name: "Tokyo Haneda Airport", iata: "HND" },
  { name: "Dubai International Airport", iata: "DXB" },
  { name: "Beijing Capital International Airport", iata: "PEK" },
  { name: "Paris Charles de Gaulle Airport", iata: "CDG" },
  { name: "Singapore Changi Airport", iata: "SIN" },
  { name: "O'Hare International Airport", iata: "ORD" },
  { name: "Hong Kong International Airport", iata: "HKG" },
  { name: "Frankfurt Airport", iata: "FRA" },
  { name: "Denver International Airport", iata: "DEN" },
  { name: "Sydney Airport", iata: "SYD" },
  { name: "Incheon International Airport", iata: "ICN" },
  { name: "Amsterdam Schiphol Airport", iata: "AMS" },
  { name: "San Francisco International Airport", iata: "SFO" },
  { name: "Toronto Pearson International Airport", iata: "YYZ" },
  { name: "Munich Airport", iata: "MUC" },
  { name: "Dallas/Fort Worth International Airport", iata: "DFW" },
  { name: "Barcelona–El Prat Airport", iata: "BCN" },
  { name: "Indira Gandhi International Airport", iata: "DEL" },
  { name: "Chhatrapati Shivaji Maharaj International Airport", iata: "BOM" },
  { name: "Kempegowda International Airport", iata: "BLR" },
  { name: "Chennai International Airport", iata: "MAA" },
  { name: "Netaji Subhas Chandra Bose International Airport", iata: "CCU" },
  { name: "Rajiv Gandhi International Airport", iata: "HYD" },
  { name: "Cochin International Airport", iata: "COK" },
  { name: "Sardar Vallabhbhai Patel International Airport", iata: "AMD" },
  { name: "Goa International Airport", iata: "GOI" },
  { name: "Kochi Naval Air Station", iata: "NKL" },
  { name: "Shahjalal International Airport", iata: "DAC" },
  { name: "Hazrat Shah Jalal International Airport", iata: "DAC" },
  { name: "Osmani International Airport", iata: "ZYL" },
  { name: "Shah Amanat International Airport", iata: "CGP" },
  { name: "Jessore Airport", iata: "JSR" },
  { name: "Sylhet MAG Osmani International Airport", iata: "ZYL" },
  { name: "Cox's Bazar Airport", iata: "CXB" },
  { name: "Lalmonirhat Airport", iata: "LLJ" },
  { name: "Rajshahi Airport", iata: "RJH" },
  { name: "Barisal Airport", iata: "BZL" },
  { name: "Bandaranaike International Airport", iata: "CMB" },
  { name: "Mattala Rajapaksa International Airport", iata: "HRI" },
  { name: "Ratmalana Airport", iata: "RML" },
];

function DateTimePickerValue({ startDate, setStartDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DatePicker
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

const drawerWidth = 240;
const navItems = ["Cart", "Log out"];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DrawerAppBar(props) {
  const { window } = props;

  const user = useSelector((state) => state.user);
  const carts = useSelector((state) => state.carts);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const [anchorEl_2, setAnchorEl_2] = React.useState(null);
  const [travellersCount, setTravellersCount] = React.useState({
    adult: 0,
    child: 0,
    infant: 0,
  });

  const [iataFrom, setIATAFrom] = React.useState(null);
  const [iataTo, setIATATo] = React.useState(null);
  const [depDate, setDepDate] = React.useState("YYYY-MM-DD");
  const [startDate, setStartDate] = React.useState(dayjs(new Date()));
  // const [loading, setLoading] = React.useState(true);

  const [preferred, setPreferred] = React.useState(null);

  const handleChange = (event) => {
    setPreferred(event.target.value);
  };

  const handleClick_traveller = (event, updater) => {
    updater(event.currentTarget);
    // setopentraveller()
  };

  const handleClose_traveller = (updater) => {
    updater(null);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const appBarclickHandler = (item) => {
    if (item === "Log out") {
      dispatch(logout());
      router.replace("/login");
    } else if (item === "Cart") {
      console.log("\n\nAll Carts: \n\n", carts);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Search Flight
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const getAirportsList = async () => {
    let response;

    let encryptedData = await encryptData({
      search_key: "Indira Gandhi International Airport",
    });

    try {
      const airportURL =
        "https://devadmin.altabooking.com/api/v2/flight/search-flight-airport";
      response = await axios.post(
        airportURL,
        { request_data: encryptedData },
        {
          headers: {
            Authorization: "Bearer " + user?.currentUser?.profile?.token,
            apikey: "indusAltaR2PSM",
            currency:
              "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCALQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvLCmpe0RATiqDh7g==",
          },
        }
      );
    } catch (error) {
    } finally {
      let decryptedData = await decryptData(response?.data?.response_data);
      // let temp = await decryptData(response?.request?.response);

      decryptedData = JSON.parse(decryptedData);
      setLoading(false);
    }
  };

  const getFilghts = async (_tempData) => {
    const data = await encryptData(JSON.stringify(_tempData));

    let response;
    try {
      response = await axios.post(
        "https://devadmin.altabooking.com/api/v2/flight/flight-search-list",
        {
          request_data: data,
        },
        {
          headers: {
            apikey: "indusAltaR2PSM",
            currency:
              "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCALQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvLCmpe0RATiqDh7g==",
          },
        }
      );
    } catch (error) {
    } finally {
      let decryptedData = await decryptData(response?.data?.response_data);
      decryptedData = JSON.parse(decryptedData);
      dispatch(storeFlights({ decryptedData, _tempData }));
      router.push("/flight/list");
    }
  };

  function findIATAbyName(airportName, updater) {
    const matchedAirport = airports.find(
      (airport) => airport.name === airportName
    );

    if (matchedAirport) {
      updater(matchedAirport?.iata);
      return matchedAirport.iata;
    } else {
      updater(null);
      return "IATA code not found for the given airport name";
    }
  }

  React.useEffect(() => {
    // getAirportsList();
    // getFilghts()
  }, []);

  // if (loading) {
  //   return <h1>Loading</h1>;
  // }

  const handleSubmit = async () => {
    let _dt = new Date(startDate);
    let _temp = {
      from_airport: iataFrom,
      to_airport: iataTo,
      departure_date:
        _dt.getFullYear() +
        "-" +
        (_dt.getMonth() + 1) +
        "-" +
        (_dt.getDate() < 10 ? "0" + _dt.getDate() : _dt.getDate()),
      return_date: "",
      adults: travellersCount?.adult,
      childs: travellersCount?.child,
      infants: travellersCount?.infant,
      class_type: preferred,
      travel_type: "oneway",
      user_id: 0,
    };
    await getFilghts(_temp);
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Search Flight
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={() => appBarclickHandler(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box
          component="main"
          sx={{ p: 10 }}
          style={{
            width: "95%",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          {/* Content will be there */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              style={{
                backgroundColor: "#121212",
                justifyContent: "flex-start",
                display: "flex",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Item
                      style={{
                        borderRadius: 24,
                        display: "flex",
                        justifyContent: "space-arround",
                        alignItems: "center",
                      }}
                    >
                      <SendRoundedIcon
                        style={{
                          marginRight: 8,
                          height: 20,
                          width: 20,
                          display: "flex",
                          color: "#fff",
                        }}
                      />
                      <Typography
                        style={{ display: "flex", color: "#fff" }}
                        variant="subtitle3"
                      >
                        One Way
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item>
                    <Item
                      style={{
                        borderRadius: 24,
                        display: "flex",
                        justifyContent: "space-arround",
                        alignItems: "center",
                      }}
                    >
                      <HistoryToggleOffRoundedIcon
                        style={{
                          marginRight: 8,
                          height: 20,
                          width: 20,
                          display: "flex",
                        }}
                      />
                      <Typography variant="subtitle2">Round Trip</Typography>
                    </Item>
                  </Grid>
                  <Grid item>
                    <Item
                      style={{
                        borderRadius: 24,
                        display: "flex",
                        justifyContent: "space-arround",
                        alignItems: "center",
                      }}
                    >
                      <CorporateFareRoundedIcon style={{ marginRight: 8 }} />
                      <Typography variant="subtitle2">Multi-City</Typography>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275, padding: 2 }}>
            <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} lg={4}>
                    <Typography variant="subtitle2">Flight From</Typography>
                    <Item
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Autocomplete
                        style={{
                          width: "100%",
                        }}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={airports.map((option) => option.name)}
                        renderInput={(params) => (
                          <TextField
                            style={{
                              borderWidth: 0,
                              backgroundColor: "transparent",
                            }}
                            {...params}
                            // label="Search input"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                        onSelect={(event) => {
                          findIATAbyName(event.target.value, setIATAFrom);
                        }}
                      />
                      {/* <PersonIcon style={{ marginRight: 8 }} /> */}
                      {/* <Typography variant="subtitle3">
                      1 Adults . 0 Child . 0 Infant
                    </Typography> */}
                      <FmdGoodIcon style={{ marginLeft: 8 }} />
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={1}
                    lg={1}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: 12,
                    }}
                  >
                    <SyncAltIcon style={{ display: "flex" }} />
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <Typography variant="subtitle2">Flying To</Typography>
                    <Item
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Autocomplete
                        style={{
                          width: "100%",
                        }}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={airports.map((option) => option.name)}
                        renderInput={(params) => (
                          <TextField
                            style={{
                              borderWidth: 0,
                              backgroundColor: "transparent",
                            }}
                            {...params}
                            // label="Search input"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                        onSelect={(event) =>
                          findIATAbyName(event.target.value, setIATATo)
                        }
                      />
                      {/* <PersonIcon style={{ marginRight: 8 }} /> */}
                      {/* <Typography variant="subtitle3">
                      1 Adults . 0 Child . 0 Infant
                    </Typography> */}
                      <FmdGoodIcon style={{ marginLeft: 8 }} />
                    </Item>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={3}>
                    <Typography variant="subtitle2">Departure Date</Typography>
                    <Item
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <DateTimePickerValue
                        startDate={startDate}
                        setStartDate={setStartDate}
                      />
                      {/* <Typography variant="subtitle3">{depDate}</Typography> */}
                      {/* <EventAvailableIcon /> */}
                      {/* <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      /> */}
                    </Item>
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <Typography variant="subtitle2">Traveller(s)</Typography>
                    <Item
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={(event) =>
                        handleClick_traveller(event, setAnchorEl_1)
                      }
                    >
                      <PersonIcon style={{ marginRight: 8 }} />
                      <Typography variant="subtitle3">
                        {travellersCount?.adult} Adults .{" "}
                        {travellersCount?.child} Child .{" "}
                        {travellersCount?.infant} Infant
                      </Typography>
                      <ExpandMoreIcon style={{ marginLeft: 8 }} />
                    </Item>
                    <Popover
                      id={"simple-popover"}
                      open={Boolean(anchorEl_1)}
                      anchorEl={anchorEl_1}
                      onClose={() => handleClose_traveller(setAnchorEl_1)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }} variant="subtitle2">
                        Traveller(s)
                      </Typography>
                      <Divider />
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Typography sx={{ p: 2 }} variant="subtitle2">
                          Adult
                        </Typography>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            style={{
                              height: 28,
                              width: 10,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            variant="contained"
                            disabled={travellersCount?.adult <= 0}
                            onClick={() =>
                              setTravellersCount((prev) => ({
                                ...prev,
                                adult: travellersCount?.adult - 1,
                              }))
                            }
                          >
                            <RemoveIcon />
                          </Button>
                          <Typography sx={{ p: 2 }} variant="subtitle2">
                            {travellersCount?.adult}
                          </Typography>
                          <Button
                            style={{
                              height: 28,
                              width: 10,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            variant="contained"
                            onClick={() =>
                              setTravellersCount((prev) => ({
                                ...prev,
                                adult: travellersCount?.adult + 1,
                              }))
                            }
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        <Divider />
                      </div>
                      <Divider />
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Typography sx={{ p: 2 }} variant="subtitle2">
                          Child
                        </Typography>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            style={{
                              height: 28,
                              width: 10,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            variant="contained"
                            disabled={travellersCount?.child <= 0}
                            onClick={() =>
                              setTravellersCount((prev) => ({
                                ...prev,
                                child: travellersCount?.child - 1,
                              }))
                            }
                          >
                            <RemoveIcon />
                          </Button>
                          <Typography sx={{ p: 2 }} variant="subtitle2">
                            {travellersCount?.child}
                          </Typography>
                          <Button
                            style={{
                              height: 28,
                              width: 10,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            variant="contained"
                            onClick={() =>
                              setTravellersCount((prev) => ({
                                ...prev,
                                child: travellersCount?.child + 1,
                              }))
                            }
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        <Divider />
                      </div>
                      <Divider />
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Typography sx={{ p: 2 }} variant="subtitle2">
                          Infant
                        </Typography>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            style={{
                              height: 28,
                              width: 10,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            variant="contained"
                            disabled={travellersCount.infant <= 0}
                            onClick={() =>
                              setTravellersCount((prev) => ({
                                ...prev,
                                infant: travellersCount?.infant - 1,
                              }))
                            }
                          >
                            <RemoveIcon />
                          </Button>
                          <Typography sx={{ p: 2 }} variant="subtitle2">
                            {travellersCount?.infant}
                          </Typography>
                          <Button
                            style={{
                              height: 28,
                              width: 10,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            variant="contained"
                            onClick={() =>
                              setTravellersCount((prev) => ({
                                ...prev,
                                infant: travellersCount?.infant + 1,
                              }))
                            }
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        <Divider />
                      </div>
                    </Popover>
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <Typography variant="subtitle2">Preferred Class</Typography>
                    <Item
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FormControl>
                        <Select
                          style={{ width: 300 }}
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={preferred}
                          onChange={handleChange}
                          autoWidth
                        >
                          <MenuItem value={"ECONOMY"}>ECONOMY</MenuItem>
                          <MenuItem value={"PREMIUM_ECONOMY"}>
                            PREMIUM_ECONOMY
                          </MenuItem>
                          <MenuItem value={"BUSINESS"}>BUSINESS</MenuItem>
                          <MenuItem value={"FIRST"}>FIRST</MenuItem>
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: 24,
              }}
            >
              <Button
                size="small"
                variant="contained"
                style={{ display: "flex" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
