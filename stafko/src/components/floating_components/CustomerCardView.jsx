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
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/customers/${
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
          setCustomerName(data.data.customer_name);
          setCity(data.data.city);
          setCountry(data.data.country);
          setPhoneNumber(data.data.phone_number);
          setCustomerEmail(data.data.email);
          setWebsite(data.data.website);
          setSector(data.data.sector);
          setCif(data.data.cif);
          setFormValues({
            customer_name: data.data.customer_name,
            city: data.data.city,
            country: data.data.country,
            phone_number: data.data.phone_number,
            email: data.data.email,
            website: data.data.website,
            sector: data.data.sector,
            cif: data.data.cif,
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
            maxLength={50}
            readOnly
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
            maxLength={50}
            readOnly
          />
          <br />
          <h5>Sector</h5>
          <input
            type="text"
            id="customersectorinput"
            name="sector"
            className="customer-sector-input"
            value={formValues.sector || ""}
            maxLength={50}
            readOnly
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
            maxLength={50}
            readOnly
          />
          <br />
          <h5>Phone number</h5>
          <input
            type="number"
            id="customernumberinput"
            name="phone_number"
            className="customer-number-input"
            value={formValues.phone_number || ""}
            readOnly
          />
          <br />
          <h5>Website</h5>
          <input
            type="url"
            id="customerwebsiteinput"
            name="website"
            className="customer-website-input"
            value={formValues.website || ""}
            maxLength={255}
            readOnly
          />
          <br />
          <h5>Email</h5>
          <input
            type="email"
            id="customeremailinput"
            name="email"
            className="customer-email-input"
            value={formValues.email || ""}
            maxLength={50}
            readOnly
          />
          <br />
        </div>
      </div>
    </div>
  );
}
