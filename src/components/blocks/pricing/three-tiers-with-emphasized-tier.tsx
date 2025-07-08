import { Check } from "lucide-react";

const tiers = [
  {
    id: "basic",
    name: "Basic",
    price: { monthly: "$9.99", annually: "$99.99" },
    description: "Essential brain wellness features to get started.",
    features: [
      "5 brain sync sessions",
      "Basic audio controls",
      "Mobile app access",
      "Email support",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    id: "premium",
    name: "Premium",
    price: { monthly: "$19.99", annually: "$199.99" },
    description: "Advanced features for serious brain wellness practitioners.",
    features: [
      "Unlimited sessions",
      "Advanced settings sliders",
      "Multi-selection & save",
      "Priority support",
      "Progress tracking",
    ],
    featured: true,
    cta: "Start Premium",
  },
  {
    id: "professional",
    name: "Professional",
    price: { monthly: "$39.99", annually: "$399.99" },
    description: "Complete solution for professionals and organizations.",
    features: [
      "Everything in Premium",
      "Admin dashboard",
      "Custom session creation",
      "API access",
      "Dedicated support",
    ],
    featured: false,
    cta: "Go Professional",
  },
];

export default function ThreeTiersWithEmphasizedTier() {
  return (
    <form className="group/tiers bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-[#2D5016]">
            Brain Wellness Plans
          </h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-[#2D5016] sm:text-6xl font-[var(--font-inter)]">
            Choose Your Brain Wellness Plan
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-[#6b7280] sm:text-xl/8 font-[var(--font-inter)]">
          Select the perfect plan to enhance your cognitive wellness journey
          with Zenphare's advanced brain sync technology.
        </p>
        <div className="mt-16 flex justify-center">
          <fieldset aria-label="Payment frequency">
            <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold ring-1 ring-gray-200 ring-inset font-[var(--font-inter)]">
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-[#8D7053]">
                <input
                  defaultValue="monthly"
                  defaultChecked
                  name="frequency"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                />
                <span className="text-gray-500 group-has-checked:text-white">
                  Monthly
                </span>
              </label>
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-[#8D7053]">
                <input
                  defaultValue="annually"
                  name="frequency"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                />
                <span className="text-gray-500 group-has-checked:text-white">
                  Annually
                </span>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              data-featured={tier.featured ? "true" : undefined}
              className="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-featured:bg-[#8D7053] data-featured:ring-[#8D7053] xl:p-10"
            >
              <h3
                id={`tier-${tier.id}`}
                className="text-lg/8 font-semibold text-[#2D5016] group-data-featured/tier:text-white font-[var(--font-inter)]"
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm/6 text-[#6b7280] group-data-featured/tier:text-white/80 font-[var(--font-inter)]">
                {tier.description}
              </p>
              {typeof tier.price === "string" ? (
                <p className="mt-6 text-4xl font-semibold tracking-tight text-[#1f1f1f] group-data-featured/tier:text-white font-[var(--font-inter)]">
                  {tier.price}
                </p>
              ) : (
                <>
                  <p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=monthly]:checked]/tiers:hidden">
                    <span className="text-4xl font-semibold tracking-tight text-[#1f1f1f] group-data-featured/tier:text-white font-[var(--font-inter)]">
                      {tier.price.monthly}
                    </span>
                    <span className="text-sm/6 font-semibold text-[#6b7280] group-data-featured/tier:text-white/80 font-[var(--font-inter)]">
                      /month
                    </span>
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=annually]:checked]/tiers:hidden">
                    <span className="text-4xl font-semibold tracking-tight text-[#1f1f1f] group-data-featured/tier:text-white font-[var(--font-inter)]">
                      {tier.price.annually}
                    </span>
                    <span className="text-sm/6 font-semibold text-[#6b7280] group-data-featured/tier:text-white/80 font-[var(--font-inter)]">
                      /year
                    </span>
                  </p>
                </>
              )}

              <button
                value={tier.id}
                name="tier"
                type="submit"
                aria-describedby={`tier-${tier.id}`}
                className="mt-6 block w-full rounded-md bg-[#8D7053] px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-xs group-data-featured/tier:bg-white/10 group-data-featured/tier:text-white hover:bg-[#7A6249] group-data-featured/tier:hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8D7053] group-data-featured/tier:focus-visible:outline-white font-[var(--font-inter)]"
              >
                {tier.cta}
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-[#6b7280] group-data-featured/tier:text-white/80 xl:mt-10 font-[var(--font-inter)]"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-[#8D7053] group-data-featured/tier:text-white"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
