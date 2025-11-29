import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Perfect for individuals',
      monthlyPrice: 0,
      yearlyPrice: 20,
      features: [
        '10 videos per month',
        'Basic AI analysis',
        'Standard processing (5-10 min)',
        '7-day evidence retention',
        'Email support (48h response)',
        'PDF reports',
        'Web dashboard access',
      ],
      limitations: [
        'No API access',
        'No verification packs',
        'No priority support',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      tagline: 'For businesses & professionals',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        '100 videos per month',
        'Advanced AI analysis',
        'Fast processing (2-5 min)',
        '30-day evidence retention',
        'Priority email support (24h)',
        'Cryptographic verification packs',
        'Detailed forensic reports',
        'API access (1000 calls/day)',
        'Batch processing',
        'Custom branding on reports',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'For organizations at scale',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        'Unlimited videos',
        'Premium AI models',
        'Instant processing (<2 min)',
        'Unlimited evidence retention',
        '24/7 phone & email support',
        'Advanced verification packs',
        'Legal-grade forensic reports',
        'Unlimited API access',
        'Dedicated infrastructure',
        'Custom integrations',
        'On-premise deployment option',
        'Dedicated account manager',
        'SLA guarantee (99.9% uptime)',
        'Training & onboarding',
      ],
    },
  ];

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <main style={{ flex: 1, padding: '32px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '32px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#D8DDE3',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: '1.6',
          }}>
            Choose the plan that fits your needs. No hidden fees.
          </p>

          {/* Billing Cycle Toggle */}
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
                padding: '12px 32px',
                background: billingCycle === 'monthly' ? 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '16px',
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
                padding: '12px 32px',
                background: billingCycle === 'yearly' ? 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '16px',
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
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '4px',
              }}>
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 64px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
        }}>
          {plans.map((plan) => (
            <Card
              key={plan.id}
              style={{
                position: 'relative',
                border: plan.popular ? '2px solid #35E2FF' : undefined,
                boxShadow: plan.popular ? '0 12px 40px rgba(53, 226, 255, 0.3)' : undefined,
                transform: plan.popular ? 'scale(1.05)' : undefined,
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '700',
                  padding: '8px 24px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 12px rgba(53, 226, 255, 0.4)',
                }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{ padding: '32px' }}>
                {/* Plan Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px', paddingTop: plan.popular ? '12px' : '0' }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '24px' }}>
                    {plan.tagline}
                  </p>
                  <div>
                    <span style={{
                      fontSize: '56px',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      ${getPrice(plan)}
                    </span>
                    <span style={{ fontSize: '18px', color: '#D8DDE3' }}>
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div style={{ fontSize: '14px', color: '#3BFFB3', marginTop: '8px' }}>
                      ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)} savings per year
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div style={{ marginBottom: '24px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'start',
                          gap: '10px',
                          fontSize: '14px',
                          color: '#D8DDE3',
                        }}
                      >
                        <span style={{ color: '#3BFFB3', fontSize: '16px', flexShrink: 0 }}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, idx) => (
                      <li
                        key={`lim-${idx}`}
                        style={{
                          display: 'flex',
                          alignItems: 'start',
                          gap: '10px',
                          fontSize: '14px',
                          color: '#666',
                        }}
                      >
                        <span style={{ color: '#666', fontSize: '16px', flexShrink: 0 }}>✗</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  to="/register"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '14px',
                    background: plan.popular
                      ? 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)'
                      : 'transparent',
                    border: plan.popular ? 'none' : '1px solid #35E2FF',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '600',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.background = 'rgba(53, 226, 255, 0.1)';
                    }
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.background = 'transparent';
                    }
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {plan.id === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing.',
              },
              {
                q: 'Is there a free trial?',
                a: 'All paid plans include a 14-day free trial with full access to features. No credit card required to start.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfer for Enterprise plans.',
              },
              {
                q: 'What happens if I exceed my video limit?',
                a: 'You can purchase additional video credits or upgrade to a higher plan. We\'ll notify you before any overages occur.',
              },
              {
                q: 'Do you offer discounts for nonprofits or education?',
                a: 'Yes! We offer 30% discounts for verified nonprofits and educational institutions. Contact sales for details.',
              },
            ].map((faq, idx) => (
              <Card key={idx}>
                <div style={{ padding: '24px' }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginBottom: '12px',
                  }}>
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
