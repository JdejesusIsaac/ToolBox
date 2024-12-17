// app/components/landing/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TeacherToolbox.ai</h3>
              <p className="text-gray-400">
                Empowering educators with AI-powered tools for better teaching.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-600">LinkedIn</a>
                <a href="#" className="hover:text-blue-500">Facebook</a>
              </div>
              <p className="mt-4 text-gray-400">
                Questions? Email us at:<br />
                <a href="mailto:support@teachertoolbox.ai" className="text-blue-400 hover:text-blue-300">
                  support@teachertoolbox.ai
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TeacherToolbox.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;