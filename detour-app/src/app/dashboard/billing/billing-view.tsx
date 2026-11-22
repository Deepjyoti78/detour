'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { billingInfoContent } from '@/config/infoconfig';
import React, { useState } from 'react';

const FLEET_PLANS = [
  {
    id: 'starter',
    name: 'Regional Starter',
    price: '$199',
    cadence: 'per month',
    description: 'Essential fleet management for independent regional depots and local car rentals.',
    features: [
      'Up to 15 active vehicles',
      '2 regional depot hubs',
      'Standard GPS telemetry',
      'Basic rental agreement templates',
      'Business hours support'
    ],
    isCurrent: false
  },
  {
    id: 'commercial',
    name: 'Commercial Fleet',
    price: '$499',
    cadence: 'per month',
    description: 'Comprehensive telemetry, multi-depot coordination, and full concierge roadside coverage.',
    features: [
      'Up to 50 active vehicles (48 in use)',
      'All 7 Regional Depot Hubs',
      'Real-time live telemetry & speed alerts',
      'Digital pre-drive inspection signoff',
      'Multi-driver rental agreements',
      '24/7 dedicated concierge hotline'
    ],
    isCurrent: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Network',
    price: '$999',
    cadence: 'per month',
    description: 'Custom telematics integration, unlimited fleet scale, and dedicated account engineering.',
    features: [
      'Unlimited vehicle inventory',
      'Unlimited depots & international hubs',
      'Custom telematics webhook API',
      'Dedicated account manager',
      'Custom white-label driver mobile apps',
      '99.99% operational uptime SLA'
    ],
    isCurrent: false
  }
];

const INVOICE_HISTORY = [
  { id: 'INV-2026-11', date: 'Nov 01, 2026', amount: '$499.00', status: 'Paid', method: 'Visa •••• 4242' },
  { id: 'INV-2026-10', date: 'Oct 01, 2026', amount: '$499.00', status: 'Paid', method: 'Visa •••• 4242' },
  { id: 'INV-2026-09', date: 'Sep 01, 2026', amount: '$499.00', status: 'Paid', method: 'Visa •••• 4242' },
  { id: 'INV-2026-08', date: 'Aug 01, 2026', amount: '$499.00', status: 'Paid', method: 'Visa •••• 4242' }
];

export default function BillingView() {
  const [selectedPlan, setSelectedPlan] = useState('commercial');

  return (
    <PageContainer
      infoContent={billingInfoContent}
      pageTitle='Commercial Fleet Billing & Plans'
      pageDescription='Manage your depot subscription tier, fleet licenses, payment methods, and historical invoices.'
    >
      <div className='flex flex-col gap-6'>
        {/* Active Plan Overview Card */}
        <Card className='border border-border/70 bg-gradient-to-b from-card to-card/60 shadow-xs'>
          <CardHeader className='pb-4'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
              <div>
                <div className='flex items-center gap-2'>
                  <CardTitle className='text-xl font-bold text-foreground'>
                    Commercial Fleet Plan
                  </CardTitle>
                  <span className='inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow-xs'>
                    <Icons.check className='size-3 text-white' />
                    Active Plan
                  </span>
                </div>
                <CardDescription className='text-xs mt-1 text-muted-foreground'>
                  Billed monthly at <strong className='text-foreground'>$499.00/mo</strong> • Renews automatically on Dec 01, 2026
                </CardDescription>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline' size='sm' className='text-xs'>
                  Change Payment Method
                </Button>
                <Button size='sm' className='bg-foreground text-background hover:bg-foreground/90 font-semibold text-xs'>
                  Manage Plan
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className='pt-0 border-t border-border/50'>
            {/* Resource Usage Meters */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs'>
              <div className='p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1.5'>
                <div className='flex justify-between font-medium'>
                  <span className='text-muted-foreground'>Vehicle Licenses</span>
                  <span className='font-bold tabular-nums text-foreground'>48 / 50 Active</span>
                </div>
                <div className='h-2 w-full rounded-full bg-muted overflow-hidden'>
                  <div className='h-full rounded-full bg-foreground' style={{ width: '96%' }} />
                </div>
                <span className='text-[10px] text-muted-foreground'>2 vehicle slots remaining</span>
              </div>

              <div className='p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1.5'>
                <div className='flex justify-between font-medium'>
                  <span className='text-muted-foreground'>Depot Hub Capacity</span>
                  <span className='font-bold tabular-nums text-foreground'>7 / 7 Connected</span>
                </div>
                <div className='h-2 w-full rounded-full bg-muted overflow-hidden'>
                  <div className='h-full rounded-full bg-foreground' style={{ width: '100%' }} />
                </div>
                <span className='text-[10px] text-muted-foreground'>All regional hubs online</span>
              </div>

              <div className='p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1.5'>
                <div className='flex justify-between font-medium'>
                  <span className='text-muted-foreground'>Monthly Telemetry Data</span>
                  <span className='font-bold tabular-nums text-foreground'>142.8 / 250 GB</span>
                </div>
                <div className='h-2 w-full rounded-full bg-muted overflow-hidden'>
                  <div className='h-full rounded-full bg-foreground' style={{ width: '57%' }} />
                </div>
                <span className='text-[10px] text-muted-foreground'>Cycle resets in 10 days</span>
              </div>

              <div className='p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1.5'>
                <div className='flex justify-between font-medium'>
                  <span className='text-muted-foreground'>Active Trip Leases</span>
                  <span className='font-bold tabular-nums text-foreground'>36 Contracts</span>
                </div>
                <div className='h-2 w-full rounded-full bg-muted overflow-hidden'>
                  <div className='h-full rounded-full bg-emerald-600' style={{ width: '72%' }} />
                </div>
                <span className='text-[10px] text-muted-foreground'>Zero telemetry violations</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Subscription Tier Comparison */}
        <div>
          <div className='mb-4'>
            <h2 className='text-lg font-bold text-foreground'>Available Commercial Fleet Plans</h2>
            <p className='text-xs text-muted-foreground'>
              Scale vehicle allocations and regional depot coverage to fit seasonal travel demand.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {FLEET_PLANS.map((plan) => {
              const isSelected = plan.id === selectedPlan;
              return (
                <Card
                  key={plan.id}
                  className={`flex flex-col justify-between transition-all border ${
                    plan.isCurrent
                      ? 'border-foreground/80 shadow-md ring-1 ring-foreground/20'
                      : 'border-border/70 hover:border-border'
                  }`}
                >
                  <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                      <CardTitle className='text-base font-bold text-foreground'>{plan.name}</CardTitle>
                      {plan.isCurrent && (
                        <span className='inline-flex items-center rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs'>
                          Current Plan
                        </span>
                      )}
                    </div>
                    <CardDescription className='text-xs'>{plan.description}</CardDescription>
                    <div className='mt-3 flex items-baseline gap-1'>
                      <span className='text-3xl font-extrabold text-foreground tabular-nums'>{plan.price}</span>
                      <span className='text-xs text-muted-foreground'>/ {plan.cadence}</span>
                    </div>
                  </CardHeader>

                  <CardContent className='flex-1 space-y-2.5 text-xs border-t border-border/40 pt-4'>
                    <span className='font-semibold text-foreground text-[11px] uppercase tracking-wider block'>
                      Included Fleet Features:
                    </span>
                    <ul className='space-y-2 text-muted-foreground'>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className='flex items-start gap-2'>
                          <Icons.check className='size-3.5 text-emerald-600 shrink-0 mt-0.5' />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className='pt-2'>
                    {plan.isCurrent ? (
                      <Button variant='outline' disabled className='w-full text-xs font-semibold'>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        variant='default'
                        onClick={() => setSelectedPlan(plan.id)}
                        className='w-full text-xs font-semibold bg-foreground text-background hover:bg-foreground/90'
                      >
                        Upgrade to {plan.name}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payment Methods & Historical Invoices */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          {/* Payment Method Card */}
          <Card className='border border-border/70 bg-card shadow-xs lg:col-span-1'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base font-semibold flex items-center gap-2 text-foreground'>
                <Icons.creditCard className='size-5 text-foreground' />
                Payment Method
              </CardTitle>
              <CardDescription className='text-xs'>
                Primary payment method for automated monthly billing
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 text-xs'>
              <div className='p-3 rounded-lg border border-border/60 bg-muted/30 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-primary/10 text-primary p-2 rounded-md border'>
                    <Icons.creditCard className='size-4' />
                  </div>
                  <div>
                    <span className='font-semibold text-foreground block'>Visa ending in 4242</span>
                    <span className='text-[10px] text-muted-foreground'>Expires 08/2029 • Default</span>
                  </div>
                </div>
                <span className='inline-flex items-center rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white'>
                  Verified
                </span>
              </div>

              <div className='space-y-1.5 text-muted-foreground'>
                <div className='flex justify-between'>
                  <span>Billing Email:</span>
                  <strong className='text-foreground font-mono'>billing@detour.com</strong>
                </div>
                <div className='flex justify-between'>
                  <span>GSTIN / Tax ID:</span>
                  <strong className='text-foreground font-mono'>27AABCT2394P1Z2</strong>
                </div>
                <div className='flex justify-between'>
                  <span>Billing Address:</span>
                  <span className='text-foreground text-right'>Nariman Point, Mumbai, MH</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className='border-t border-border/40 pt-3'>
              <Button variant='outline' size='sm' className='w-full text-xs'>
                Update Billing Details
              </Button>
            </CardFooter>
          </Card>

          {/* Invoicing Table */}
          <Card className='border border-border/70 bg-card shadow-xs lg:col-span-2'>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-base font-semibold flex items-center gap-2 text-foreground'>
                    <Icons.receipt className='size-5 text-foreground' />
                    Billing & Invoice History
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    Past receipts and tax statements for fleet operations
                  </CardDescription>
                </div>
                <Button variant='outline' size='sm' className='text-xs' onClick={() => window.print()}>
                  Download All (ZIP)
                </Button>
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='overflow-x-auto'>
                <table className='w-full text-xs text-left'>
                  <thead>
                    <tr className='border-b border-border/60 text-muted-foreground font-medium'>
                      <th className='py-2.5 font-medium'>Invoice</th>
                      <th className='py-2.5 font-medium'>Date</th>
                      <th className='py-2.5 font-medium'>Amount</th>
                      <th className='py-2.5 font-medium'>Status</th>
                      <th className='py-2.5 font-medium text-right'>Receipt</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-border/40'>
                    {INVOICE_HISTORY.map((invoice) => (
                      <tr key={invoice.id} className='hover:bg-muted/30 transition-colors'>
                        <td className='py-2.5 font-mono font-semibold text-foreground'>{invoice.id}</td>
                        <td className='py-2.5 text-muted-foreground'>{invoice.date}</td>
                        <td className='py-2.5 font-bold tabular-nums text-foreground'>{invoice.amount}</td>
                        <td className='py-2.5'>
                          <span className='inline-flex items-center rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs'>
                            {invoice.status}
                          </span>
                        </td>
                        <td className='py-2.5 text-right'>
                          <button
                            type='button'
                            onClick={() => window.print()}
                            className='text-primary hover:underline font-medium text-xs inline-flex items-center gap-1'
                          >
                            PDF
                            <Icons.chevronRight className='size-3' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
