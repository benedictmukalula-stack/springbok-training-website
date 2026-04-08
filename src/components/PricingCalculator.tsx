'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BASE_PRICE = 3500;

const trainingTypes = [
  { value: 'public', label: 'Public Course', multiplier: 1 },
  { value: 'inhouse', label: 'In-House Training', multiplier: 1.2 },
  { value: 'customized', label: 'Customized Programme', multiplier: 1.5 },
];

function getVolumeDiscount(participants: number): { rate: number; label: string } {
  if (participants >= 30) return { rate: 0.15, label: '15% Volume Discount (30+ participants)' };
  if (participants >= 20) return { rate: 0.10, label: '10% Volume Discount (20+ participants)' };
  if (participants >= 10) return { rate: 0.05, label: '5% Volume Discount (10+ participants)' };
  return { rate: 0, label: '' };
}

function formatZMW(amount: number): string {
  return `K${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function PricingCalculator() {
  const [participants, setParticipants] = useState(10);
  const [days, setDays] = useState(3);
  const [trainingType, setTrainingType] = useState('public');

  const selectedType = useMemo(
    () => trainingTypes.find((t) => t.value === trainingType) || trainingTypes[0],
    [trainingType]
  );

  const calculation = useMemo(() => {
    const baseCost = participants * days * BASE_PRICE;
    const surchargedCost = baseCost * selectedType.multiplier;
    const discount = getVolumeDiscount(participants);
    const discountAmount = surchargedCost * discount.rate;
    const total = surchargedCost - discountAmount;

    return {
      baseCost,
      surchargeAmount: surchargedCost - baseCost,
      surchargeLabel:
        selectedType.multiplier > 1
          ? `${(selectedType.multiplier * 100 - 100).toFixed(0)}% ${selectedType.label} Surcharge`
          : '',
      discountAmount,
      discountLabel: discount.label,
      total,
    };
  }, [participants, days, selectedType]);

  return (
    <div>
      {/* Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-green-600/5">
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#16a34a]" />

          <div className="grid md:grid-cols-2">
            {/* Left: Inputs */}
            <div className="p-8 space-y-6 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Configure Your Training
                  </h3>
                  <p className="text-xs text-gray-400">
                    Adjust the values below to see pricing
                  </p>
                </div>
              </div>

              {/* Participants */}
              <div className="space-y-2">
                <label
                  htmlFor="participants"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Participants
                </label>
                <input
                  id="participants"
                  type="number"
                  min={1}
                  max={100}
                  value={participants}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1 && val <= 100) {
                      setParticipants(val);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                />
                <p className="text-xs text-gray-400">Min 1, Max 100 participants</p>
              </div>

              {/* Training Days */}
              <div className="space-y-2">
                <label
                  htmlFor="days"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Training Days
                </label>
                <input
                  id="days"
                  type="number"
                  min={1}
                  max={30}
                  value={days}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1 && val <= 30) {
                      setDays(val);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                />
                <p className="text-xs text-gray-400">Min 1, Max 30 days</p>
              </div>

              {/* Training Type */}
              <div className="space-y-2">
                <label
                  htmlFor="training-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Training Type
                </label>
                <select
                  id="training-type"
                  value={trainingType}
                  onChange={(e) => setTrainingType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300 appearance-none cursor-pointer"
                >
                  {trainingTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                      {type.multiplier > 1 &&
                        ` (${(type.multiplier * 100 - 100).toFixed(0)}% surcharge)`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right: Results */}
            <div className="p-8 space-y-6 bg-gray-50/30">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Investment Summary
              </h3>

              {/* Base Cost */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-700">Base Cost</p>
                  <p className="text-xs text-gray-400">
                    {participants} participants × {days} days × K{BASE_PRICE.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatZMW(calculation.baseCost)}
                </p>
              </div>

              {/* Surcharge */}
              {calculation.surchargeLabel && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-700">
                      {calculation.surchargeLabel}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-amber-600">
                    +{formatZMW(calculation.surchargeAmount)}
                  </p>
                </div>
              )}

              {/* Volume Discount */}
              {calculation.discountLabel && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-700">
                      {calculation.discountLabel}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#16a34a]">
                    -{formatZMW(calculation.discountAmount)}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="pt-4">
                <div className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] rounded-xl p-6 text-white">
                  <p className="text-sm font-medium text-white/80 mb-1">
                    Total Investment
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold">
                    {formatZMW(calculation.total)}
                  </p>
                  <p className="text-xs text-white/60 mt-2">
                    Per participant:{' '}
                    {formatZMW(Math.round(calculation.total / participants))} / day
                  </p>
                </div>
              </div>

              {/* Note */}
              <div className="flex gap-2 text-xs text-gray-400 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p>
                  * Prices are per participant per day. In-house training includes
                  venue arrangement at no additional cost. Contact us for volume
                  discounts on large groups.
                </p>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-base py-6 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 group"
                asChild
              >
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
