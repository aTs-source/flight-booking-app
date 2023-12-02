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
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MenuIcon from "@mui/icons-material/Menu";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
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
    <Box sx={{ display: "flex" }}>
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
        sx={{ p: 3 }}
        style={{
          width: "80%",
          alignSelf: "center",
        }}
      >
        <Toolbar />
        {/* Content will be there */}
        <Button
          style={{ marginRight: 12, marginBottom: 24, borderRadius: 24 }}
          variant="outlined"
          key="one"
        >
          <SendRoundedIcon style={{ marginRight: 8 }} />
          One Day
        </Button>
        <Button
          style={{ marginRight: 12, marginBottom: 24, borderRadius: 24 }}
          variant="outlined"
          key="two"
        >
          <HistoryToggleOffRoundedIcon style={{ marginRight: 8 }} />
          Round Trip
        </Button>
        <Button
          style={{ marginRight: 12, marginBottom: 24, borderRadius: 24 }}
          variant="outlined"
          key="three"
        >
          <CorporateFareRoundedIcon style={{ marginRight: 8 }} />
          Multi-City
        </Button>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Flight From</Typography>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                  >
                    <SyncAltIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Flying To</Typography>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2">Departure Date</Typography>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Traveller(s)</Typography>
                  <Item>xs=8</Item>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Preferred Class</Typography>
                  <Item>xs=8</Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
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
