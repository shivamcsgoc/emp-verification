import React, { useState } from "react";

function EmploymentVerificationForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://localhost:7284/api/EmploymentVerification/verify-employment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: parseInt(employeeId),
            companyName: companyName,
            verificationCode: verificationCode,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setVerificationResult(result.verified ? "Verified" : "Not Verified");
    } catch (error) {
      console.error("Error:", error);
      setVerificationResult("Error verifying employment");
    }
  };

  return (
    <div>
      <h2>Employment Verification Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID: </label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company Name: </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Verification Code: </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify Employment</button>
      </form>
      {verificationResult && <p>Result: {verificationResult}</p>}
    </div>
  );
}

export default EmploymentVerificationForm;
