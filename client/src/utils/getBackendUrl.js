const getBackendUrl = () => {
  const isLocalhost = window.location.hostname === "localhost";
  return isLocalhost
    ? "http://localhost:5000"
    : "https://ipo-s-live-tracker.onrender.com";      // Live Deployed Hosted Server
};  

export default getBackendUrl;
