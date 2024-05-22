export async function loginUser({ email, pass, setIsLoggedIn, setError }) {
  try {
    const directusResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass
        }),
      }
    );

    if (directusResponse.ok) {
      const directusData = await directusResponse.json();

      const staffResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/staff/email/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!staffResponse.ok) {
        throw new Error("Failed to get user data from staff table");
      }
      const staffData = await staffResponse.json();

      if (staffData.length === 0) {
        setError("User not found");
        return;
      }

      localStorage.setItem("accessToken", directusData.data.access_token);
      localStorage.setItem("refreshToken", directusData.data.refresh_token);
      localStorage.setItem("username", staffData.username);
      setIsLoggedIn(true);
    } else {
      const data = await directusResponse.json();
      setError(data.error.message || "Incorrect username or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    setError("Failed to log user. Please try again later.");
  }
}

export async function registerUser({
  username,
  pass,
  email,
  navigate,
  setError,
}) {
  if (!username || !pass || !email) {
    setError("All fields are required.");
    return;
  }

  const userRole = import.meta.env.VITE_DIRECTUS_CUSTOMER_ROLE;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass,
          first_name: username,
          role: userRole,
        }),
      }
    );

    if (response.ok) {
      console.log("User registered successfully");
      alert("User registered successfully.");
      navigate("/");
    } else {
      const data = await response.json();
      setError(data.error.message || "Failed to register user");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    setError("Failed to register user. Please try again later.");
  }
}
