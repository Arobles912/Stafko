export async function loginUser({ username, pass, setIsLoggedIn, setError }) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            pass,
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setIsLoggedIn(true);
      } else {
        const data = await response.json();
        setError(data.message || "Incorrect username or password");
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
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            pass,
            email,
          }),
        }
      );
  
      if (response.ok) {
        console.log("User registered successfully");
        alert("User registered succesfully.");
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to register user");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to register user. Please try again later.");
    }
  }
  