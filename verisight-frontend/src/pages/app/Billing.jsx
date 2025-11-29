import { useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        '10 videos per month',
        'Basic AI analysis',
        '7-day evidence retention',
        'Email support',
        'Standard processing speed',
      ],
    },
    {
      id: 'pro',
      name: 'Professional',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        '100 videos per month',
        'Advanced AI analysis',
        '30-day evidence retention',
        'Priority email support',
        'Fast processing speed',
        'Verification packs',
        'API access',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        'Unlimited videos',
        'Premium AI models',
        'Unlimited evidence retention',
        '24/7 phone & email support',
        'Fastest processing speed',
        'Verification packs',
        'Full API access',
        'Custom integrations',
        'Dedicated account manager',
      ],
    },
  ];

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}>
              Billing & Subscription
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Manage your subscription and payment methods
            </p>
          </div>

          {/* Current Plan */}
          <Card style={{ marginBottom: '32px' }}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Current Plan
              </h2>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}>
                <div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '4px',
                  }}>
                    Professional Plan
                  </div>
                  <div style={{ fontSize: '14px', color: '#D8DDE3' }}>
                    Billed monthly • Next billing date: Dec 29, 2025
                  </div>
                </div>
                <Button variant="secondary">Manage Subscription</Button>
              </div>
            </div>
          </Card>

          {/* Billing Cycle Toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px',
          }}>
            <div style={{
              display: 'inline-flex',
              background: '#0A1E3F',
              border: '1px solid rgba(53, 226, 255, 0.3)',
              borderRadius: '8px',
              padding: '4px',
            }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '10px 24px',
                  background: billingCycle === 'monthly' ? 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                style={{
                  padding: '10px 24px',
                  background: billingCycle === 'yearly' ? 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
              >
                Yearly
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#3BFFB3',
                  color: '#0C0C0C',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  -17%
                </span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}>
            {plans.map((plan) => (
              <Card
                key={plan.id}
                style={{
                  position: 'relative',
                  border: plan.popular ? '2px solid #35E2FF' : undefined,
                  boxShadow: plan.popular ? '0 8px 24px rgba(53, 226, 255, 0.3)' : undefined,
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '6px 16px',
                    borderRadius: '6px',
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}>
                    {plan.name}
                  </h3>
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{
                      fontSize: '48px',
                      fontWeight: '700',
                      color: '#35E2FF',
                    }}>
                      ${getPrice(plan)}
                    </span>
                    <span style={{ fontSize: '16px', color: '#D8DDE3' }}>
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'grid',
                    gap: '12px',
                  }}>
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'start',
                          gap: '8px',
                          fontSize: '14px',
                          color: '#D8DDE3',
                        }}
                      >
                        <span style={{ color: '#3BFFB3', flexShrink: 0 }}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.id === currentPlan ? 'secondary' : 'primary'}
                    style={{ width: '100%' }}
                    disabled={plan.id === currentPlan}
                  >
                    {plan.id === currentPlan ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Payment Method */}
          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Payment Method
              </h2>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'rgba(53, 226, 255, 0.1)',
                border: '1px solid rgba(53, 226, 255, 0.3)',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '32px',
                    background: '#FFFFFF',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}>
                    💳
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                      •••• •••• •••• 4242
                    </div>
                    <div style={{ fontSize: '12px', color: '#D8DDE3' }}>
                      Expires 12/2026
                    </div>
                  </div>
                </div>
                <Button variant="secondary">Update</Button>
              </div>
            </div>
          </Card>

          {/* Billing History */}
          <Card>
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Billing History
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  { date: 'Nov 29, 2025', amount: 99, status: 'paid' },
                  { date: 'Oct 29, 2025', amount: 99, status: 'paid' },
                  { date: 'Sep 29, 2025', amount: 99, status: 'paid' },
                ].map((invoice, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      background: '#0A1E3F',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                        {invoice.date}
                      </div>
                      <div style={{ fontSize: '12px', color: '#D8DDE3' }}>
                        Invoice #INV-{1000 + idx}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
                        ${invoice.amount}
                      </div>
                      <span style={{
                        padding: '4px 12px',
                        background: 'rgba(59, 255, 179, 0.2)',
                        border: '1px solid #3BFFB3',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#3BFFB3',
                      }}>
                        {invoice.status.toUpperCase()}
                      </span>
                      <Button variant="ghost" style={{ padding: '8px' }}>
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Billing;
