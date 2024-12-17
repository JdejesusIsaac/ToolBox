// app/components/landing/Pricing.tsx
const Pricing = () => {
    const plans = [
      {
        name: 'Free',
        price: '0',
        features: [
          '5 prompts/day',
          'Basic quiz generation',
          'Basic slide generation',
          'Community support',
        ],
        cta: 'Get Started',
        highlighted: false,
      },
      {
        name: 'Pro',
        price: '9.99',
        features: [
          '10 prompts/day',
          'Advanced quiz features',
          'Advanced slide features',
          'Priority support',
          'Analytics dashboard',
        ],
        cta: 'Try Pro',
        highlighted: true,
      },
      {
        name: 'Premium',
        price: '19.99',
        features: [
          'Unlimited prompts',
          'All Pro features',
          'Custom templates',
          'API access',
          'Dedicated support',
        ],
        cta: 'Go Premium',
        highlighted: false,
      },
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-6 ${
                  plan.highlighted
                    ? 'bg-blue-500 text-white shadow-xl scale-105'
                    : 'bg-white border shadow-lg'
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">
                  ${plan.price}
                  <span className="text-sm font-normal">/month</span>
                </p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-semibold ${
                    plan.highlighted
                      ? 'bg-white text-blue-500'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Pricing;