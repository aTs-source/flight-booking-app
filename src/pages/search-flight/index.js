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
import ButtonGroup from "@mui/material/ButtonGroup";
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
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/userSlice";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { decryptData, encryptData } from "@/utilities/crypto";
import ProtectedRoute from "../components/ProtectedRoute";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

const drawerWidth = 240;
const navItems = ["Cart", "Log out"];

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
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
  console.log(user);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const [anchorEl_2, setAnchorEl_2] = React.useState(null);
  const [travellersCount, setTravellersCount] = React.useState({
    adult: 0,
    child: 0,
    infant: 0,
  });

  const [loading, setLoading] = React.useState(true);

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
      alert(item);
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

    let encryptedData = await encryptData({ search_key: "CCU" });
    console.log("encryped", encryptedData);

    try {
      const airportURL =
        "https://devadmin.altabooking.com/api/v2/flight/search-flight-airport";
      response = await axios.post(airportURL, encryptedData, {
        headers: {
          Authorization: "Bearer " + user?.currentUser?.profile?.token,
          apikey: "indusAltaR2PSM",
          currency:
            "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCALQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvLCmpe0RATiqDh7g==",
        },
      });
    } catch (error) {
      console.log("\nError occured", error);
    } finally {
      console.log("air response", response);
      let decryptedData = await decryptData(response?.data?.response_data);
      // let temp = await decryptData(response?.request?.response);

      decryptedData = JSON.parse(decryptedData);
      console.log("airports", decryptedData);
      setLoading(false);
    }
  };

  const getFilghts = async () => {
    const data = await encryptData({
      from_airport: "iata VALUE",
      to_airport: "iata VALUE",
      departure_date: "YYYY-MM-DD",
      return_date: "YYYY-MM-DD",
      adults: "",
      childs: "",
      infants: "",
      class_type: "",
      travel_type: "oneway",
      user_id: 0,
    });

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
      console.log("Error", error);
    }
  };

  React.useEffect(() => {
    getAirportsList();
    // getFilghts()
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

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
                        }}
                      />
                      <Typography
                        style={{ display: "flex" }}
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
                        options={top100Films.map((option) => option.title)}
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
                          console.log("selected", event.target.value)
                        }
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
                        options={top100Films.map((option) => option.title)}
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
                          console.log("selected", event.target.value)
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
                      <PersonIcon style={{ marginRight: 8 }} />
                      <Typography variant="subtitle3">
                        1 Adults . 0 Child . 0 Infant
                      </Typography>
                      <ExpandMoreIcon style={{ marginLeft: 8 }} />
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
                      <PersonIcon style={{ marginRight: 8 }} />
                      <Typography variant="subtitle3">
                        1 Adults . 0 Child . 0 Infant
                      </Typography>
                      <ExpandMoreIcon style={{ marginLeft: 8 }} />
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
