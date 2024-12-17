// app/components/landing/Features.tsx
const Features = () => {
    const features = [
      {
        title: 'AI-Generated Quizzes',
        description: 'Save time by creating tailored quizzes with ease.',
        icon: '📝', // Replace with actual icon component
      },
      {
        title: 'Slide Presentations in Seconds',
        description: 'Turn topics into professional slides effortlessly.',
        icon: '🎯', // Replace with actual icon component
      },
      {
        title: 'Student Gap Analysis',
        description: 'Identify and address content, skill, and comprehension gaps.',
        icon: '📊', // Replace with actual icon component
      },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features for Modern Educators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;