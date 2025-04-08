"use client"

import { useState } from "react"
import { supabase } from "./supaBaseClient"
import { useNavigate } from "react-router-dom"
import "./MultiStepRegistration.css"

export default function MultiStepRegistration() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailaddress: "",
    password: "",
    address: "",
    city: "",
    age: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      
      const { data, error } = await supabase.from("users").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
          email: formData.emailaddress,
          password: formData.password,  
          address: formData.address,
          city: formData.city,
          age: formData.age,
        },
      ])

      if (error) throw error

      alert("Registration completed successfully!")
      navigate("/Login") 
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const totalSteps = 3

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>Create Your Account</h1>
          <p>Complete the steps below to set up your profile</p>

          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
            </div>

            <div className="step-indicators">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className={`step-indicator ${index + 1 <= step ? "active" : ""}`}>
                  <div className="step-number">{index + 1}</div>
                  <div className="step-label">{index === 0 ? "Personal" : index === 1 ? "Contact" : "Other"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="registration-content">
          <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
            {step === 1 && (
              <div className="form-step">
                <h2>Personal Details</h2>
                <p>Please provide your personal information</p>

                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Enter your first name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Enter your last name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="text"
                    name="age"
                    value={formData.age}
                    placeholder="Enter your age"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="button-group">
                  <button type="button" className="button primary" onClick={handleNext}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h2>Contact Details</h2>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailaddress">Email Address</label>
                  <input
                    id="emailaddress"
                    type="email"
                    name="emailaddress"
                    value={formData.emailaddress}
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="button-group">
                  <button type="button" className="button secondary" onClick={handleBack}>
                    Back
                  </button>
                  <button type="button" className="button primary" onClick={handleNext}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h2>Additional Information</h2>
                <p>Just a few more details to complete your profile</p>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Enter your address"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="City">City</label>
                  <input
                    id="City"
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="Enter your city"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="button-group">
                  <button type="button" className="button secondary" onClick={handleBack}>
                    Back
                  </button>
                  <button
                    type="submit"
                    className="button primary"
                    disabled={loading || !formData.address || !formData.age}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
