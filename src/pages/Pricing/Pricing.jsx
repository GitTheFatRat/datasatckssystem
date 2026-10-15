import { useState } from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

const basePlans = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 14.99,
    yearlyPrice: 11.99,
    features: ['Free Setup', 'Bandwidth Limit 10 GB', '20 User Connection', 'Analytics Report', 'Public API Access', 'Plugins Integration', 'Custom Content Management'],
    highlighted: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    monthlyPrice: 49.99,
    yearlyPrice: 39.99,
    features: ['Free Setup', 'Bandwidth Limit 10 GB', '20 User Connection', 'Analytics Report', 'Public API Access', 'Plugins Integration', 'Custom Content Management'],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 89.99,
    yearlyPrice: 69.99,
    features: ['Free Setup', 'Bandwidth Limit 10 GB', '20 User Connection', 'Analytics Report', 'Public API Access', 'Plugins Integration', 'Custom Content Management'],
    highlighted: true,
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [notification, setNotification] = useState('');

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName.toLowerCase());
    setNotification(`Successfully selected the ${planName} plan (${billingCycle})!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="page-body">
      <div className="pricing-header-wrap" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 className="page-header-title" style={{ marginBottom: '8px' }}>Pricing Plans</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
          Choose the plan that suits your business needs with 30-day money-back guarantee.
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-card)', padding: '4px', borderRadius: '30px', border: '1px solid var(--border-light)', gap: '4px' }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              border: 'none',
              padding: '8px 20px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: billingCycle === 'monthly' ? 'var(--color-primary)' : 'transparent',
              color: billingCycle === 'monthly' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            style={{
              border: 'none',
              padding: '8px 20px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: billingCycle === 'yearly' ? 'var(--color-primary)' : 'transparent',
              color: billingCycle === 'yearly' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            Yearly <span style={{ fontSize: '11px', background: 'rgba(0,182,155,0.2)', color: 'var(--color-success)', padding: '2px 6px', borderRadius: '10px', marginLeft: '4px' }}>Save 20%</span>
          </button>
        </div>
      </div>

      {notification && (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 24px',
          padding: '12px 18px',
          borderRadius: '8px',
          background: 'rgba(0,182,155,0.15)',
          border: '1px solid var(--color-success)',
          color: 'var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          fontWeight: 500
        }}>
          <Check size={18} />
          <span>{notification}</span>
        </div>
      )}

      <div className="pricing-grid">
        {basePlans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

          return (
            <div
              key={plan.name}
              className={`pricing-card ${isSelected ? 'pricing-card--highlight' : ''}`}
              style={{
                borderColor: isSelected ? 'var(--color-primary)' : undefined,
                boxShadow: isSelected ? '0 8px 24px rgba(72, 128, 255, 0.2)' : undefined
              }}
            >
              <span className="pricing-plan-name">{plan.name}</span>
              <span className="pricing-period">{billingCycle === 'monthly' ? 'Monthly Charge' : 'Billed Annually'}</span>
              <h2 className="pricing-price">${currentPrice.toFixed(2)}</h2>
              <ul className="pricing-features">
                {plan.features.map((feat, i) => (
                  <li key={i} className="pricing-feature-item">
                    <span className="pricing-check">✓</span> {feat}
                  </li>
                ))}
              </ul>
              <button
                className={`pricing-cta ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleSelectPlan(plan.name)}
              >
                {isSelected ? 'Active Plan' : 'Get Started'}
              </button>
              <span className="pricing-trial">Start Your 30 Day Free Trial</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

