import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Returns, Exchange & Repair Policy | AHI Jewellery",
    description: "Read the AHI Jewellery return, exchange, credit note, lost shipment, and repair policy.",
};

const sections = [
    {
        title: "No Return & No Refund Policy",
        body: "We do not accept return or refund requests once an order is placed. We only offer exchange or credit notes under the specific circumstances mentioned below.",
    },
    {
        title: "Exchange Policy",
        body: "Ahi Jewellery accepts exchanges only if the delivered product is different from the original order, arrived damaged or defective, has missing parts, has significant quality issues, or involves another genuine concern subject to approval. Customers must initiate an exchange request within 4 days of delivery. Requests made after 4 days will not be entertained.",
    },
    {
        title: "Important Exchange Terms",
        points: [
            "Customised orders and sale items are not eligible for exchange.",
            "International orders are not eligible for exchange.",
            "A product can be exchanged only once per order.",
            "The product must be unused, untampered, and in original packaging.",
            "Used products will not qualify for exchange and will be returned to the customer.",
            "Exchange orders are processed at original product prices (MRP) and no discounts apply.",
            "Promotional offers cannot be applied on exchange orders or credit notes.",
            "The exchange process may take 15–20 working days including pickup, quality check, and re-shipping.",
            "Ahi Jewellery reserves the right to accept or reject any exchange request at its sole discretion.",
            "No exchanges will be accepted for products purchased via third-party websites or physical stores.",
        ],
    },
    {
        title: "Exchange Charges (Domestic – India)",
        points: [
            "A ₹500 pickup and re-shipping fee applies for exchange requests related to size issues, weight concerns, or general quality concerns.",
            "No exchange fee is charged if the issue is a damaged or defective product, wrong item delivered, or missing parts.",
        ],
    },
    {
        title: "Credit Note Policy",
        points: [
            "Only the product value will be credited.",
            "Shipping charges are non-refundable.",
            "Credit notes are redeemable only on the Ahi Jewellery website.",
            "A pickup fee of ₹250 applies under “Claim Credit – Shop Later”.",
            "Credit notes cannot be combined with promotional offers.",
        ],
    },
    {
        title: "Lost Shipments",
        body: "In case of a lost shipment, a replacement or credit note will be offered after verification with the courier partner. Resolution may take up to 7 business days. If the order is marked as delivered but not received, customers must report it within 24 hours of the delivery notification by email.",
    },
    {
        title: "Repair Policy – India",
        body: "All Ahi Jewellery pieces come with a 1-month warranty from the delivery date. Repairs within 1 month are free of cost, though a ₹500 pickup and re-shipping fee applies.",
        points: [
            "After 1 month and up to 6 months, a ₹500 pickup and re-shipping fee applies.",
            "Repair charges as per actuals will be communicated after evaluation.",
            "Repair requests can only be raised within 6 months of delivery.",
            "Repairs are subject to design feasibility.",
            "Our team will confirm whether the damage is repairable after reviewing product images or videos.",
        ],
    },
    {
        title: "Steps To Follow",
        points: [
            "For exchange: raise the request within 4 days of delivery, share the order number and product images, pack the product in original packaging once approved, allow reverse pickup, and wait for replacement after quality inspection.",
            "For repair: email us within the eligible timeline, share the order number and clear images or videos of the damage, wait for our team to confirm feasibility and charges, send the product in secure packaging, and we will dispatch it after quality check.",
        ],
    },
    {
        title: "Not Eligible For Exchange Or Credit Note",
        points: [
            "Pre-orders and customised products",
            "Sale or promotional items",
            "Used products",
            "Minor colour or design variations due to screen display or handcrafted nature",
            "International orders",
        ],
    },
    {
        title: "Customs, Taxes & Delays",
        body: "Prices exclude shipping charges and customs duties. International duties and taxes are the customer’s responsibility. We are not responsible for delays caused by natural calamities or unavoidable circumstances.",
    },
    {
        title: "Shipping Address",
        points: [
            "Ahi Jewellery",
            "146 C Basant Vihar, Indore - 452010",
        ],
    },
    {
        title: "Need Help?",
        points: [
            "Customer Support",
            "Phone: +91-8305198372 (11 AM – 7 PM IST)",
            "Email: contact@ahijewellery.com",
        ],
    },
];

export default function ReturnsExchangeRepairPolicyPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-[#fcfaf6] via-white to-[#f6f1e8] p-8 shadow-sm sm:p-10">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-500">
                        AHI Jewellery
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Return, Exchange & Repair Policy
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                        Every piece at Ahi Jewellery is handcrafted by skilled Indian artisans.
                        Slight irregularities are part of the handmade character of the product
                        and are not considered defects.
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
