import React, { useEffect } from "react";
import Router from "next/router";

const ErrorPage = ({ statusCode }) => {
  console.log("Error Occured");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Redirect to the index page after a short delay (e.g., 3 seconds)
      const redirectTimeout = setTimeout(() => {
        Router.replace("/");
      }, 2000);

      // Clear the timeout to prevent the redirection if the component is unmounted
      return () => clearTimeout(redirectTimeout);
    }
  }, []);

  return (
    <div>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on the server`
          : "An error occurred on the client"}
      </p>
      <p>Redirecting to the home page...</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
