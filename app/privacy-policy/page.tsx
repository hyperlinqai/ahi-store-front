import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | AHI Jewellery",
    description: "Read the AHI Jewellery privacy policy to understand how we collect, use, and protect your personal information.",
};

const sections = [
    {
        title: "1. Ownership Of Content And Intellectual Property",
        body: "All content on this website including text, designs, graphics, images, logos, product designs, and other materials are the intellectual property of AHI Jewellery unless otherwise stated. You may not reproduce, copy, distribute, publish, or use any content from this website without prior written permission from AHI Jewellery. While we make every effort to display product images accurately, colours may appear slightly different depending on your device or screen settings.",
    },
    {
        title: "2. Information We Collect",
        body: "When you visit our website, we may collect certain information automatically as well as information that you provide to us directly.",
        points: [
            "Device Information: IP address, browser type, time zone, device information, pages viewed, products viewed, search terms, and website interaction behaviour. This helps us improve the performance and functionality of our website.",
            "Order Information: full name, billing address, shipping address, email address, phone number, payment information, and order details. This information is required to process your order, confirm your purchase, and arrange delivery.",
            "Customer Support Information: if you contact our support team, we may collect additional information to assist you with your request or inquiry.",
        ],
    },
    {
        title: "3. How We Use Your Information",
        points: [
            "To process and fulfil your orders",
            "To communicate with you regarding your order",
            "To provide customer support",
            "To improve our website and user experience",
            "To detect and prevent fraud",
            "To send updates about new products, offers, or promotions if you opt in",
        ],
    },
    {
        title: "4. Sharing Of Personal Information",
        body: "We only share your personal information when necessary to provide our services. Your information may be shared with trusted third-party service providers such as payment gateways, courier and logistics partners, Shopify, and analytics and marketing service providers. These partners only use your information to perform their services and are required to protect your data. We may also disclose personal information if required to comply with legal obligations, court orders, or government regulations.",
    },
    {
        title: "5. Cookies And Website Tracking",
        body: "Our website uses cookies and similar tracking technologies to improve your browsing experience.",
        points: [
            "Remember your preferences",
            "Analyse website traffic",
            "Understand customer behaviour",
            "Improve website performance",
        ],
        footer: "You can choose to disable cookies through your browser settings, but doing so may affect the functionality of certain parts of the website.",
    },
    {
        title: "6. Analytics And Advertising",
        body: "We may use analytics and advertising tools such as Google Analytics, social media advertising platforms, and marketing pixels and tracking technologies. These tools help us understand how customers interact with our website and allow us to show relevant advertisements. You may opt out of targeted advertising through your browser settings or through platforms such as Google Ads Settings, Facebook Ad Preferences, and the Digital Advertising Alliance Opt-Out Portal.",
    },
    {
        title: "7. Data Security",
        body: "We take reasonable precautions to protect your personal information from unauthorized access, misuse, or disclosure. All payments made through our website are processed through secure and encrypted payment gateways. However, no online system can guarantee 100% security.",
    },
    {
        title: "8. Minors",
        body: "Our website is not intended for individuals under the age of 18 years. We do not knowingly collect personal information from minors. If you believe a minor has provided personal information, please contact us so we can delete the data.",
    },
    {
        title: "9. Data Retention",
        body: "We retain your personal information for as long as necessary to fulfil your orders, provide customer service, and maintain business and legal records. You may request deletion of your personal information at any time by contacting us.",
    },
    {
        title: "10. Changes To This Privacy Policy",
        body: "AHI Jewellery reserves the right to update or modify this Privacy Policy at any time to reflect changes in our practices, legal requirements, or operational needs. Any updates will be posted on this page.",
    },
    {
        title: "11. Contact Information",
        body: "If you have any questions regarding this Privacy Policy or your personal data, please contact us.",
        points: [
            "AHI Jewellery",
            "Email: contact@ahijewellery.com",
            "Phone: +91-8305198372",
            "Business Hours: Monday – Saturday | 11 AM – 7 PM (IST)",
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-[#fcfaf6] via-white to-[#f6f1e8] p-8 shadow-sm sm:p-10">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-500">
                        AHI Jewellery
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                        AHI Jewellery respects your privacy and is committed to protecting your
                        personal information. This page explains how we collect, use, and protect
                        your information when you visit or make a purchase from our website.
                    </p>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-500 sm:text-base">
                        By using our website, you agree to the terms outlined in this Privacy Policy.
                    </p>
                </div>

                <div className="mt-10 space-y-6">
                    {sections.map((section) => (
                        <section
                            key={section.title}
                            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                        >
                            <h2 className="text-xl font-semibold text-gray-900">
                                {section.title}
                            </h2>
                            {section.body && (
                                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                                    {section.body}
                                </p>
                            )}
                            {section.points && (
                                <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600 sm:text-base">
                                    {section.points.map((point) => (
                                        <li key={point} className="flex gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-400" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.footer && (
                                <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                                    {section.footer}
                                </p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
