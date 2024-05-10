export async function createProjectIfNotExist(projectName) {
  try {
    const response = await fetch(
      `https://api.clockify.me/api/v1/workspaces/662f52726feaaf7addde49f8/projects?name=${encodeURIComponent(
        projectName
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `ODFjNTBlYzMtNWVjMi00OGIyLTllZTQtNTdhOGM2MzRhNzlh`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to check if project exists");
    }

    const responseData = await response.json();

    let projectId;
    if (responseData.length === 0) {
      const createProjectResponse = await fetch(
        `https://api.clockify.me/api/v1/workspaces/662f52726feaaf7addde49f8/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `ODFjNTBlYzMtNWVjMi00OGIyLTllZTQtNTdhOGM2MzRhNzlh`,
          },
          body: JSON.stringify({
            name: projectName,
            billable: true,
          }),
        }
      );

      if (!createProjectResponse.ok) {
        throw new Error("Failed to create project");
      }

      const createdProjectData = await createProjectResponse.json();
      projectId = createdProjectData.id;

      console.log("Project created successfully.");
    } else {
      projectId = responseData[0].id;
      console.log("Project already exists.");
    }

    return projectId;
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
}

export async function startTimer(project, setTimer, setTime, username) {
  setTime(1);
  try {
    const projectId = await createProjectIfNotExist(
      project.project.project_name
    );
    if (!projectId) {
      throw new Error("Failed to create or find project");
    }

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
          description: username,
          projectId: projectId,
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
  try {
    if (!timer) {
      throw new Error("Timer is not running.");
    }
    const response = await fetch(
      `https://api.clockify.me/api/v1/workspaces/662f52726feaaf7addde49f8/user/662f52726feaaf7addde49f7/time-entries`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `ODFjNTBlYzMtNWVjMi00OGIyLTllZTQtNTdhOGM2MzRhNzlh`,
        },
        body: JSON.stringify({
          end: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to stop time entry");
    }

    const elapsedTime = await getActiveTimer();

    console.log("Time entry stopped successfully.");
    return elapsedTime;
  } catch (error) {
    console.error("Error stopping time entry:", error);
    return null;
  } finally {
    setTimer(null);
    setTime(0);
  }
}

export async function getActiveTimer() {
  try {
    const response = await fetch(
      `https://api.clockify.me/api/v1/workspaces/662f52726feaaf7addde49f8/user/662f52726feaaf7addde49f7/time-entries`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `ODFjNTBlYzMtNWVjMi00OGIyLTllZTQtNTdhOGM2MzRhNzlh`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get active timer");
    }

    const responseData = await response.json();

    if (responseData.length === 0) {
      return 0;
    }

    const activeTimer = responseData[0];
    const startTime = new Date(activeTimer.timeInterval.start);
    const currentTime = new Date();
    const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

    return elapsedTimeInSeconds;
  } catch (error) {
    console.error("Error getting active timer:", error);
    return null;
  }
}

export async function updateTotalTime({ milliseconds, username, project }) {
  try {
    const userResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff/username/${username}`
    );
    if (userResponse.ok) {
      const userData = await userResponse.json();
      const userId = userData.staff_id;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staffProject/${userId}/${
            project.staffProject.project_id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const projectData = await response.json();
          const totalTime = projectData.total_time || 0;
          const newTotalTime = totalTime + milliseconds;
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/staffProject/${userId}/${
              project.staffProject.project_id
            }`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                total_time: newTotalTime,
              }),
            }
          );
          console.log("Time updated.");
        } else {
          console.error("Time couldn't be updated.");
        }
      } catch (error) {
        console.error("Error updating time:", error);
      }
    }
  } catch (error) {
    console.error("Failed to fetch user: ", error);
  }
}
