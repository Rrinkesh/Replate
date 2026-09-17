import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Utensils,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Building2,
  AlertCircle,
  Share2,
  Sparkles,
} from 'lucide-react';
import { mockFoodItems } from '../../utils/mockFoodData';
import { Card, Badge, Button, Modal } from '../../components/common';

const FoodDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [reservedQuantity, setReservedQuantity] = useState(1);

  // Find item from mock dataset or default to item 1
  const food = mockFoodItems.find((item) => item.id === id) || mockFoodItems[0];

  const handleConfirmReservation = () => {
    setIsReserveModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Link */}
      <Link
        to="/food"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-500 hover:text-charcoal-900 mb-6 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Food Marketplace Directory
      </Link>

      {/* Hero Image Banner Card */}
      <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 bg-charcoal-900 shadow-soft-xl mb-8 border border-charcoal-100">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover opacity-90"
        />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <Badge status={food.status} size="lg" showDot className="shadow-soft-sm" />
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-charcoal-950/80 text-white backdrop-blur-md border border-white/20">
            {food.category}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
          <div className="text-white space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
              {food.businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{food.name}</h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Specs Card */}
          <Card variant="default">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-charcoal-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-charcoal-900 text-sm">{food.businessName}</h3>
                  <p className="text-xs text-charcoal-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-600" />
                    {food.location} ({food.distanceText})
                  </p>
                </div>
              </div>

              {food.fssaiVerified && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>FSSAI Verified Kitchen</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="py-4">
              <h4 className="text-sm font-bold text-charcoal-900 mb-2">Description & Details</h4>
              <p className="text-sm text-charcoal-700 leading-relaxed">{food.description}</p>
            </div>

            {/* Dietary Tags */}
            {food.dietary && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {food.dietary.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-surface-100 text-charcoal-700 text-xs font-semibold border border-charcoal-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Food Safety & Logistics Box */}
          <Card variant="default" className="bg-surface-50 border-charcoal-200">
            <Card.Title className="text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" /> Food Safety & Packaging Guarantee
            </Card.Title>
            <div className="mt-3 space-y-2 text-xs text-charcoal-700 leading-relaxed">
              <p>• <strong>Preparation Log:</strong> {food.prepTime}</p>
              <p>• <strong>Packaging Standard:</strong> {food.packaging}</p>
              <p>• <strong>Temperature Assurance:</strong> Inspected prior to pickup window for compliance with food safety protocols.</p>
            </div>
          </Card>
        </div>

        {/* Right Column Pricing & Reservation Action Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="default" className="sticky top-24 border-brand-200 shadow-soft-lg">
            <div className="space-y-4">
              <div className="pb-4 border-b border-charcoal-100">
                <span className="text-xs text-charcoal-500 font-semibold uppercase tracking-wider">
                  Recovery Price
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-charcoal-900">₹{food.price}</span>
                  <span className="text-sm text-charcoal-400 line-through font-semibold">
                    ₹{food.originalPrice}
                  </span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                    Save {food.discountPercent}%
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-charcoal-700">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500">Available Quantity:</span>
                  <span className="font-extrabold text-charcoal-900">{food.quantityText}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500">Pickup Window:</span>
                  <span className="font-extrabold text-amber-700">Before {food.pickupDeadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500">Distance:</span>
                  <span className="font-extrabold text-charcoal-900">{food.distanceText}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  iconLeft={HeartHandshake}
                  onClick={() => setIsReserveModalOpen(true)}
                >
                  Reserve Surplus Food
                </Button>
              </div>

              <p className="text-[11px] text-charcoal-500 text-center">
                Free cancellation up to 30 mins before pickup window.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Reservation Form Modal Mockup */}
      <Modal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        title="Reserve Surplus Food"
        subtitle={food.name}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsReserveModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmReservation}>
              Confirm Reservation
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm">
          <div className="p-3 bg-surface-50 rounded-xl border border-charcoal-100 text-xs">
            <p><strong className="text-charcoal-900">Donor:</strong> {food.businessName} ({food.location})</p>
            <p><strong className="text-charcoal-900">Pickup Deadline:</strong> Today before {food.pickupDeadline}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">Select Number of Meals:</label>
            <input
              type="number"
              min="1"
              max={food.quantity}
              value={reservedQuantity}
              onChange={(e) => setReservedQuantity(parseInt(e.target.value) || 1)}
              className="w-full rounded-xl border border-charcoal-200 p-2.5 text-sm font-semibold"
            />
          </div>

          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-900 font-medium">
            Total Recovery Price: <strong>₹{food.price * reservedQuantity}</strong> (Estimated Savings: ₹{(food.originalPrice - food.price) * reservedQuantity})
          </div>
        </div>
      </Modal>

      {/* Success Confirmation Modal Mockup */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Reservation Confirmed!"
        subtitle="Your surplus food request has been reserved."
        footer={
          <Button variant="primary" onClick={() => navigate('/recipient/dashboard')}>
            Go to Recipient Dashboard
          </Button>
        }
      >
        <div className="text-center py-4 space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold text-charcoal-900">
            Reserved {reservedQuantity} x {food.name}
          </p>
          <p className="text-xs text-charcoal-500">
            Show your confirmation code <strong>#RPL-{Math.floor(1000 + Math.random() * 9000)}</strong> at {food.businessName} during pickup before {food.pickupDeadline}.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default FoodDetailPage;
