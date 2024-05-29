export async function updateTokens({
  refreshToken,
  setRefreshToken,
  setAccessToken
}) {
  try {

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({refreshToken}),
      }
    );

    const data = await response.json();
    if (response.ok) {
      const currentTime = Date.now();
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      localStorage.setItem("accessToken", data.data.access_token);
      localStorage.setItem("refreshToken", data.data.refresh_token);
      localStorage.setItem("lastRefreshTime", currentTime.toString());

      console.log(localStorage.getItem("refreshToken"));
      console.log(localStorage.getItem("accessToken"));
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Error updating tokens:", error.message);
  }
}