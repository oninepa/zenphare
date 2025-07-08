import { Brain, Play, Sliders } from "lucide-react";

const features = [
  {
    name: "Brain Synchronization",
    description:
      "Advanced audio technology to synchronize brainwaves for optimal mental health and focus enhancement.",
    href: "#",
    icon: Brain,
  },
  {
    name: "Smart Controls",
    description:
      "Intuitive play/pause/stop controls with multi-selection capabilities and dropdown sublists for session management.",
    href: "#",
    icon: Play,
  },
  {
    name: "Personalized Settings",
    description:
      "Advanced audio controls and custom settings with user and admin functionality for tailored experiences.",
    href: "#",
    icon: Sliders,
  },
];

export default function SimpleThreeColumnWithLargeIcons() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-secondary sm:text-5xl">
            Powerful Features for Brain Wellness
          </h2>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Discover advanced audio technology and intelligent controls designed
            to enhance your mental wellness journey with Zenphare.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-secondary">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm/6 font-semibold text-primary hover:opacity-80"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
