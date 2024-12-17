// app/components/landing/Testimonials.tsx
const Testimonials = () => {
    const testimonials = [
      {
        quote: "TeacherToolbox has transformed the way I prepare lessons—it's a game changer!",
        author: "Sarah Johnson",
        role: "High School Teacher",
        rating: 5,
      },
      {
        quote: "I save hours every week using the quiz generator. Highly recommended!",
        author: "Michael Chen",
        role: "Middle School Teacher",
        rating: 5,
      },
      {
        quote: "The slide generator helps me create engaging presentations in minutes.",
        author: "Emily Rodriguez",
        role: "Elementary Teacher",
        rating: 5,
      },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Teachers Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="text-yellow-400 mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;