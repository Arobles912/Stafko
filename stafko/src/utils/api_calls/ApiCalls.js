export async function fetchProjects({ username, setProjects }) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      const staffId = userData.data.find(
        (user) => user.username === username
      )?.staff_id;
      if (!staffId) {
        console.log("Staff ID not found");
        return;
      }

      const staffProjectsResponse = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/staffProject/staff/${staffId}`,
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
              `${import.meta.env.VITE_BACKEND_URL}/projects/${
                staffProject.project_id
              }`,
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
      `${
        import.meta.env.VITE_BACKEND_URL
      }/staff/${projectOwner}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setProjectOwner(data.data[0].staff_id);
      } else {
        console.log("Project owner not found");
      }
    }
  } catch (error) {
    console.error("Failed to fetch project owner: ", error);
  }
}

export async function fetchUsers(setUsers, projectOwner) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const userData = await response.json();
      const filteredUsers = userData.data.filter(
        (user) => user.username !== projectOwner
      );
      setUsers(filteredUsers);
      return filteredUsers; 
    }
  } catch (error) {
    console.error("Failed to fetch users: ", error);
  }
}


export async function fetchCustomers(setCustomers) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/customers`,
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/staff/username/${selectedUser}`,
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
  setLoading,
}) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const [staffProjectsResponse, descriptionResponse] = await Promise.all([
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${project.staffProject.project_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/projects/${project.staffProject.project_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    ]);

    if (staffProjectsResponse.ok && descriptionResponse.ok) {
      const [staffProjectsData, descriptionData] = await Promise.all([
        staffProjectsResponse.json(),
        descriptionResponse.json(),
      ]);

      const staffIds = staffProjectsData.data.map((staffProject) => staffProject.staff_id);

      const staffResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/staff/${staffIds.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (staffResponse.ok) {
        const staffData = await staffResponse.json();

        const usernames = staffData.data.map((staff) => staff.username);

        setCollaborators(usernames);
        setAllCollaborators(usernames);
        setStaffProjectsData(staffProjectsData.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch staff data");
      }
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error has occurred:", error);
  }
}



export async function createStaffProject({ staffId, projectId }) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staffProject`,
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

export async function fetchOwnerName({ projectOwner, setProjectOwner }) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff/${projectOwner}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProjectOwner(data.data.username);
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
      `${
        import.meta.env.VITE_BACKEND_URL
      }customers/${projectCustomer}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProjectCustomer(data.data.customer_name);
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
      `${
        import.meta.env.VITE_BACKEND_URL
      }/staff/username/${username}`,
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
          `${
            import.meta.env.VITE_BACKEND_URL
          }/items/staff_project?filter[staff_id][_eq]=${userId}&filter[project_id][_eq]=${
            project.staffProject.project_id
          }`,
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
