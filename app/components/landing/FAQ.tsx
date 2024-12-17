// app/components/landing/FAQ.tsx
// app/components/landing/FAQ.tsx
const FAQ = () => {
    const faqs = [
      {
        question: 'What is a prompt?',
        answer: 'A prompt is a request you make to the AI to generate content. This can be a topic for a quiz, presentation, or any other teaching material you need.',
      },

      {
        question: 'Is my data secure?',
        answer: 'Yes, we take data security seriously. All data is encrypted and we never share your information with third parties.',
      },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQ;