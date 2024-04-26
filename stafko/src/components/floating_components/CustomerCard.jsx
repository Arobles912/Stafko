import React, { useState, useEffect } from "react";
import "./styles/CustomerCard.css";

export default function CustomerCard({ project, setIsEditCustomer }) {
  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [sector, setSector] = useState("");
  const [cif, setCif] = useState("");
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/customers/${
            project.project.associated_customer
          }`
        );
        if (response.ok) {
          const data = await response.json();
          setCustomerName(data.customer_name);
          setCity(data.city);
          setCountry(data.country);
          setPhoneNumber(data.phone_number);
          setCustomerEmail(data.email);
          setWebsite(data.website);
          setSector(data.sector);
          setCif(data.cif);
          console.log("Customer data fetched succesfully.");
        } else {
          console.log("Customer data couldn't be fetched.");
        }
      } catch (error) {
        console.log("Couldn't fetch the customer data: ", error);
      }
    }
    fetchCustomerData();
  }, [project.project.associated_customer]);

  async function handleConfirm() {
    const confirmed = window.confirm(
      "Are you sure you want to confirm the changes?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/customers/${
            project.project.associated_customer
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer_name: customerName,
            }),
          }
        );
        if (response.ok) {
          console.log("Customer data updated succesfully.");
          setShouldReload(true);
          return true;
        } else {
          console.log("Customer data couldn't be updated.");
          return false;
        }
      } catch (error) {
        console.log("Couldn't update the customer data: ", error);
      }
    }
  }

  return (
    <div className="main-edit-customer-div">
      <div className="edit-customer-div">
        <div className="close-div">
          <button type="button" onClick={() => setIsEditCustomer(false)}>
            X
          </button>
        </div>
        <h3>{customerName}</h3>
        <input
          type="text"
          id="customernameinput"
          name="customernameinput"
          className="customer-name-input"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          maxLength={50}
        />
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
