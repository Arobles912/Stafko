export const authenticateWithClockify = () => {
    const client_id = "tu_client_id";
    const redirect_uri = "http://localhost:3000/home";
    const authorize_url = "https://clockify.me/oauth/authorize";
    const url = `${authorize_url}?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    const popupWindow = window.open(url, "_blank", "width=600,height=600");
  
    const interval = setInterval(() => {
      if (popupWindow.closed) {
        clearInterval(interval);
        handlePopupClosed();
      }
    }, 1000);
  };
  
  export const fetchAccessToken = async (authorizationCode) => {
    try {
      const response = await fetch("https://api.clockify.me/api/v1/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: authorizationCode,
          client_id: "tu_client_id",
          client_secret: "tu_client_secret",
          redirect_uri: "tu_uri_de_redireccion",
          grant_type: "authorization_code",
        }),
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      return null;
    }
  };
  