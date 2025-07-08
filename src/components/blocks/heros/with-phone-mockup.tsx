"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Menu,
  X,
  ChevronRight,
  Play,
  Pause,
  Square,
  Volume2,
  Settings,
  BarChart3,
  Calendar,
} from "lucide-react";

const navigation = [
  { name: "Features", href: "#" },
  { name: "Sessions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Support", href: "#" },
];

export default function WithPhoneMockup() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white font-[var(--font-inter)]">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Zenphare</span>
              <div className="h-8 w-8 rounded bg-[#8D7053] flex items-center justify-center text-white font-bold text-sm">
                Z
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-[#2D5016]"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-[#2D5016]">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Zenphare</span>
                <div className="h-8 w-8 rounded bg-[#8D7053] flex items-center justify-center text-white font-bold text-sm">
                  Z
                </div>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#2D5016] hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[#2D5016] hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate pt-14">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span className="font-semibold text-[#8D7053]">
                  New Technology
                </span>
                <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                <a href="#" className="flex items-center gap-x-1">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Brain Sync Innovation
                  <ChevronRight
                    aria-hidden="true"
                    className="-mr-2 size-5 text-gray-400"
                  />
                </a>
              </div>
            </div>
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-[#1f1f1f] sm:text-7xl">
              Zenphare - Brain Synchronization for Your Health
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-[#6b7280] sm:text-xl/8">
              Experience advanced brainwave synchronization technology through
              our intuitive Flutter app. Designed with iPhone-inspired
              simplicity for optimal wellness.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#8D7053] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#7a6048] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8D7053]"
              >
                Download App
              </a>
              <a
                href="#"
                className="text-sm/6 font-semibold text-[#2D5016] border border-[#2D5016] rounded-md px-3.5 py-2.5 hover:bg-[#2D5016] hover:text-white transition-colors"
              >
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
            <svg
              role="img"
              viewBox="0 0 366 729"
              className="mx-auto w-91.5 max-w-full drop-shadow-xl"
            >
              <title>Zenphare Health App screenshot</title>
              <defs>
                <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                  <rect rx={36} width={316} height={684} />
                </clipPath>
              </defs>
              <path
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                fill="#4B5563"
              />
              <path
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                fill="#1f1f1f"
              />
              <foreignObject
                width={316}
                height={684}
                clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                transform="translate(24 24)"
              >
                <div className="h-full w-full bg-white font-[var(--font-inter)]">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-6 pt-4 pb-2">
                    <span className="text-sm font-medium text-black">9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-black rounded-sm"></div>
                      <div className="w-1 h-2 bg-black rounded-sm"></div>
                      <div className="w-6 h-3 border border-black rounded-sm">
                        <div className="w-4 h-1 bg-black rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-2xl font-semibold text-[#2D5016]">
                      Zenphare
                    </h2>
                    <p className="text-sm text-gray-600">
                      Brain Synchronization Session
                    </p>
                  </div>

                  {/* Main controls */}
                  <div className="px-6 py-8 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#8D7053] to-[#2D5016] flex items-center justify-center mb-8">
                      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full border-4 border-[#8D7053]"></div>
                          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-[#2D5016] opacity-30 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Session info */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-[#2D5016] mb-1">
                        Alpha Wave Focus
                      </h3>
                      <p className="text-sm text-gray-600">15:30 remaining</p>
                    </div>

                    {/* Control buttons */}
                    <div className="flex items-center space-x-6 mb-8">
                      <button className="p-3 rounded-full bg-gray-100">
                        <Square className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-4 rounded-full bg-[#8D7053]">
                        <Pause className="w-6 h-6 text-white" />
                      </button>
                      <button className="p-3 rounded-full bg-gray-100">
                        <Play className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Audio controls */}
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <Volume2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Volume</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                        <div className="w-3/5 h-2 bg-[#8D7053] rounded-full"></div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Frequency</span>
                        <span className="text-sm font-medium text-[#2D5016]">
                          10.5Hz
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div className="w-2/3 h-2 bg-[#2D5016] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom navigation */}
                  <div className="absolute bottom-8 left-0 right-0 px-6">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex justify-around">
                        <div className="flex flex-col items-center">
                          <Calendar className="w-5 h-5 text-[#8D7053] mb-1" />
                          <span className="text-xs font-medium text-[#8D7053]">
                            Sessions
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <BarChart3 className="w-5 h-5 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-400">
                            Progress
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Settings className="w-5 h-5 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-400">
                            Settings
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
