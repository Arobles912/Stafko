import React, { useState, useEffect } from "react";
import "./styles/EditProjectName.css";
import { fetchCustomers } from "../../utils/api_calls/ApiCalls";

export default function ChangeProjectCustomer({
  setIsChangeProjectCustomer,
  project,
}) {
  const [projectCustomer, setProjectCustomer] = useState(
    project.project.associated_customer
  );
  const [customers, setCustomers] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    fetchCustomers(setCustomers);
  }, []);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  async function handleConfirm() {
    const accessToken = localStorage.getItem("accessToken");

    const confirmed = window.confirm(
      "Are you sure you want to confirm the changes?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects/${
            project.project.project_id
          }`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              associated_customer: projectCustomer,
            }),
          }
        );
        if (response.ok) {
          console.log("Project customer updated successfully.");
          setShouldReload(true);
          return true;
        } else {
          console.log("Project customer couldn't be updated.");
          return false;
        }
      } catch (error) {
        console.log("Couldn't update the project customer: ", error);
        return false;
      }
    }
  }

  return (
    <div className="main-edit-project-name-div">
      <div className="edit-project-name-div">
        <div className="close-div">
          <button
            type="button"
            onClick={() => setIsChangeProjectCustomer(false)}
          >
            X
          </button>
        </div>
        <h3>Change project customer</h3>
        <select
          name="customers"
          id="customers"
          className="select-project-customer"
          value={projectCustomer}
          onChange={(e) => setProjectCustomer(e.target.value)}
        >
          <option>Select customer</option>
          {customers.map((customer) => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.customer_name}
            </option>
          ))}
        </select>
        <br />
        <button
          type="button"
          className="confirm-button"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
