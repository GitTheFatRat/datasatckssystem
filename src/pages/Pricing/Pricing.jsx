import './Pricing.css';

const plans = [
  {
    name: 'Basic',
    price: '$14.99',
    features: ['Free Setup', 'Bandwidth Limit 10 GB', '20 User Connection', 'Analytics Report', 'Public API Access', 'Plugins Integration', 'Custom Content Management'],
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '$49.99',
    features: ['Free Setup', 'Bandwidth Limit 10 GB', '20 User Connection', 'Analytics Report', 'Public API Access', 'Plugins Integration', 'Custom Content Management'],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$89.99',
    features: ['Free Setup', 'Bandwidth Limit 10 GB', '20 User Connection', 'Analytics Report', 'Public API Access', 'Plugins Integration', 'Custom Content Management'],
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <div className="page-body">
      <h1 className="page-header-title">Pricing</h1>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.highlighted ? 'pricing-card--highlight' : ''}`}>
            <span className="pricing-plan-name">{plan.name}</span>
            <span className="pricing-period">Monthly Charge</span>
            <h2 className="pricing-price">{plan.price}</h2>
            <ul className="pricing-features">
              {plan.features.map((feat, i) => (
                <li key={i} className="pricing-feature-item">
                  <span className="pricing-check">✓</span> {feat}
                </li>
              ))}
            </ul>
            <button className={`pricing-cta ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
              Get Started
            </button>
            <span className="pricing-trial">Start Your 30 Day Free Trial</span>
          </div>
        ))}
      </div>
    </div>
  );
}
