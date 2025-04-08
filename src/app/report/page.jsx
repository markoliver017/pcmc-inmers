"use client";
import { useState } from "react";

const ReportForm = () => {
    const [formData, setFormData] = useState({
        date_reported: "",
        date_error_occurred: "",
        patient_sex: "male",
        patient_weight: "",
        patient_height: "",
        medication_order: "",
        error_type: "",
        error_description: "",
        corrective_action: "",
        preventive_action: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Report submitted successfully!");
            } else {
                alert("Error submitting report.");
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Error submitting report.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date Reported</label>
                <input
                    type="date"
                    name="date_reported"
                    value={formData.date_reported}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Date Error Occurred</label>
                <input
                    type="date"
                    name="date_error_occurred"
                    value={formData.date_error_occurred}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Sex of the Patient</label>
                <select
                    name="patient_sex"
                    value={formData.patient_sex}
                    onChange={handleChange}
                    required
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label>Weight (kg)</label>
                <input
                    type="number"
                    name="patient_weight"
                    value={formData.patient_weight}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Height (cm)</label>
                <input
                    type="number"
                    name="patient_height"
                    value={formData.patient_height}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Exact Medication Order</label>
                <textarea
                    name="medication_order"
                    value={formData.medication_order}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Error Type</label>
                <select
                    name="error_type"
                    value={formData.error_type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Error Type</option>
                    <option value="incorrect_prescription">
                        Incorrect Prescription
                    </option>
                    <option value="incorrect_transcription">
                        Incorrect Transcription
                    </option>
                    <option value="incorrect_dispensing">
                        Incorrect Dispensing
                    </option>
                    {/* Add more options */}
                </select>
            </div>
            <div>
                <label>Error Description</label>
                <textarea
                    name="error_description"
                    value={formData.error_description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Corrective Action</label>
                <textarea
                    name="corrective_action"
                    value={formData.corrective_action}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Preventive Action</label>
                <textarea
                    name="preventive_action"
                    value={formData.preventive_action}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit Report</button>
        </form>
    );
};

export default ReportForm;
