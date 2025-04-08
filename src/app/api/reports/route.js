import { Admin, Report } from "@lib/models"; // Import models
import { NextResponse } from "next/server"; // Next.js response utility

// POST handler for report submission
export async function POST(request) {
    try {
        const body = await request.json();

        // Create new report in the database
        const newReport = await Report.create({
            report_date: body.report_date,
            error_date: body.error_date,
            patient_sex: body.patient_sex,
            patient_weight: body.patient_weight,
            patient_height: body.patient_height,
            exact_prescription: body.exact_prescription,
            error_type: body.error_type,
            other_error_type: body.other_error_type || null,
            incident_description: body.incident_description,
            workplace_environment: body.workplace_environment,
            patient_condition: body.patient_condition,
            immediate_actions: body.immediate_actions,
            corrective_actions: body.corrective_actions,
            preventive_actions: body.preventive_actions,
            is_verified: body.is_verified,
        });

        return NextResponse.json(
            { success: true, report: newReport },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error handling report submission:", error);

        // Handle Sequelize validation errors
        if (
            error.name === "SequelizeValidationError" ||
            error.name === "SequelizeUniqueConstraintError"
        ) {
            const validationErrors = error.errors.reduce((acc, err) => {
                if (error.name === "SequelizeUniqueConstraintError") {
                    acc[err.path] = `${err.path} already exists!`;
                } else {
                    acc[err.path] = err.message;
                }
                return acc;
            }, {});

            return NextResponse.json(
                { error: "Validation failed", details: validationErrors },
                { status: 400 }
            );
        }

        // Generic error handling
        return NextResponse.json(
            { error: "Failed to submit report." },
            { status: 500 }
        );
    }
}
