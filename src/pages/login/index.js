import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { headers } from "../../../next.config";
import axios from "axios";
import SecretKey from "../../constants/secret-key";
import { decryptData, encryptData } from "@/utilities/crypto";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducers/userSlice";
import { useRouter } from "next/router";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let response;
    let encryptedData;
    try {
      encryptedData = await encryptData(
        JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        })
      );
    } catch (error) {
      console.log("Error to encrypt data", error);
      return;
    } finally {
      try {
        const loginURL = "https://devadmin.altabooking.com/api/v2/auth/login";
        response = await axios.post(
          loginURL,
          {
            request_data: encryptedData,
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
        console.log("\n\nError occured to login\n Error: -++>>", error);
      } finally {
        // console.log("\nLogin response", response?.data?.response_data);
        try {
          response = await decryptData(response?.data?.response_data);
        } catch (error) {
          console.log("\nError occured to decrypt data", error);
        } finally {
          response = JSON.parse(response);
          dispatch(login(response?.data));
          router.replace("/search-flight");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs sm={12} lg={12}>
                <Typography variant="body1" gutterBottom>
                  Email Address*
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  // label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs sm={12} lg={12}>
                <Typography variant="body1" gutterBottom>
                  Password*
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  // label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>

            <Grid
              container
              sx={{ mt: 3, mb: 2 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item xs sm={4}>
                <Button type="submit" fullWidth variant="contained">
                  Sign In
                </Button>
              </Grid>
              <Grid item xs sm={4}>
                <Link
                  href="#"
                  variant="body2"
                  style={{ display: "flex", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
