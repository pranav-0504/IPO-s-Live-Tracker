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

export default getBackendUrl;


// ! AWS Cloud HOSTED SERVER Backend Links
// http://13.234.204.195:5000/
// http://13.234.204.195:5000/api/ipos

/*
const getBackendUrl = () => {
  const isLocalhost = window.location.hostname === "localhost";
  return isLocalhost
    ? "http://localhost:5000"
    ? "http://13.234.204.195:5000/"
    : "https://ipo-s-live-tracker.onrender.com";      // Live Deployed Hosted Server
};  

export default getBackendUrl;
*/