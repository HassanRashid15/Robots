import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Primary Footer Content */}
      <div className="relative ">
        {/* Angled overlay on left side */}
        
        <div className="relative  bg-red-200 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transform -skew-x-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transform skew-x-12 origin-top-right">
            {/* Brand/Logo Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white font-mono tracking-wider">
                  ROBOT
                </h2>
                <h2 className="text-2xl font-bold text-white font-mono tracking-wider">
                  RAVENS
                </h2>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                {/* Telegram Icon */}
                <a
                  href="#"
                  className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                
                {/* WhatsApp Icon */}
                <a
                  href="#"
                  className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
          </div>

            {/* Info Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-500 uppercase tracking-wide">INFO</h3>
            <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white hover:text-orange-400 transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white hover:text-orange-400 transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white hover:text-orange-400 transition-colors duration-200">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white hover:text-orange-400 transition-colors duration-200">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white hover:text-orange-400 transition-colors duration-200">
                    Contact Us
                  </Link>
                </li>
            </ul>
          </div>

            {/* Contact Us Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-500 uppercase tracking-wide">CONTACT US</h3>
            <ul className="space-y-3">
                <li className="text-white">
                  +1980 971-24-19
                </li>
                <li className="text-white">
                  RobotRavens@gmail.com
                </li>
            </ul>
          </div>

            {/* Find Us Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-500 uppercase tracking-wide">FIND US</h3>
            <ul className="space-y-3">
                <li className="text-white">
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </li>
                <li className="text-white">
                  Everyday from 10 am to 8 pm
                </li>
            </ul>
            </div>
          </div>
        </div>
        


  {/* Call to Action Section */}
  <div className=" py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white text-lg font-mono">
                IF YOU DIDN'T FIND THE PRODUCTS YOU ARE{' '}
                <span className="text-orange-500">INTERESTED</span> IN OR HAVE{' '}
                <span className="text-orange-500">QUESTIONS?</span>
              </p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25">
              Send Us Email
            </button>
          </div>
          </div>
        </div>

      {/* Copyright and Privacy Section */}
      <div className=" py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-2 md:mb-0">
              © 2023 - Copyright
            </div>
            <div className="text-gray-400 text-sm">
              Privacy
            </div>
          </div>
        </div>
      </div>

      </div>
    </footer>
  );
};

export default Footer;
