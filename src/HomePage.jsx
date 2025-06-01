import React, { useState } from 'react';
import { Truck, Users, Clock, BarChart3, CheckCircle, Shield, Zap, Phone, Mail, Menu, X, Eye, EyeOff } from 'lucide-react';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showPassword, setShowPassword] = useState(false);

  // Header component
  const Header = ({ currentPage: headerCurrentPage, setCurrentPage: headerSetCurrentPage }) => (
    <header className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">LogiTrack Pro</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`hover:text-blue-300 transition cursor-pointer ${currentPage === 'home' ? 'text-blue-300' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('features')}
              className={`hover:text-blue-300 transition cursor-pointer ${currentPage === 'features' ? 'text-blue-300' : ''}`}
            >
              Features
            </button>
            <button 
              onClick={() => setCurrentPage('pricing')}
              className={`hover:text-blue-300 transition cursor-pointer ${currentPage === 'pricing' ? 'text-blue-300' : ''}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`hover:text-blue-300 transition cursor-pointer ${currentPage === 'contact' ? 'text-blue-300' : ''}`}
            >
              Contact
            </button>
          </nav>
          <div className="flex space-x-4">
            <button 
              onClick={() => setCurrentPage('signin')}
              className="border border-blue-300 hover:bg-blue-300 hover:text-blue-900 px-4 py-2 rounded-lg font-semibold transition"
            >
              Sign In
            </button>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // Hero Section
  const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-green-300 bg-clip-text text-transparent">
          Streamline Your Fleet Operations
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Empower your logistics team with intelligent task management, real-time tracking, and comprehensive analytics designed for the modern transportation industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
          >
            Start Free Trial
          </button>
          <button className="border-2 border-blue-300 hover:bg-blue-300 hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );

  // Stats Section
  const StatsSection = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Active Companies</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
            <div className="text-gray-600">Drivers Managed</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Fleet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From driver management to real-time analytics, LogiTrack Pro provides all the tools necessary to optimize your logistics operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center hover:shadow-lg transition">
            <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Driver Management</h3>
            <p className="text-gray-600">
              Comprehensive driver profiles, performance tracking, and certification management in one centralized platform.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-8 text-center hover:shadow-lg transition">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Task Assignment</h3>
            <p className="text-gray-600">
              Intelligent task distribution, route optimization, and real-time updates to keep your operations running smoothly.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-8 text-center hover:shadow-lg transition">
            <BarChart3 className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Reporting</h3>
            <p className="text-gray-600">
              Detailed performance metrics, custom reports, and actionable insights to drive your business forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Driver Benefits Section
  const DriverBenefitsSection = () => (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Built for Drivers, Designed for Managers
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our intuitive interface ensures drivers can focus on the road while managers maintain complete visibility and control over operations.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Shield className="h-8 w-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Safety First</h3>
                  <p className="text-blue-100">Built-in safety protocols and compliance tracking</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Real-Time Updates</h3>
                  <p className="text-blue-100">Instant notifications and status updates</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Zap className="h-8 w-8 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Lightning Fast</h3>
                  <p className="text-blue-100">Optimized for speed and reliability</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg p-8 shadow-2xl">
              <div className="text-gray-900">
                <h3 className="text-2xl font-bold mb-4 text-center">Driver Mobile App</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-blue-900">Today's Routes</div>
                    <div className="text-sm text-blue-700">3 deliveries scheduled</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="font-semibold text-green-900">Vehicle Status</div>
                    <div className="text-sm text-green-700">All systems operational</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="font-semibold text-yellow-900">Messages</div>
                    <div className="text-sm text-yellow-700">2 new updates from dispatch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // CTA Section
  const CTASection = () => (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Logistics Operations?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join hundreds of logistics companies across the USA who trust LogiTrack Pro to manage their fleet operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
          >
            Start Your Free Trial
          </button>
          <button className="border-2 border-blue-300 hover:bg-blue-300 hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition">
            Schedule a Demo
          </button>
        </div>
        <p className="text-sm text-blue-200 mt-4">
          No credit card required • 30-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">LogiTrack Pro</span>
            </div>
            <p className="text-gray-400">
              Empowering logistics companies across the USA with intelligent task management solutions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setCurrentPage('features')} className="hover:text-white transition text-left">Features</button></li>
              <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-white transition text-left">Pricing</button></li>
              <li><a href="#" className="hover:text-white transition">API</a></li>
              <li><a href="#" className="hover:text-white transition">Integration</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-LOGITRACK</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@logitrackpro.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LogiTrack Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // Sign In Page
  const SignInPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Truck className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">LogiTrack Pro</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
            </div>

            <button 
              type="button"
              onClick={() => setCurrentPage('dashboard')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? 
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
              >
                Start free trial
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Page
  const DashboardPage = () => (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager Dashboard</h1>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
            <p className="text-gray-600 mb-8">
              This is where your main task management application would be loaded. 
              Here you can manage drivers, assign tasks, track progress, and analyze performance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Manage Drivers</h3>
                <p className="text-gray-600 text-sm">Add, edit, and track your driver profiles</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Assign Tasks</h3>
                <p className="text-gray-600 text-sm">Create and assign tasks to your drivers</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
                <p className="text-gray-600 text-sm">Track performance and generate reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Features Page
  const FeaturesPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Header headerCurrentPage={currentPage} headerSetCurrentPage={setCurrentPage} />
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Features</h1>
            <p className="text-xl text-gray-600">Everything you need to manage your fleet operations efficiently</p>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Real-time Fleet Tracking</h3>
                <p className="text-gray-600 text-lg">Monitor your entire fleet in real-time with GPS tracking, live updates, and comprehensive route monitoring for optimal efficiency.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Advanced Analytics</h3>
                <p className="text-gray-600 text-lg">Get detailed insights into driver performance, fuel efficiency, route optimization, and comprehensive business intelligence.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Mobile Application</h3>
                <p className="text-gray-600 text-lg">Native mobile apps for iOS and Android with offline capabilities, real-time synchronization, and intuitive user interface.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Pricing Page
  const PricingPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Header headerCurrentPage={currentPage} headerSetCurrentPage={setCurrentPage} />
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">Choose the plan that works best for your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Starter</h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">$29<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Up to 10 drivers</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Basic tracking</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Email support</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Mobile app access</li>
              </ul>
              <button 
                onClick={() => setCurrentPage('signin')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500 hover:shadow-xl transition relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Professional</h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">$79<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Up to 50 drivers</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Advanced analytics</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Priority support</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />API access</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Custom reports</li>
              </ul>
              <button 
                onClick={() => setCurrentPage('signin')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise</h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">Custom</div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Unlimited drivers</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Custom integrations</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Dedicated support</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />On-premise deployment</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />SLA guarantee</li>
              </ul>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Header headerCurrentPage={currentPage} headerSetCurrentPage={setCurrentPage} />
      <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">Ready to transform your logistics operations? Contact our team today.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">1-800-LOGITRACK</p>
                  <p className="text-sm text-gray-500">Monday - Friday, 8AM - 6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">support@logitrackpro.com</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mt-8">
                <h3 className="font-semibold text-gray-900 mb-3">Why Choose LogiTrack Pro?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>30-day free trial</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>No setup fees</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Cancel anytime</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Your Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fleet Size</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                  <option>Select fleet size</option>
                  <option>1-10 vehicles</option>
                  <option>11-50 vehicles</option>
                  <option>51-100 vehicles</option>
                  <option>100+ vehicles</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Tell us about your logistics needs..."
                ></textarea>
              </div>
              
              <button 
                type="button"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Render current page
if (currentPage === 'signin') return <SignInPage />;
if (currentPage === 'dashboard') return <DashboardPage />;
if (currentPage === 'features') return <FeaturesPage />;
if (currentPage === 'pricing') return <PricingPage />;
if (currentPage === 'contact') return <ContactPage />;

// Home page (default)
return (
  <div className="min-h-screen">
    <Header />
    <HeroSection />
    <StatsSection />
    <FeaturesSection />
    <DriverBenefitsSection />
    <CTASection />
    <Footer />
  </div>
);
};

export default HomePage;