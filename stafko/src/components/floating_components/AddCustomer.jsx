import React, { useState, useEffect } from "react";
import "./styles/AddCustomer.css";

export default function AddCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [sector, setSector] = useState("");
  const [cif, setCif] = useState("");
  const [shouldReload, setShouldReload] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  async function addCustomer(event) {
    event.preventDefault();

    if (
      !customerName.trim() ||
      !country.trim() ||
      !phoneNumber.trim() ||
      !customerEmail.trim() ||
      !sector.trim() ||
      !cif.trim()
    ) {
      setError("All fields with a * are required.");
      return;
    }


    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            customer_name: customerName,
            city: city,
            country: country,
            phone_number: phoneNumber,
            email: customerEmail,
            website: website,
            sector: sector,
            cif: cif,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Customer created successfully.");
        setShouldReload(true);
      } else {
        setError("Couldn't create customer.");
      }
    } catch (error) {
      console.error("Failed to create customer: ", error);
    }
  }

  function clearAll() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all fields?"
    );
    if (confirmed) {
      setCustomerName("");
      setCity("");
      setCountry("");
      setPhoneNumber(null);
      setCustomerEmail("");
      setWebsite("");
      setSector("");
      setCif("");

      setSuccessMessage("All fields cleared.");
      setTimeout(function () {
        setSuccessMessage("");
      }, 3000);
    }
  }

  useEffect(() => {
    if (shouldReload) {
      setTimeout(() => {
        setShouldReload(false);
        window.location.reload();
      }, 750);
    }
  }, [shouldReload]);

  return (
    <div className="main-add-customer-div">
      <form
        className="add-customer-form"
        onSubmit={addCustomer}
        encType="multipart/form-data"
      >
        <h2 className="form-title">Add Customer Form</h2>
        <fieldset className="main-info-fieldset">
          <legend>Main data</legend>
          <div className="row-div">
            <div className="customer-left-div">
              <img
                className="icon-img"
                src="src/assets/project_images/project-icon.png"
                alt="user-icon"
              />
              <label htmlFor="customername" className="required">
                Customer Name:
              </label>
              <br />
              <input
                type="text"
                id="customername"
                name="customername"
                className="customer-name-input"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                maxLength={50}
              />
              <br />
            </div>
            <div className="customer-right-div">
              <img
                className="icon-img"
                src="src/assets/project_images/files-icon.png"
                alt="user-icon"
              />
              <label htmlFor="cif" className="required">
                CIF:
              </label>
              <br />
              <input
                type="text"
                id="cif"
                name="cif"
                value={cif}
                onChange={(e) => setCif(e.target.value)}
                maxLength={9}
              />
              <br />
            </div>
          </div>
          <div className="row-div">
            <div className="customer-left-div">
              <img
                className="icon-img"
                src="src/assets/project_images/files-icon.png"
                alt="user-icon"
              />
              <label htmlFor="sector" className="required">
                Sector:
              </label>
              <br />
              <input
                type="text"
                id="sector"
                name="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                maxLength={50}
              />
              <br />
            </div>
            <div className="customer-right-div">
              <img
                className="icon-img"
                src="src/assets/project_images/files-icon.png"
                alt="user-icon"
              />
              <label htmlFor="country" className="required">
                Country:
              </label>
              <br />
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                maxLength={50}
              />
              <br />
            </div>
          </div>
        </fieldset>
        <fieldset className="other-info-fieldset">
          <legend>Contact data</legend>
          <div className="row-div">
            <div className="customer-left-div">
              <img
                className="icon-img"
                src="src/assets/project_images/description-icon.png"
                alt="user-icon"
              />
              <label htmlFor="city">City:</label>
              <br />
              <input
                id="city"
                name="city"
                className="city-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={50}
              />
              <br />
            </div>
            <div className="customer-right-div">
              <img
                className="icon-img"
                src="src/assets/project_images/files-icon.png"
                alt="user-icon"
              />
              <label htmlFor="phone-number" className="required">
                Phone number:
              </label>
              <br />
              <input
                type="number"
                id="phonenumber"
                name="phonenumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                max="999999999"
              />
              <br />
            </div>
          </div>
          <div className="row-div">
            <div className="customer-left-div">
              <img
                className="icon-img"
                src="src/assets/project_images/files-icon.png"
                alt="user-icon"
              />
              <label htmlFor="website">Website:</label>
              <br />
              <input
                type="url"
                id="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                maxLength={50}
              />
              <br />
            </div>
            <div className="customer-right-div">
              <img
                className="icon-img"
                src="src/assets/project_images/files-icon.png"
                alt="user-icon"
              />
              <label htmlFor="customer-email" className="required">
                Email:
              </label>
              <br />
              <input
                type="email"
                id="customeremail"
                name="customeremail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                maxLength={50}
              />
              <br />
            </div>
          </div>
        </fieldset>
        {error && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p
              className="error-message"
              style={{
                color: "red",
                fontFamily: "Anek Gurmukhi, sans-serif",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              {error}
            </p>
          </div>
        )}
        {successMessage && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p
              className="success-message"
              style={{
                color: "green",
                fontFamily: "Anek Gurmukhi, sans-serif",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              {successMessage}
            </p>
          </div>
        )}
        <div className="bottom-buttons">
          <input
            className="add-customer-input"
            type="submit"
            id="addCustomer"
            name="addCustomer"
            value="Add customer"
          />
          <button type="button" className="clear-all-button" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </form>
    </div>
  );
}
