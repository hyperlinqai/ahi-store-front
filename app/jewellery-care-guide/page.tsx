import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jewellery Care Guide | AHI Jewellery",
    description: "Learn how to care for your handcrafted AHI Jewellery pieces and preserve their shine, finish, and longevity.",
};

const careSections = [
    {
        title: "1. Avoid Contact With Chemicals",
        body: "To preserve the gold plating and finish of your jewellery, keep each piece away from water, perfumes, lotions, cosmetics, hairsprays, alcohol-based products, and other harsh chemicals. Always apply perfume and makeup before wearing your jewellery, as chemicals can gradually affect the plating and reduce its shine.",
    },
    {
        title: "2. Put Jewellery On Last",
        body: "When getting dressed, wear your jewellery only after applying makeup, perfume, and hair products. This helps protect delicate plating from exposure to substances that may damage the finish.",
    },
    {
        title: "3. Avoid Moisture And Sweat",
        body: "To maintain the finish and shine, avoid wearing jewellery while bathing, swimming, or exercising. Remove it before washing hands or using cleaning products. Excess moisture and sweat may cause the plating to fade faster over time.",
    },
    {
        title: "4. Proper Storage",
        body: "Store your jewellery in a cool, dry place away from humidity. Keep each piece in its original box or a soft pouch, and avoid storing multiple pieces together so they do not scratch, rub, or tangle with one another.",
    },
    {
        title: "5. Handle With Care",
        body: "Each AHI Jewellery piece is delicately handcrafted, so gentle handling is essential. Avoid dropping jewellery, applying pressure, bending delicate structures or chains, and remove your pieces before sleeping or doing any heavy activity.",
    },
    {
        title: "6. Cleaning Your Jewellery",
        body: "Gently wipe your jewellery after every use with a soft, dry microfiber cloth. If needed, use a slightly damp cloth and dry the piece immediately. Do not rub aggressively, and avoid jewellery cleaning liquids, harsh chemicals, abrasive cloths, or brushes, as these can damage the gold plating.",
    },
    {
        title: "7. Long Term Care",
        body: "With proper care, your AHI Jewellery will retain its beauty for a long time. Since gold-plated jewellery is delicate, slight fading over time is natural depending on usage. Thoughtful storage, careful handling, and regular gentle cleaning will significantly extend the life of each piece.",
    },
];

export default function JewelleryCareGuidePage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-[#fcfaf6] via-white to-[#f6f1e8] p-8 shadow-sm sm:p-10">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-500">
                        AHI Jewellery
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Jewellery Care Guide
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                        Each piece of AHI Jewellery is carefully handcrafted using brass with
                        high-quality gold plating. To maintain the beauty, shine, and longevity
                        of your jewellery, please follow the care instructions below.
                    </p>
                </div>

                <div className="mt-10 space-y-6">
                    {careSections.map((section) => (
                        <section
                            key={section.title}
                            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                        >
                            <h2 className="text-xl font-semibold text-gray-900">
                                {section.title}
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                                {section.body}
                            </p>
                        </section>
                    ))}
                </div>

                <div className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/70 p-6 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">
                        Note
                    </p>
                    <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
                        AHI Jewellery pieces are handcrafted, so slight variations in finish and
                        texture are part of the uniqueness of each design.
                    </p>
                </div>
            </div>
        </div>
    );
}
