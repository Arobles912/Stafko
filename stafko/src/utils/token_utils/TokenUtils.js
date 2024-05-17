export async function updateTokens({
  refreshToken,
  setRefreshToken,
  setAccessToken
}) {
  try {
    const payload = {
      refresh_token: refreshToken,
      mode: "json"
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setRefreshToken(data.data.refresh_token); 
      localStorage.setItem("refreshToken", data.data.refresh_token);
      setAccessToken(data.data.access_token); 
      localStorage.setItem("accessToken", data.data.access_token);  
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Error updating tokens:", error.message);
  }
}
