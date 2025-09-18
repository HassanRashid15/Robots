'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,140,0,0.1),transparent_50%)]"></div>
      
      {/* Canvas-based Connecting Dots Network */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas
          ref={(canvas) => {
            if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                interface Star {
                  x: number;
                  y: number;
                  radius: number;
                  vx: number;
                  vy: number;
                  pulsePhase: number;
                  baseRadius: number;
                }
                
                const stars: Star[] = [];
                const FPS = 60;
                
                // Responsive number of dots based on screen size
                const getNumStars = () => {
                  const width = window.innerWidth;
                  if (width < 768) return 40; // Mobile: 40 dots (doubled)
                  if (width < 1024) return 70; // Tablet: 70 dots (doubled)
                  if (width < 1280) return 90; // Small desktop: 90 dots (doubled)
                  return 120; // Large desktop: 120 dots (doubled)
                };
                
                let numStars = getNumStars();
                
                // Function to create stars
                const createStars = () => {
                  stars.length = 0; // Clear existing stars
                  numStars = getNumStars(); // Get current responsive count
                  
                  const rect = canvas.getBoundingClientRect();
                  
                  for (let i = 0; i < numStars; i++) {
                    const baseRadius = Math.random() * 1 + 1;
                    stars.push({
                      x: Math.random() * rect.width,
                      y: Math.random() * rect.height,
                      radius: baseRadius,
                      vx: Math.floor(Math.random() * 50) - 25,
                      vy: Math.floor(Math.random() * 50) - 25,
                      pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
                      baseRadius: baseRadius
                    });
                  }
                };
                
                
                // Responsive canvas sizing with proper DPI handling
                const resizeCanvas = () => {
                  const dpr = window.devicePixelRatio || 1;
                  const rect = canvas.getBoundingClientRect();
                  
                  // Set the actual size in memory (scaled to account for extra pixel density)
                  canvas.width = rect.width * dpr;
                  canvas.height = rect.height * dpr;
                  
                  // Scale the drawing context so everything will work at the higher ratio
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.scale(dpr, dpr);
                  }
                  
                  // Set the display size (css pixels)
                  canvas.style.width = rect.width + 'px';
                  canvas.style.height = rect.height + 'px';
                  
                  createStars(); // Regenerate stars for new screen size
                };
                
                // Initial setup
                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);
                
                const mouse = { x: 0, y: 0 };
                
                function distance(point1: { x: number; y: number }, point2: { x: number; y: number }): number {
                  const xs = point2.x - point1.x;
                  const ys = point2.y - point1.y;
                  return Math.sqrt(xs * xs + ys * ys);
                }
                
                
                function draw() {
                  if (!ctx || !canvas) return;
                  
                  const rect = canvas.getBoundingClientRect();
                  ctx.clearRect(0, 0, rect.width, rect.height);
                  ctx.globalCompositeOperation = "lighter";
                  
                  // Draw stars with pulsing effect
                  for (let i = 0; i < stars.length; i++) {
                    const s = stars[i];
                    const time = Date.now() * 0.002; // Slow down the animation
                    const pulse = Math.sin(time + s.pulsePhase) * 0.5 + 0.5; // 0 to 1
                    const currentRadius = s.baseRadius + (pulse * 1.5); // Pulsing radius
                    
                    // Create gradient for glow effect
                    const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, currentRadius * 2);
                    gradient.addColorStop(0, `rgba(30, 64, 175, ${0.8 + pulse * 0.2})`); // Brighter center
                    gradient.addColorStop(0.5, `rgba(30, 64, 175, ${0.4 + pulse * 0.3})`);
                    gradient.addColorStop(1, `rgba(30, 64, 175, 0)`);
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, currentRadius, 0, 2 * Math.PI);
                    ctx.fill();
                    
                    // Add a subtle stroke
                    ctx.strokeStyle = `rgba(30, 58, 138, ${0.6 + pulse * 0.4})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                  }
                  
                  // Draw connections
                  ctx.beginPath();
                  for (let i = 0; i < stars.length; i++) {
                    const starI = stars[i];
                    ctx.moveTo(starI.x, starI.y);
                    
                    // Connect to mouse if close
                    if (distance(mouse, starI) < 150) {
                      ctx.lineTo(mouse.x, mouse.y);
                    }
                    
                    // Connect to other stars if close
                    for (let j = 0; j < stars.length; j++) {
                      const starII = stars[j];
                      if (distance(starI, starII) < 150) {
                        ctx.lineTo(starII.x, starII.y);
                      }
                    }
                  }
                  ctx.lineWidth = 0.5;
                  ctx.strokeStyle = '#1e40af';
                  ctx.stroke();
                }
                
                function update() {
                  if (!canvas) return;
                  
                  const rect = canvas.getBoundingClientRect();
                  
                  // Update stars
                  for (let i = 0; i < stars.length; i++) {
                    const s = stars[i];
                    s.x += s.vx / FPS;
                    s.y += s.vy / FPS;
                    
                    if (s.x < 0 || s.x > rect.width) s.vx = -s.vx;
                    if (s.y < 0 || s.y > rect.height) s.vy = -s.vy;
                  }
                }
                
                function tick() {
                  draw();
                  update();
                  requestAnimationFrame(tick);
                }
                
                // Mouse move handler
                const handleMouseMove = (e: MouseEvent) => {
                  mouse.x = e.clientX;
                  mouse.y = e.clientY;
                };
                
                canvas.addEventListener('mousemove', handleMouseMove);
                tick();
                
                // Cleanup function
                return () => {
                  canvas.removeEventListener('mousemove', handleMouseMove);
                  window.removeEventListener('resize', resizeCanvas);
                };
              }
            }
          }}
          className="w-full h-full opacity-40"
          style={{ imageRendering: 'auto' }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-white">FUTURE</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    ROBOTICS
                  </span>
                  <br />
                  <span className="text-3xl md:text-5xl text-blue-400">IS HERE</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Experience the next generation of intelligent automation. 
                  Where artificial intelligence meets physical reality to create 
                  the robots of tomorrow.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 text-center overflow-hidden"
                >
                  <span className="relative z-10 angular-button">DISCOVER MORE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/products"
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 text-center"
                >
                  EXPLORE TECH
                </Link>
              </div>
            </div>

            {/* Right Side - Futuristic Robot Visual */}
            <div className="relative">
              <div className="relative">
                {/* Main Robot Container */}
                <div className="relative bg-gradient-to-br from-gray-800 to-black rounded-3xl p-8 shadow-2xl border border-gray-700">
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 blur-sm"></div>
                  
                  {/* Robot Head */}
                  <div className="relative z-10 flex flex-col items-center space-y-6">
                    <div className="relative">
                      {/* Robot Head */}
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-2 border-gray-600 relative overflow-hidden">
                        {/* Orange Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full"></div>
                        
                        {/* Eye/Display */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-lg">
                          <div className="w-full h-full bg-orange-400 rounded-full animate-pulse"></div>
                        </div>
                        
                        {/* Blue Accent Lights */}
                        <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>
                        <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
                      </div>
                      
                      {/* Neck/Connector */}
                      <div className="w-8 h-12 bg-gradient-to-b from-gray-600 to-gray-800 mx-auto mt-2 rounded-b-lg"></div>
                    </div>
                    
                    {/* Robot Body */}
                    <div className="w-40 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl border border-gray-600 relative overflow-hidden">
                      {/* Orange Side Glow */}
                      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-orange-500/40 to-transparent"></div>
                      
                      {/* Blue Side Glow */}
                      <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                      
                      {/* Control Panel */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded border border-gray-600">
                        <div className="flex justify-center items-center h-full space-x-1">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arms */}
                    <div className="flex justify-between w-full px-4">
                      <div className="w-16 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-l-lg border border-gray-600"></div>
                      <div className="w-16 h-8 bg-gradient-to-l from-gray-600 to-gray-800 rounded-r-lg border border-gray-600"></div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full opacity-60 animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Background Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-3xl blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Visual */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden bg-gray-900 p-8">
                {/* Futuristic Lab Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-80"></div>
                
                {/* Glowing Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-4 h-4 bg-blue-300 rounded-full animate-pulse"></div>
                
                {/* Robot Visual */}
                <div className="relative z-10 flex items-center justify-center h-80">
                  <div className="relative">
                    {/* Humanoid Robot */}
                    <div className="w-32 h-48 bg-gray-700 rounded-lg relative">
                      {/* Robot Head */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full">
                        <div className="absolute top-2 left-1 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-2 right-1 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Robot Body with Glowing Accents */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-400 rounded-full opacity-80"></div>
                      <div className="absolute top-12 left-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                      <div className="absolute top-12 right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full"></div>
                      <div className="absolute bottom-16 left-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                      <div className="absolute bottom-16 right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    
                    {/* Holographic Interface */}
                    <div className="absolute -right-8 top-8 w-16 h-16 border border-blue-400 rounded-lg opacity-60">
                      <div className="absolute inset-2 border border-blue-300 rounded opacity-40"></div>
                      <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Data Visualization */}
                    <div className="absolute -left-8 bottom-8 w-12 h-12 border border-blue-400 rounded-full opacity-50">
                      <div className="absolute inset-1 border border-blue-300 rounded-full opacity-30"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-6xl font-bold text-gray-600 tracking-wider">ABOUT US</h2>
                <h3 className="text-2xl font-semibold text-blue-400">Meet Robot Ravens</h3>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-white">REDEFINING</span>
                  <br />
                  <span className="text-orange-500">HUMAN-ROBOT</span>
                  <br />
                  <span className="text-white">COLLABORATION</span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Robot Ravens marks a bold step forward in robotics, blending advanced AI with human-inspired functionality. 
                  Built to assist with everyday, repetitive tasks, our cutting-edge robots bring a new level of precision, 
                  agility, and reliability to the world of automation. Our advanced neural network and sensor systems 
                  enable our robots to understand, navigate, and adapt to complex environments with human-like intuition.
                </p>
              </div>
              
              <div className="pt-4">
                <Link
                  href="/get-started"
                  className="inline-block angular-button text-white px-8 py-4 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  GET STARTED
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Robotics Solutions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine advanced technology with practical applications to deliver 
              robotics solutions that drive real business value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Our robots operate at unprecedented speeds, increasing productivity 
                and reducing operational costs by up to 40%.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Precision Accuracy</h3>
              <p className="text-gray-600">
                Advanced sensors and AI algorithms ensure 99.9% accuracy in all 
                operations, minimizing errors and waste.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Integration</h3>
              <p className="text-gray-600">
                Seamlessly integrate with existing systems and workflows using 
                our comprehensive API and IoT connectivity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-gray-600">
                Enterprise-grade security and 24/7 monitoring ensure your 
                operations run smoothly without interruption.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Eco-Friendly</h3>
              <p className="text-gray-600">
                Sustainable design and energy-efficient operations help reduce 
                your carbon footprint while maximizing efficiency.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock technical support and maintenance services 
                to keep your robotics systems running optimally.
              </p>
            </div>
          </div>
        </div>
      </section> */}


      {/* Features Section - Dark Theme */}
      <section className="py-20 bg-transparent relative z-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,140,0,0.05),transparent_50%)]"></div>
        
        {/* Vertical Orange Lines */}
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-orange-500/50 via-orange-500 to-orange-500/50"></div>
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-orange-500/50 via-orange-500 to-orange-500/50"></div>
        
        {/* Abstract Curved Line Graphic */}
        <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M10,80 Q30,20 50,50 T90,30"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-400"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-8xl md:text-9xl font-bold text-gray-600/30 tracking-wider mb-4">
              FEATURES
            </h2>
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Key Features</h3>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="text-white">ADVANCED AI AND </span>
              <span className="text-orange-500">PRECISION</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Robot Ravens incorporates leading AI technology and precise engineering to offer unparalleled functionality. Key features include
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-500 uppercase mb-4">HUMAN-LIKE DEXTERITY</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Designed with advanced actuators to handle delicate tasks or repetitive motions with ease and precision.
              </p>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                View More
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-500 uppercase mb-4">AUTONOMOUS LEARNING</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Capable of learning tasks through AI, Robot Ravens adapt over time for improved performance in various settings.
              </p>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                View More
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-500 uppercase mb-4">VISION & SENSOR ARRAY</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Advanced vision systems and sensor arrays provide comprehensive environmental awareness and navigation capabilities.
              </p>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                View More
              </button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-blue-400">300+</div>
              <div className="text-sm uppercase text-gray-400 tracking-wider">SATISFIED CLIENTS</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-orange-500">100+</div>
              <div className="text-sm uppercase text-gray-400 tracking-wider">SUCCESSFUL PROJECTS</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-blue-400">16 YEARS</div>
              <div className="text-sm uppercase text-gray-400 tracking-wider">WORK EXPERIENCE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-transparent relative z-10">
        {/* Background Curved Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path
              d="M0,100 Q300,50 600,150 T1200,100 L1200,0 L0,0 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-400"
            />
            <path
              d="M0,200 Q400,150 800,250 T1200,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-500"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-orange-400">Why Robot Ravens?</h2>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="text-white">EMPOWERING </span>
                  <span className="text-white font-extrabold">DAILY LIFE</span>
                  <br />
                  <span className="text-white">AND WORK</span>
                </h1>
              </div>
            </div>

            {/* Right Side - Description and CTA */}
            <div className="space-y-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                Robot Ravens is created to tackle time-consuming, monotonous tasks, freeing individuals and businesses to focus on what truly matters. From lifting heavy loads to assisting in service industries, Robot Ravens is designed to increase productivity, provide support, and transform efficiency.
              </p>
              
              <div className="pt-4">
                <Link
                  href="/get-started"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-medium text-gray-400 mb-4">Applications</h2>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">VERSATILE </span>
              <span className="text-orange-500">FUNCTIONALITY</span>
              <br />
              <span className="text-white">ACROSS INDUSTRIES</span>
            </h1>
          </div>

          {/* Application Cards */}
          <div className="space-y-20">
            {/* Card 01 - Healthcare */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="space-y-8 relative">
                {/* Large Number */}
                <div className="absolute -left-8 -top-8 text-9xl font-bold text-gray-600/20 select-none">
                  01
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-orange-500 leading-tight">
                    REVOLUTIONIZING HEALTHCARE WITH SAFE, RESPONSIVE PATIENT ASSISTANCE
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Robot Ravens aids in healthcare settings, assisting with patient mobility, supporting caregivers, and handling routine tasks. Its gentle, human-like motion ensures safe interactions in sensitive environments, while advanced sensors provide real-time monitoring capabilities.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25">
                    Connect Now
                  </button>
                </div>
              </div>

              {/* Right Side - Image Placeholder */}
              <div className="relative">
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700/50">
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                      </div>
                      <div className="text-gray-400 text-sm">Healthcare Robot</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 02 - Manufacturing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Image Placeholder */}
              <div className="relative lg:order-1">
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700/50">
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-gray-600 rounded-lg mx-auto flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
                      </div>
                      <div className="text-gray-400 text-sm">Manufacturing Robot</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8 relative lg:order-2">
                {/* Large Number */}
                <div className="absolute -right-8 -top-8 text-9xl font-bold text-gray-600/20 select-none">
                  02
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-orange-500 leading-tight">
                    PRECISION IN MANUFACTURING: STREAMLINING PRODUCTION WITH ROBOT RAVENS
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Robot Ravens enhances manufacturing by bringing precision and reliability to the assembly line. It performs repetitive tasks with consistent accuracy, improves production speeds, and reduces human error while maintaining the highest quality standards.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25">
                    Connect Now
                  </button>
                </div>
              </div>
            </div>

            {/* Card 03 - Retail & Service */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="space-y-8 relative">
                {/* Large Number */}
                <div className="absolute -left-8 -top-8 text-9xl font-bold text-gray-600/20 select-none">
                  03
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-orange-500 leading-tight">
                    ENHANCING RETAIL & SERVICE EFFICIENCY THROUGH INTELLIGENT SUPPORT
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Robot Ravens supports customer-facing operations in retail and service industries. It assists with stocking shelves, managing inventory, providing customer assistance, and handling routine tasks to free up staff for more complex interactions.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25">
                    Connect Now
                  </button>
                </div>
              </div>

              {/* Right Side - Image Placeholder */}
              <div className="relative">
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700/50">
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-gray-600 rounded-lg mx-auto flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                      </div>
                      <div className="text-gray-400 text-sm">Service Robot</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Join The Future */}
      <section className="py-20 relative z-10">
        {/* Orange Lines Above and Below */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl overflow-hidden border border-gray-700/50">
            {/* Background Robot Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-black/90">
              {/* Futuristic Robot Silhouette */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-10">
                <div className="relative w-full h-full">
                  {/* Robot Head */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-gray-600 rounded-full">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                  {/* Robot Body */}
                  <div className="absolute top-24 right-4 w-24 h-32 bg-gray-600 rounded-lg">
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full"></div>
                    <div className="absolute top-12 left-2 w-2 h-2 bg-orange-400 rounded-full"></div>
                    <div className="absolute top-12 right-2 w-2 h-2 bg-orange-400 rounded-full"></div>
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-400 rounded-full"></div>
                  </div>
                  {/* Robot Arms */}
                  <div className="absolute top-28 left-0 w-12 h-4 bg-gray-600 rounded-l-lg"></div>
                  <div className="absolute top-28 right-0 w-12 h-4 bg-gray-600 rounded-r-lg"></div>
                  {/* Robot Base */}
                  <div className="absolute bottom-0 right-8 w-20 h-8 bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center py-20 px-8">
              <div className="space-y-8">
                <h3 className="text-xl font-medium text-white">Join The Future</h3>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">BE PART OF THE </span>
                  <span className="text-orange-500">HUMAN-TECH</span>
                  <br />
                  <span className="text-white">EVOLUTION</span>
                </h1>
                
                <div className="pt-8">
                  <Link
                    href="/contact"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                  >
                    Connect Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
