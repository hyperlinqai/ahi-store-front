import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
    title: "Forgot Password | Ahi Jewellery",
    description: "Reset your Ahi Jewellery account password.",
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}
