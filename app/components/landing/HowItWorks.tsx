// app/components/landing/HowItWorks.tsx
const HowItWorks = () => {
    const steps = [
      {
        number: 1,
        title: 'Enter your prompt',
        description: 'Enter your topic, curriculum, or student data.',
        icon: '✍️',
      },
      {
        number: 2,
        title: 'AI Generation',
        description: 'Let AI generate content or analyze responses.',
        icon: '🤖',
      },
      {
        number: 3,
        title: 'Get Results',
        description: 'Download, share, or use the results immediately.',
        icon: '✅',
      },
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">Step {step.number}: {step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;