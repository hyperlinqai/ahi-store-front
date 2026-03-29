import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | AHI Jewellery",
    description: "Read the AHI Jewellery Terms & Conditions covering eligibility, pricing, payments, orders, delivery, promotions, and website use.",
};

const sections = [
    {
        title: "1. Introduction",
        body: "This website is owned and operated by Ahi Jewellery. By accessing and using our website, you agree to comply with and be bound by these Terms & Conditions. These terms apply to all users of the website including browsers, customers, vendors, and contributors of content. Ahi Jewellery reserves the right to update, change, or replace any part of these Terms & Conditions at any time without prior notice. It is the responsibility of the user to review these terms periodically.",
        points: [
            "All content on this website including designs, images, graphics, logos, and text is the intellectual property of Ahi Jewellery and may not be reproduced or used without written permission.",
            "For queries regarding these terms, contact: contact@ahijewellery.com",
        ],
    },
    {
        title: "2. Eligibility",
        points: [
            "You are at least 18 years of age, or you are using the website under the supervision of a parent or legal guardian.",
            "Persons considered incompetent to contract under the Indian Contract Act, 1872 are not eligible to use this website.",
            "Users accessing this website from outside India are responsible for complying with their local laws and regulations.",
        ],
    },
    {
        title: "3. Pricing Policy",
        points: [
            "Prices displayed on the website are inclusive of GST unless stated otherwise.",
            "Prices are subject to change without prior notice due to fluctuations in raw material costs or market conditions.",
            "Product prices on the website may differ from prices on other platforms or retail channels.",
            "All products are subject to availability, and we reserve the right to limit quantities or cancel orders if required.",
        ],
    },
    {
        title: "4. Payments",
        points: [
            "We accept UPI, debit cards, credit cards, net banking, and secure online payment gateways.",
            "All online payments are processed through authorised payment gateways that comply with RBI security standards.",
            "Cash on Delivery (COD) may be available in selected locations.",
            "For orders above ₹10,000, COD is not applicable.",
        ],
    },
    {
        title: "5. Credit Card Details",
        body: "You agree to provide accurate and valid payment details when making purchases on our website. You must use a lawfully owned payment card. Ahi Jewellery will not be responsible for any payment fraud, and liability for fraudulent card use will rest with the user.",
    },
    {
        title: "6. Product Information & Handmade Variations",
        body: "All products offered by Ahi Jewellery are handcrafted by skilled artisans.",
        points: [
            "Slight variations in finish, design, or colour may occur.",
            "Product colours displayed on screens may vary depending on monitor settings.",
            "Packaging of the product may vary from images displayed on the website.",
            "These variations are natural and should not be considered defects.",
        ],
    },
    {
        title: "7. Order Acceptance",
        body: "All product listings on the website are considered an invitation to offer. Your order constitutes an offer to purchase, and acceptance takes place once the product is dispatched.",
        points: [
            "Ahi Jewellery reserves the right to accept or reject any order.",
            "Orders may be cancelled due to pricing errors, stock limitations, or suspected fraudulent transactions.",
            "We may request additional verification before processing an order.",
            "If an order is cancelled from our side after payment, the amount will be refunded to the original payment method.",
        ],
    },
    {
        title: "8. Delivery",
        body: "Estimated delivery timelines will be communicated once the order is confirmed. Delivery times may vary depending on location, courier services, product availability, and customisation requirements.",
        points: [
            "Customers can track orders using the tracking details shared after dispatch.",
            "Ahi Jewellery is not responsible for delays caused by courier companies, natural calamities, or circumstances beyond our control.",
        ],
    },
    {
        title: "9. Customer Obligations",
        points: [
            "Provide accurate personal and shipping information.",
            "Ensure the delivery address is correct.",
            "Update account information when necessary.",
            "If an order cannot be delivered due to incorrect information provided by the customer, additional shipping costs may apply.",
        ],
    },
    {
        title: "10. Restrictions",
        body: "Ahi Jewellery reserves the right to limit or cancel orders that appear to be placed by dealers, resellers, or distributors. Orders placed using the same account, payment method, or delivery address may also be restricted at our discretion. For bulk or wholesale inquiries, customers may contact our support team.",
    },
    {
        title: "11. Website Security",
        points: [
            "Attempting unauthorized access to systems or data",
            "Introducing viruses or malicious code",
            "Sending spam or unsolicited promotional messages",
            "Interfering with the operation of the website",
            "Any such activity may result in civil or criminal liability.",
        ],
    },
    {
        title: "12. Intellectual Property",
        body: "All intellectual property rights including product designs, logos, text, images, and graphics are owned by Ahi Jewellery and protected by copyright laws. Users may not reproduce, distribute, modify, or exploit any website content without prior written consent.",
    },
    {
        title: "13. External Links",
        body: "This website may contain links to third-party websites. Ahi Jewellery does not control these external websites and is not responsible for their content, privacy policies, or practices.",
    },
    {
        title: "14. Limitation of Liability",
        body: "Ahi Jewellery shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or purchase of our products, except where required by law.",
    },
    {
        title: "15. Sale & Promotions",
        points: [
            "Sales are valid until stock lasts.",
            "Only one coupon code can be applied per order.",
            "Discount offers may not apply to newly launched products or sale items.",
            "Sale items are generally not eligible for exchange or return.",
            "Ahi Jewellery reserves the right to modify or discontinue promotional offers at any time.",
        ],
    },
    {
        title: "16. Termination",
        body: "We reserve the right to terminate or suspend access to our website or services if a user violates these Terms & Conditions. Termination may occur without prior notice.",
    },
    {
        title: "17. Governing Law",
        body: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the jurisdiction of courts located in Indore, India.",
    },
    {
        title: "18. Contact Information",
        points: [
            "Ahi Jewellery",
            "Email: contact@ahijewellery.com",
            "Phone: +91-8305198372",
            "Customer Support Hours: Monday – Saturday (11 AM – 7 PM IST)",
        ],
    },
];

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-[#fcfaf6] via-white to-[#f6f1e8] p-8 shadow-sm sm:p-10">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-500">
                        AHI Jewellery
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Terms & Conditions
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                        These terms govern the use of our website, purchases made through it,
                        and the responsibilities of both Ahi Jewellery and our customers.
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
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
