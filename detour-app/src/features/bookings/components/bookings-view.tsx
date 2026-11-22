'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { DETOUR_BOOKINGS, RentalBooking } from '@/constants/detour-data';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

export function BookingsView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<RentalBooking | null>(null);

  const filteredBookings = DETOUR_BOOKINGS.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(search.toLowerCase()) ||
      booking.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
      booking.depotName.toLowerCase().includes(search.toLowerCase()) ||
      booking.licensePlate.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusConfig: Record<string, { label: string; class: string }> = {
    on_road: {
      label: 'On Road',
      class: 'bg-emerald-600 text-white font-semibold shadow-xs'
    },
    pickup_today: {
      label: 'Pickup Today',
      class: 'bg-blue-600 text-white font-semibold shadow-xs'
    },
    return_pending: {
      label: 'Return Due',
      class: 'bg-amber-600 text-white font-semibold shadow-xs'
    },
    confirmed: {
      label: 'Confirmed',
      class: 'bg-zinc-700 dark:bg-zinc-600 text-white font-semibold shadow-xs'
    },
    completed: {
      label: 'Completed',
      class: 'bg-zinc-800 text-zinc-300 font-semibold'
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight flex items-center gap-2'>
            <Icons.calendarCheck className='size-6 text-primary' />
            Reservations & Bookings
          </h1>
          <p className='text-sm text-muted-foreground'>
            Active reservations, vehicle handovers, customer licenses, and return checklists.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => window.print()}>
            <Icons.upload className='size-4 mr-1.5 rotate-180' />
            Export Manifest
          </Button>
          <Button size='sm' onClick={() => setSelectedBooking(DETOUR_BOOKINGS[0])}>
            <Icons.car className='size-4 mr-1.5' />
            Quick Handover
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Card className='p-4 border border-border/70 bg-card'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-muted-foreground font-medium'>Total Active</span>
            <Icons.key className='size-4 text-muted-foreground' />
          </div>
          <div className='text-2xl font-bold mt-1 text-foreground'>36</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>Vehicles on road</p>
        </Card>
        <Card className='p-4 border border-border/70 bg-card'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-muted-foreground font-medium'>Pickups Today</span>
            <Icons.calendar className='size-4 text-muted-foreground' />
          </div>
          <div className='text-2xl font-bold mt-1 text-foreground'>12</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>4 morning, 8 afternoon</p>
        </Card>
        <Card className='p-4 border border-border/70 bg-card'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-muted-foreground font-medium'>Returns Due</span>
            <Icons.clock className='size-4 text-muted-foreground' />
          </div>
          <div className='text-2xl font-bold mt-1 text-foreground'>8</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>Inspections ready</p>
        </Card>
        <Card className='p-4 border border-border/70 bg-card'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-muted-foreground font-medium'>Active Value</span>
            <Icons.receipt className='size-4 text-muted-foreground' />
          </div>
          <div className='text-2xl font-bold mt-1 text-foreground'>$14,280</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>Current active leases</p>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardHeader className='pb-3'>
          <div className='flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between'>
            <div className='relative flex-1 max-w-sm'>
              <Icons.search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
              <Input
                placeholder='Search by customer, booking ref, plate, or car...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='pl-8 h-9'
              />
            </div>
            <div className='flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0'>
              {['all', 'on_road', 'pickup_today', 'return_pending', 'confirmed'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setStatusFilter(status)}
                  className='h-8 text-xs capitalize'
                >
                  {status.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm border-collapse'>
              <thead>
                <tr className='border-y bg-muted/40 text-xs font-semibold text-muted-foreground'>
                  <th className='py-3 px-4'>Booking Ref</th>
                  <th className='py-3 px-4'>Vehicle</th>
                  <th className='py-3 px-4'>Customer & License</th>
                  <th className='py-3 px-4'>Dates & Duration</th>
                  <th className='py-3 px-4'>Depot Hub</th>
                  <th className='py-3 px-4'>Amount</th>
                  <th className='py-3 px-4'>Status</th>
                  <th className='py-3 px-4 text-right'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border/60'>
                {filteredBookings.map((booking) => {
                  const statusInfo = statusConfig[booking.status] || {
                    label: booking.status,
                    class: 'bg-muted text-muted-foreground'
                  };

                  return (
                    <tr
                      key={booking.id}
                      className='hover:bg-muted/30 transition-colors group cursor-pointer'
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <td className='py-3.5 px-4 font-mono font-bold text-primary'>
                        {booking.bookingRef}
                      </td>
                      <td className='py-3.5 px-4'>
                        <div className='flex items-center gap-3'>
                          <div className='relative size-10 rounded-md overflow-hidden border bg-muted shrink-0'>
                            <Image
                              src={booking.vehicleImage}
                              alt={booking.vehicleName}
                              fill
                              className='object-cover'
                              sizes='40px'
                            />
                          </div>
                          <div>
                            <div className='font-semibold text-foreground'>{booking.vehicleName}</div>
                            <div className='text-xs text-muted-foreground font-mono'>
                              {booking.licensePlate} • {booking.vehicleCategory}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='py-3.5 px-4'>
                        <div className='font-medium text-foreground'>{booking.customerName}</div>
                        <div className='text-xs text-muted-foreground'>
                          DL: <span className='font-mono'>{booking.driverLicense}</span>
                        </div>
                      </td>
                      <td className='py-3.5 px-4'>
                        <div className='text-xs font-medium'>
                          {booking.pickupDate} → {booking.returnDate}
                        </div>
                        <div className='text-xs text-muted-foreground'>{booking.days} days rental</div>
                      </td>
                      <td className='py-3.5 px-4'>
                        <div className='text-xs font-medium'>{booking.depotName}</div>
                        {booking.scenicRoute && (
                          <div className='text-[11px] text-primary flex items-center gap-1 mt-0.5'>
                            <Icons.route className='size-3 shrink-0' />
                            <span className='truncate max-w-[140px]'>{booking.scenicRoute}</span>
                          </div>
                        )}
                      </td>
                      <td className='py-3.5 px-4'>
                        <div className='font-bold tabular-nums'>${booking.totalAmount}</div>
                        <div className='text-[10px] text-muted-foreground'>(${booking.dailyRate}/day + fee)</div>
                      </td>
                      <td className='py-3.5 px-4'>
                        <Badge variant='outline' className={`text-xs ${statusInfo.class}`}>
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className='py-3.5 px-4 text-right'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 text-xs'
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking);
                          }}
                        >
                          Details →
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <Dialog open={Boolean(selectedBooking)} onOpenChange={(open) => !open && setSelectedBooking(null)}>
          <DialogContent className='max-w-xl'>
            <DialogHeader>
              <div className='flex items-center justify-between'>
                <DialogTitle className='text-lg font-bold flex items-center gap-2'>
                  <Icons.receipt className='size-5 text-primary' />
                  Reservation {selectedBooking.bookingRef}
                </DialogTitle>
                <Badge
                  variant='outline'
                  className={`text-xs ${statusConfig[selectedBooking.status]?.class}`}
                >
                  {statusConfig[selectedBooking.status]?.label}
                </Badge>
              </div>
              <DialogDescription>
                Confirmed Detour self-drive rental contract & vehicle voucher.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4 pt-2'>
              {/* Car Showcase */}
              <div className='flex items-center gap-4 p-3 rounded-lg border bg-muted/30'>
                <div className='relative size-20 rounded-md overflow-hidden border shrink-0 bg-muted'>
                  <Image
                    src={selectedBooking.vehicleImage}
                    alt={selectedBooking.vehicleName}
                    fill
                    className='object-cover'
                    sizes='80px'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='font-bold text-base'>{selectedBooking.vehicleName}</h3>
                  <p className='text-xs text-muted-foreground'>
                    Category: {selectedBooking.vehicleCategory} • Plate: {selectedBooking.licensePlate}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Depot: {selectedBooking.depotName}
                  </p>
                </div>
                <div className='text-right'>
                  <div className='text-lg font-bold text-primary'>${selectedBooking.totalAmount}</div>
                  <div className='text-[11px] text-muted-foreground'>Total Charged</div>
                </div>
              </div>

              {/* Driver & Trip Details Grid */}
              <div className='grid grid-cols-2 gap-3 text-xs'>
                <div className='p-3 rounded-lg border space-y-1'>
                  <span className='font-semibold text-muted-foreground uppercase text-[10px] tracking-wider'>
                    Driver Credentials
                  </span>
                  <div className='font-medium text-foreground'>{selectedBooking.customerName}</div>
                  <div className='text-muted-foreground font-mono'>License: {selectedBooking.driverLicense}</div>
                  <div className='text-muted-foreground'>{selectedBooking.customerPhone}</div>
                  <div className='text-muted-foreground'>{selectedBooking.customerEmail}</div>
                </div>
                <div className='p-3 rounded-lg border space-y-1'>
                  <span className='font-semibold text-muted-foreground uppercase text-[10px] tracking-wider'>
                    Trip & Route
                  </span>
                  <div>Pickup: <strong>{selectedBooking.pickupDate}</strong></div>
                  <div>Return: <strong>{selectedBooking.returnDate}</strong></div>
                  <div>Duration: <strong>{selectedBooking.days} days</strong></div>
                  {selectedBooking.scenicRoute && (
                    <div className='text-primary font-medium mt-1'>
                      Scenic Itinerary: {selectedBooking.scenicRoute}
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className='p-3 rounded-lg border bg-muted/20 space-y-1.5 text-xs'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>
                    Daily Rental (${selectedBooking.dailyRate} × {selectedBooking.days} days)
                  </span>
                  <span className='font-medium'>${selectedBooking.subtotal}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Depot Service & Insurance Fee (12.5%)</span>
                  <span className='font-medium'>${selectedBooking.serviceFee}</span>
                </div>
                <div className='border-t pt-1.5 flex justify-between font-bold text-sm'>
                  <span>Total Amount Paid</span>
                  <span className='text-primary'>${selectedBooking.totalAmount}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className='flex justify-end gap-2 pt-2'>
                <Button variant='outline' size='sm' onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
                <Button size='sm' onClick={() => setSelectedBooking(null)}>
                  <Icons.check className='size-4 mr-1.5' />
                  Verify Handover
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
