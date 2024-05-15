export async function fetchProjects({ username, setProjects }) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      const staffId = userData.data.find((user) => user.username === username)
        ?.staff_id;
      if (!staffId) {
        console.log("Staff ID not found");
        return;
      }

      const staffProjectsResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project?filter[staff_id][_eq]=${staffId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (staffProjectsResponse.ok) {
        const staffProjectsData = await staffProjectsResponse.json();
        const projectsData = await Promise.all(
          staffProjectsData.data.map(async (staffProject) => {
            const projectResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects/${staffProject.project_id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (projectResponse.ok) {
              const projectData = await projectResponse.json();
              return {
                project: projectData.data,
                staffProject: staffProject,
              };
            } else {
              console.log(
                `Project not found with the id: ${staffProject.project_id}`
              );
              return null;
            }
          })
        );
        setProjects(projectsData.filter((project) => project !== null));
      } else {
        console.log("Could not find any projects.");
      }
    } else {
      console.log("An error has occurred");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchOwner({ projectOwner, setProjectOwner }) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff?filter[username][_eq]=${projectOwner}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProjectOwner(data.data[0].staff_id);
    }
  } catch (error) {
    console.error("Failed to fetch project owner: ", error);
  }
}

export async function fetchUsers(setUsers) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const userData = await response.json();
      setUsers(userData.data);
    }
  } catch (error) {
    console.error("Failed to fetch users: ", error);
  }
}

export async function fetchCustomers(setCustomers) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/customers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const customerData = await response.json();
      setCustomers(customerData.data);
    }
  } catch (error) {
    console.error("Failed to fetch customers: ", error);
  }
}

export async function addUser(selectedUsers, setSelectedUsers) {
  const accessToken = localStorage.getItem("accessToken");
  const userSelect = document.getElementById("users");
  const selectedUser = userSelect.value;

  if (selectedUsers.some((user) => user.username === selectedUser)) {
    console.log("User already exists in the list.");
  } else {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff?filter[username][_eq]=${selectedUser}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        const staffId = userData.data[0].staff_id;
        setSelectedUsers((prevUsers) => [
          ...prevUsers,
          { username: selectedUser, id: staffId },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch staff ID: ", error);
    }
  }
}

export async function fetchData({
  project,
  setStaffProjectsData,
  setAllCollaborators,
  setCollaborators,
  setInitialDesc,
  setLoading,
}) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const [staffProjectsResponse, descriptionResponse, collaboratorsResponse] =
      await Promise.all([
        fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project?filter[project_id][_eq]=${project.staffProject.project_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
        fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects/${project.staffProject.project_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
        fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project?filter[project_id][_eq]=${project.staffProject.project_id}&_join=users`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
      ]);

    if (
      staffProjectsResponse.ok &&
      descriptionResponse.ok &&
      collaboratorsResponse.ok
    ) {
      const [staffData, descriptionData, collaboratorsData] = await Promise.all(
        [
          staffProjectsResponse.json(),
          descriptionResponse.json(),
          collaboratorsResponse.json(),
        ]
      );

      setStaffProjectsData(staffData.data);
      setInitialDesc(descriptionData.data[0].description);
      setCollaborators(collaboratorsData.data);
      setAllCollaborators(collaboratorsData.data);
      setLoading(false);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error has occurred:", error);
  }
}

export async function createStaffProject({
  staffId,
  projectId,
}) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          staff_id: staffId,
          project_id: projectId,
        }),
      }
    );
    if (response.ok) {
      console.log("User-project relation created.");
      return true;
    } else {
      console.log("User-project error.");
      return false;
    }
  } catch (error) {
    console.error("An error has occurred: ", error);
    return false;
  }
}

export async function fetchOwnerName({
  projectOwner,
  setProjectOwner,
}) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff/${projectOwner}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProjectOwner(data.data[0].username);
    }
  } catch (error) {
    console.error("Failed to fetch project owner: ", error);
  }
}

export async function fetchCustomerName({
  projectCustomer,
  setProjectCustomer,
}) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/customers/${projectCustomer}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProjectCustomer(data.data[0].customer_name);
    }
  } catch (error) {
    console.error("Failed to fetch project customer: ", error);
  }
}

export async function fetchUserInfo(
  project,
  username,
  formatTime,
  setEmail,
  setTotalTime
) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const userResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff?filter[username][_eq]=${username}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (userResponse.ok) {
      const userData = await userResponse.json();
      const userId = userData.data[0].staff_id;
      const userEmail = userData.data[0].email;
      setEmail(userEmail);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project?filter[staff_id][_eq]=${userId}&filter[project_id][_eq]=${project.staffProject.project_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const staffProjectData = await response.json();
          const totalHours = staffProjectData.data[0].total_time;
          const formattedTime = formatTime(totalHours);
          setTotalTime(formattedTime);
        } else {
          console.error("Time couldn't be fetched.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  } catch (error) {
    console.error("Failed to fetch user: ", error);
  }
}
