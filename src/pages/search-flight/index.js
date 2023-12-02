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

import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/userSlice";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const [travellersCount, setTravellersCount] = React.useState(0);
  const [openTraveller, setopentraveller] = React.useState(false);

  const handleClick_traveller = (event, updater) => {
    updater(event.currentTarget);
    // setopentraveller()
  };

  const handleClose_traveller = (updater) => {
    updater(null);
  };

  const open = Boolean(anchorEl_1);
  const id = open ? "simple-popover" : undefined;

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

  return (
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
                    <Typography style={{ display: "flex" }} variant="subtitle3">
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
                    {/* <PersonIcon style={{ marginRight: 8 }} /> */}
                    <Typography variant="subtitle3">
                      1 Adults . 0 Child . 0 Infant
                    </Typography>
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
                    <PersonIcon style={{ marginRight: 8 }} />
                    <Typography variant="subtitle3">
                      1 Adults . 0 Child . 0 Infant
                    </Typography>
                    <ExpandMoreIcon style={{ marginLeft: 8 }} />
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
                      {travellersCount} Adults . 0 Child . 0 Infant
                    </Typography>
                    <ExpandMoreIcon style={{ marginLeft: 8 }} />
                  </Item>
                  <Popover
                    id={"simple-popover"}
                    open={open}
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
                          disabled={travellersCount <= 0}
                          onClick={() => setTravellersCount((prev) => prev - 1)}
                        >
                          <RemoveIcon />
                        </Button>
                        <Typography sx={{ p: 2 }} variant="subtitle2">
                          {travellersCount}
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
                          onClick={() => setTravellersCount((prev) => prev + 1)}
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
