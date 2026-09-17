import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Card, Button } from '../../components/common';
import { Building2, HeartHandshake, ShieldCheck } from 'lucide-react';

const DashboardRedirectPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeader title="RePlate Portals" subtitle="Select your dashboard portal." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default">
          <Building2 className="w-8 h-8 text-brand-600 mb-3" />
          <Card.Title>Business Portal</Card.Title>
          <Card.Description>For hotels, restaurants & cloud kitchens</Card.Description>
          <div className="mt-4">
            <Link to="/business/dashboard">
              <Button size="sm" variant="primary" fullWidth>Open Business Dashboard</Button>
            </Link>
          </div>
        </Card>

        <Card variant="default">
          <HeartHandshake className="w-8 h-8 text-brand-600 mb-3" />
          <Card.Title>Recipient Portal</Card.Title>
          <Card.Description>For verified NGOs & shelter networks</Card.Description>
          <div className="mt-4">
            <Link to="/recipient/dashboard">
              <Button size="sm" variant="primary" fullWidth>Open Recipient Dashboard</Button>
            </Link>
          </div>
        </Card>

        <Card variant="default">
          <ShieldCheck className="w-8 h-8 text-brand-600 mb-3" />
          <Card.Title>Admin Portal</Card.Title>
          <Card.Description>Platform management & verification</Card.Description>
          <div className="mt-4">
            <Link to="/admin/dashboard">
              <Button size="sm" variant="outline" fullWidth>Open Admin Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardRedirectPage;
