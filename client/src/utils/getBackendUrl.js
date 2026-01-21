const getBackendUrl = () => {
  const isLocalhost = window.location.hostname === "localhost";
  return isLocalhost
    // ? "http://localhost:5000"          //  Local Development Server
    ? "http://13.234.204.195:5000/"       //! AWS Cloud HOSTED SERVER 
    : "https://ipo-s-live-tracker.onrender.com";      //  Render.com Hosted Server
};  

export default getBackendUrl;


// ! AWS Cloud HOSTED SERVER Backend Links
// http://13.234.204.195:5000/
// http://13.234.204.195:5000/api/ipos

/*
const getBackendUrl = () => {
  const host = window.location.hostname;

  if (host === "localhost") {
    return "http://localhost:5000";
  }

  if (host.includes("netlify.app")) {
    return "http://13.234.204.195:5000";
  }

  return "https://ipo-s-live-tracker.onrender.com";
};
*/