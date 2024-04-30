export async function startTimer(project, setTimer, setTime) {
    setTime(1);
    try {
      const response = await fetch(
        `https://api.clockify.me/api/v1/workspaces/662f52726feaaf7addde49f8/time-entries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `ODFjNTBlYzMtNWVjMi00OGIyLTllZTQtNTdhOGM2MzRhNzlh`,
          },
          body: JSON.stringify({
            start: new Date().toISOString(),
            billable: true,
            description: project.project.project_name,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to start time entry");
      }
  
      console.log("Time entry started successfully.");
  
      const responseData = await response.json();
      setTimer(responseData.id);
    } catch (error) {
      console.error("Error starting time entry:", error);
    }
  }
  
  export async function stopTimer(timer, setTimer, setTime) {
    setTime(0);
    try {
      if (!timer) {
        throw new Error("Timer is not running.");
      }
      const response = await fetch(
        `https://api.clockify.me/api/v1/workspaces/662f52726feaaf7addde49f8/time-entries/${timer}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `ODFjNTBlYzMtNWVjMi00OGIyLTllZTQtNTdhOGM2MzRhNzlh`,
          },
          body: JSON.stringify({
            id: timer,
            end: new Date().toISOString(),
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to stop time entry");
      }
  
      console.log("Time entry stopped successfully.");
    } catch (error) {
      console.error("Error stopping time entry:", error);
    } finally {
      setTimer(null);
    }
  }