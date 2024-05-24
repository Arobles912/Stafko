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
  const [formValues, setFormValues] = useState({});
  const [shouldReload, setShouldReload] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

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
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
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
          setFormValues({
            customer_name: data.customer_name,
            city: data.city,
            country: data.country,
            phone_number: data.phone_number,
            email: data.email,
            website: data.website,
            sector: data.sector,
            cif: data.cif,
          });
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
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formValues),
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="main-edit-customer-div">
      <div className="edit-customer-div">
        <div className="close-div">
          <button type="button" onClick={() => setIsEditCustomer(false)}>
            X
          </button>
        </div>
        <h3>{customerName}</h3>
        <div className="left-row-div">
          <h5>Customer name</h5>
          <input
            type="text"
            id="customernameinput"
            name="customer_name"
            className="customer-name-input"
            value={formValues.customer_name || ""}
            onChange={handleInputChange}
            maxLength={50}
          />
          <br />
          <h5>CIF</h5>
          <input
            type="text"
            id="customercifinput"
            name="cif"
            className="customer-cif-input"
            value={formValues.cif || ""}
            readOnly
            maxLength={9}
          />
          <br />
          <h5>Country</h5>
          <input
            type="text"
            id="customercountryinput"
            name="country"
            className="customer-country-input"
            value={formValues.country || ""}
            onChange={handleInputChange}
            maxLength={50}
          />
          <br />
          <h5>Sector</h5>
          <input
            type="text"
            id="customersectorinput"
            name="sector"
            className="customer-sector-input"
            value={formValues.sector || ""}
            onChange={handleInputChange}
            maxLength={50}
          />
          <br />
        </div>
        <div className="right-row-div">
          <h5>City</h5>
          <input
            type="text"
            id="customercityinput"
            name="city"
            className="customer-city-input"
            value={formValues.city || ""}
            onChange={handleInputChange}
            maxLength={50}
          />
          <br />
          <h5>Phone number</h5>
          <input
            type="number"
            id="customernumberinput"
            name="phone_number"
            className="customer-number-input"
            value={formValues.phone_number || ""}
            onChange={handleInputChange}
          />
          <br />
          <h5>Website</h5>
          <input
            type="url"
            id="customerwebsiteinput"
            name="website"
            className="customer-website-input"
            value={formValues.website || ""}
            onChange={handleInputChange}
            maxLength={255}
          />
          <br />
          <h5>Email</h5>
          <input
            type="email"
            id="customeremailinput"
            name="email"
            className="customer-email-input"
            value={formValues.email || ""}
            onChange={handleInputChange}
            maxLength={50}
          />
          <br />
        </div>
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
