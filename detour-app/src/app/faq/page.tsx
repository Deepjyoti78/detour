'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function FaqPage() {
  const faqs = [
    {
      category: 'Before Booking',
      items: [
        {
          id: 'driver-details',
          question: 'What driver details do I need to book?',
          answer:
            'Use a sample name and email to try Detour. In a live rental setting, drivers must present an official valid driving licence, secondary government ID, and meet operator minimum age requirements.',
        },
        {
          id: 'rental-cost',
          question: 'How much will the rental cost?',
          answer:
            'Choose your dates and a vehicle to view the exact subtotal, 12.5% estimated taxes and fees, and total price. If you modify your dates in My Booking, you can review the adjusted estimate before confirming changes.',
        },
        {
          id: 'deposit-hold',
          question: 'Is there a deposit or card hold?',
          answer:
            'The Detour demonstration uses illustrative pricing and collects zero payment. For live commercial car rentals, operators typically hold a security deposit on a major credit card until return.',
        },
      ],
    },
    {
      category: 'Mileage & Fuel',
      items: [
        {
          id: 'mileage-limit',
          question: 'How much mileage is included?',
          answer:
            'All Detour demo rentals assume unlimited mileage for curated Pacific Northwest itineraries. Check operator terms for commercial road trips crossing state or international borders.',
        },
        {
          id: 'fuel-policy',
          question: 'Do I need to refuel before returning the vehicle?',
          answer:
            'Cars are provided with a full tank of fuel. Operators require vehicles to be returned at the same fuel level to avoid refuelling surcharge fees.',
        },
      ],
    },
    {
      category: 'Pick-up & Changes',
      items: [
        {
          id: 'depot-locations',
          question: 'Where do I pick up and return the car?',
          answer:
            'Choose any major city depot (Mumbai, Delhi NCR, Bengaluru, Goa, Hyderabad, Kolkata, or Jaipur) in the demo. Your confirmation shows your chosen branch and provides a direct link to the step-by-step Pick-up Guide.',
        },
        {
          id: 'change-cancel',
          question: 'Can I change or cancel my reservation?',
          answer:
            'Yes. Navigate to My Booking at any time to revise your rental dates, change your pick-up depot, review updated pricing, or cancel your demo booking.',
        },
      ],
    },
  ];

  return (
    <div className="w-[90%] max-w-5xl mx-auto py-12 md:py-16">
      <div className="border-b border-[#a9aa9c] pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#47516a] block mb-2">
            Rental Guidance
          </span>
          <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
            GOOD TO KNOW.
          </h1>
          <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
            Driver requirements, deposit guidance, fuel policies, and booking changes.
          </p>
        </div>
        <Link
          href="/#trip-planner"
          className="btn-tactile-yellow py-2.5 px-5 text-xs uppercase tracking-wider font-bold flex items-center gap-2 group self-start md:self-auto"
        >
          <span>Plan a rental</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex flex-col gap-12">
        {faqs.map((section) => (
          <section key={section.category} className="border-2 border-[#18274b] bg-[#faf2db] p-6 sm:p-8 shadow-[6px_6px_0px_#18274b]">
            <h2 className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide mb-6 border-b border-[#a9aa9c] pb-3">
              {section.category.toUpperCase()}
            </h2>

            <Accordion.Root type="multiple" className="flex flex-col divide-y divide-[#a9aa9c]">
              {section.items.map((item) => (
                <Accordion.Item key={item.id} value={item.id} className="py-4 first:pt-0 last:pb-0">
                  <Accordion.Trigger className="w-full flex items-center justify-between text-left font-bold text-base text-[#18274b] group cursor-pointer">
                    <span className="hover:text-[#203a78] transition-colors">{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#47516a] transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0 ml-4" />
                  </Accordion.Trigger>
                  <Accordion.Content className="pt-3 text-sm text-[#47516a] leading-relaxed animate-accordion-down overflow-hidden">
                    {item.answer}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </section>
        ))}
      </div>
    </div>
  );
}
