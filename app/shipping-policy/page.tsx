import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping Policy | AHI Jewellery",
    description: "Read the AHI Jewellery shipping policy for India and international orders, processing times, dispatch, and delivery details.",
};

const sections = [
    {
        title: "1. Worldwide Shipping",
        body: "AHI Jewellery offers shipping services across India and internationally. We work with reliable courier partners such as DHL, FedEx, Delhivery, DTDC, BlueDart, and other reputed logistics providers to ensure safe and timely delivery of your orders. We strive to deliver your jewellery in the best possible condition and within the estimated time frame.",
        points: [
            "Free international shipping is available on orders above ₹21,000.",
            "International orders may be subject to import duties, customs charges, or local taxes depending on the destination country.",
            "These charges are determined by your local customs authority and must be paid by the customer upon delivery.",
            "AHI Jewellery is not responsible for these additional charges.",
        ],
    },
    {
        title: "2. Shipping Within India",
        points: [
            "We offer free shipping across India on all prepaid orders.",
            "For Cash on Delivery (COD) orders, a flat shipping charge of ₹150 applies.",
            "COD orders are available only for orders below ₹10,000.",
            "Orders above this limit must be prepaid.",
        ],
    },
    {
        title: "3. Order Processing & Dispatch",
        body: "All AHI Jewellery pieces are handcrafted and made with care. Once your order is placed, you will receive an order confirmation email. Our standard processing and manufacturing time is 7–20 working days depending on design complexity and order demand.",
        points: [
            "Once dispatched, delivery generally takes 2–5 business days within India.",
            "International delivery generally takes 10–15 business days.",
            "Customization requests may require additional production time.",
            "Customized orders cannot be cancelled, returned, or exchanged.",
        ],
    },
    {
        title: "4. Delivery Schedule",
        body: "Our courier partners deliver shipments Monday to Saturday between 10 AM – 6 PM, excluding public holidays. Customers must provide accurate shipping details including full address, phone number, and email address to ensure smooth delivery.",
        points: [
            "Address modification requests can only be accepted before the order has been dispatched.",
        ],
    },
    {
        title: "5. Tracking Information",
        body: "Once your order is shipped, you will receive an email containing your tracking details. You can track the shipment through the courier partner’s website. While we assist in tracking your shipment, AHI Jewellery is not responsible for delays caused by courier companies, customs clearance, natural disasters, or other unforeseen circumstances.",
    },
    {
        title: "6. International Shipping",
        points: [
            "Cash on Delivery (COD) is not available for international orders.",
            "International shipping charges are ₹2,500 for orders below ₹21,000.",
            "All international shipments are dispatched through DHL or FedEx.",
            "VAT, customs duties, and local taxes are not included in the product price and must be paid by the customer as per the destination country’s regulations.",
        ],
    },
    {
        title: "7. Important Shipping Information",
        points: [
            "Orders cannot be redirected once they have been shipped.",
            "Each order can be delivered to one shipping address only.",
            "Multiple addresses require separate orders.",
            "Deliveries to remote locations, North Eastern states, or Jammu & Kashmir may take additional time.",
            "All shipments may require signature confirmation and valid ID proof at the time of delivery.",
            "If the package appears damaged or tampered with, please refuse delivery and immediately contact our support team.",
        ],
    },
    {
        title: "8. Contact Us",
        body: "For any shipping-related queries or assistance regarding your order, please contact us.",
        points: [
            "Operating Hours: Monday – Saturday | 11 AM – 7 PM (IST)",
            "Email: contact@ahijewellery.com",
            "Phone: +91-8305198372",
        ],
    },
];

export default function ShippingPolicyPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-[#fcfaf6] via-white to-[#f6f1e8] p-8 shadow-sm sm:p-10">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-500">
                        AHI Jewellery
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Shipping Policy
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                        This page covers our shipping practices for domestic and international
                        orders, including dispatch timelines, delivery expectations, and important
                        shipping conditions.
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
