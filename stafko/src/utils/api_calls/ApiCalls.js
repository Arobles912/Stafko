export async function fetchProjects({ username, token, setProjects }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const userData = await response.json();
      const staffId = userData.staff_id;
      const staffProjectsResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/staffProject/staff/${staffId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (staffProjectsResponse.ok) {
        const staffProjectsData = await staffProjectsResponse.json();
        const projectsData = await Promise.all(
          staffProjectsData.map(async (staffProject) => {
            const projectResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/projects/${
                staffProject.project_id
              }`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (projectResponse.ok) {
              const projectData = await projectResponse.json();
              return {
                project: projectData,
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

export async function fetchOwner({ projectOwner, token, setProjectOwner }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff/username/${projectOwner}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProjectOwner(data.staff_id);
    }
  } catch (error) {
    console.error("Failed to fetch project owner: ", error);
  }
}

export async function fetchUsers(setUsers) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/staff`);
    if (response.ok) {
      const userData = await response.json();
      setUsers(userData);
    }
  } catch (error) {
    console.error("Failed to fetch users: ", error);
  }
}

export async function fetchCustomers(setCustomers) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/customers`
    );
    if (response.ok) {
      const customerData = await response.json();
      setCustomers(customerData);
    }
  } catch (error) {
    console.error("Failed to fetch customers: ", error);
  }
}

export async function addUser(selectedUsers, setSelectedUsers) {
  const userSelect = document.getElementById("users");
  const selectedUser = userSelect.value;
  if (selectedUsers.some((user) => user.username === selectedUser)) {
    console.log("User already exists in the list.");
  } else {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/staff/username/${selectedUser}`
      );
      if (response.ok) {
        const userData = await response.json();
        const staffId = userData.staff_id;
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
  try {
    const [staffProjectsResponse, descriptionResponse, collaboratorsResponse] =
      await Promise.all([
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${
            project.staffProject.project_id
          }`
        ),
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/projects/${
            project.staffProject.project_id
          }`
        ),
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${
            project.staffProject.project_id
          }/users`
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

      setStaffProjectsData(staffData);
      setInitialDesc(descriptionData.description);
      setCollaborators(collaboratorsData);
      setAllCollaborators(collaboratorsData);
      setLoading(false);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error has occurred:", error);
  }
}

export async function createStaffProject({ staffId, projectId }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staffProject`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff/${projectOwner}`
    );
    if (response.ok) {
      const data = await response.json();
      setProjectOwner(data.username);
    }
  } catch (error) {
    console.error("Failed to fetch project owner: ", error);
  }
}

export async function fetchCustomerName({
  projectCustomer,
  setProjectCustomer,
}) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/customers/${projectCustomer}`
    );
    if (response.ok) {
      const data = await response.json();
      setProjectCustomer(data.customer_name);
    }
  } catch (error) {
    console.error("Failed to fetch project customer: ", error);
  }
}

export async function fetchUserInfo(project, username, formatTime, setEmail, setTotalTime) {
  try {
    const userResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/staff/username/${username}`
    );
    if (userResponse.ok) {
      const userData = await userResponse.json();
      const userId = userData.staff_id;
      const userEmail = userData.email;
      setEmail(userEmail);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staffProject/${userId}/${
            project.staffProject.project_id
          }`
        );
        if (response.ok) {
          const staffProjectData = await response.json();
          const totalHours = staffProjectData.total_time;
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
