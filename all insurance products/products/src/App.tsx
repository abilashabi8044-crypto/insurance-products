import React, { useState, useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Heart,
  Shield,
  Car,
  Bike,
  Building,
  Grid,
  Phone,
  Headphones,
  IndianRupee,
  ChevronRight,
  ChevronDown,
  X,
  HeartPulse,
  Users,
  User,
  Zap,
  TrendingUp,
  Globe,
  Undo,
  CirclePercent,
  Compass,
  Briefcase,
  Gift,
  Home,
  Lock,
  LineChart,
  Check,
  Search,
  ShieldCheck,
  ShieldCog,
  Menu,
  ArrowRight,
  Star,
  FileText,
  CreditCard,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  MapPin,
  Play,
  Send,
} from 'lucide-react';
import familyImage from "../dist/family-hero1.png"
// Types for structural components
interface SubPlan {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

interface InsuranceCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  theme: string;
  subPlans: SubPlan[];
}

// Full product dataset matching the reference image
const categoriesData: InsuranceCategory[] = [
  {
    id: 'health-insurance',
    name: 'Health Insurance',
    description: 'Comprehensive health coverage for you & your family',
    icon: HeartPulse,
    theme: 'theme-health',
    subPlans: [
      { id: 'h1', name: 'Individual Health Insurance', icon: HeartPulse, description: 'Medical coverage for single individuals with comprehensive inpatient benefits.' },
      { id: 'h2', name: 'Family Health Insurance', icon: Users, description: 'Floater plan that covers the entire family under a single sum insured.' },
      { id: 'h3', name: 'Senior Citizen Health Insurance', icon: User, description: 'Specialized healthcare coverage for seniors aged 60 and above.' },
      { id: 'h4', name: 'Critical Illness Insurance', icon: Heart, description: 'Lump-sum payout upon detection of critical life-threatening conditions.' },
      { id: 'h5', name: 'Top-up & Super Top-up Health Insurance', icon: TrendingUp, description: 'Extra protection to cover high-cost claims beyond threshold limits.' }
    ]
  },
  {
    id: 'term-life',
    name: 'Term Insurance',
    description: "Secure your family's future with the right life cover",
    icon: Shield,
    theme: 'theme-life',
    subPlans: [
      { id: 'l1', name: 'Term Life Insurance', icon: Shield, description: 'Pure protection plan providing financial cover for a specified duration.' },
      { id: 'l2', name: 'Return of Premium Term Insurance', icon: Undo, description: 'Term insurance that returns 100% of paid premiums on maturity.' },
      { id: 'l3', name: 'Increasing Cover Term Insurance', icon: TrendingUp, description: 'Life cover that increases annually to cope with inflation and rising expenses.' },
      { id: 'l4', name: 'Online Term Insurance', icon: Globe, description: 'Affordable life plans that can be researched, configured, and bought online.' },
      { id: 'l5', name: 'Term Insurance for Women', icon: Users, description: 'Customized plans for women with lower premium rates and critical illness covers.' }
    ]
  },
  {
    id: 'car-insurance',
    name: 'Car Insurance',
    description: 'Protect your car with comprehensive coverage',
    icon: Car,
    theme: 'theme-car',
    subPlans: [
      { id: 'c1', name: 'Comprehensive Car Insurance', icon: Shield, description: 'Covers own-damage, theft, natural disasters, and third-party liabilities.' },
      { id: 'c2', name: 'Third Party Car Insurance', icon: Users, description: 'Mandatory standard coverage protecting against damages to third-party assets/persons.' },
      { id: 'c3', name: 'Zero Depreciation Car Insurance', icon: CirclePercent, description: 'Ensures no depreciation is deducted from car part replacement values during claims.' },
      { id: 'c4', name: 'Engine Protection Cover', icon: Zap, description: 'Covers repair costs for damage caused to the engine and gearbox due to water ingress.' },
      { id: 'c5', name: 'Roadside Assistance Cover', icon: Compass, description: '24/7 assistance for towing, flat tires, emergency fuel delivery, and minor repairs.' }
    ]
  },
  {
    id: 'bike-insurance',
    name: 'Bike Insurance',
    description: 'Two wheeler insurance that keeps you ride-ready',
    icon: Bike,
    theme: 'theme-bike',
    subPlans: [
      { id: 'b1', name: 'Comprehensive Bike Insurance', icon: Bike, description: 'Full-scope coverage protecting against own damage, theft, and third-party liability.' },
      { id: 'b2', name: 'Third Party Bike Insurance', icon: Users, description: 'Mandatory basic policy protecting against damage or injury caused to other people.' },
      { id: 'b3', name: 'Zero Depreciation Bike Insurance', icon: CirclePercent, description: 'Receive full claim payouts without deductions for depreciation of rubber, fiber, and metal.' },
      { id: 'b4', name: 'Personal Accident Cover', icon: Shield, description: 'Lump-sum compensation for the owner-driver in case of accidental permanent injury.' },
      { id: 'b5', name: 'Return to Invoice Cover', icon: Undo, description: 'Receive the full invoice price of your two-wheeler in case of total loss or theft.' }
    ]
  },
  {
    id: 'corporate-insurance',
    name: 'Corporate Insurance',
    description: 'Group health, term & other employee benefit solutions',
    icon: Building,
    theme: 'theme-corporate',
    subPlans: [
      { id: 'corp1', name: 'Group Health Insurance', icon: Heart, description: 'Medical insurance plans tailored for employees and their dependents.' },
      { id: 'corp2', name: 'Group Term Insurance', icon: Shield, description: 'Life insurance benefits offered to all employees of an organization under a single contract.' },
      { id: 'corp3', name: 'Group Personal Accident Insurance', icon: Shield, description: '24/7 worldwide accident protection program for employees.' },
      { id: 'corp4', name: 'Employee Benefits Insurance', icon: Gift, description: 'Broad package covering gratuity, superannuation, and welfare schemes.' },
      { id: 'corp5', name: 'Business Insurance Solutions', icon: Briefcase, description: 'Protects business premises, machinery, and liabilities against operational hazards.' }
    ]
  },
  {
    id: 'other-insurance',
    name: 'View All Products',
    description: 'Explore our wide range of insurance solutions',
    icon: Grid,
    theme: 'theme-other',
    subPlans: [
      { id: 'o1', name: 'Personal Accident Insurance', icon: Shield, description: 'Standalone accident protection offering compensation for death or disability.' },
      { id: 'o2', name: 'Travel Insurance', icon: Globe, description: 'Ensures travel safety with medical emergency, trip cancellation, and lost baggage cover.' },
      { id: 'o3', name: 'Home Insurance', icon: Home, description: 'Safeguards your home structures and contents from fire, burglary, and natural calamities.' },
      { id: 'o4', name: 'Cyber Insurance', icon: Lock, description: 'Covers financial losses arising from data breaches, hacking, ransomware, and identity theft.' },
      { id: 'o5', name: 'Mutual Fund Investment', icon: LineChart, description: 'Diverse wealth-building investment options to secure long-term financial goals.' }
    ]
  }
];

// Testimonials data
const testimonialsData = [
  {
    id: 1,
    text: 'Great experience with Policynation. Their advisor explained everything clearly and helped me choose the right plan. Claims support was excellent!',
    name: 'Rohit Sharma',
    city: 'Mumbai',
  },
  {
    id: 2,
    text: 'They guided me during my hospitalization claim and the process was smooth and hassle-free.',
    name: 'Neha Verma',
    city: 'Bangalore',
  },
  {
    id: 3,
    text: 'All my policies are in one place in their policy vault. Renewal reminders are very helpful.',
    name: 'Amit Patel',
    city: 'Ahmedabad',
  },
];

export default function App() {
  // UI Interaction States
  const [activeCategory, setActiveCategory] = useState<string>('health-insurance');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'products'>('home');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleExploreProducts = () => {
    setCurrentPage('products');
    setIsMobileMenuOpen(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [isSuccessScreen, setIsSuccessScreen] = useState<boolean>(false);
  const [selectedSubPlan, setSelectedSubPlan] = useState<SubPlan | null>(null);


  // Form states for Advisor callback
  const [advisorForm, setAdvisorForm] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'General Inquiry',
    time: 'As soon as possible'
  });

  // Track sections for scroll spying
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Smooth scroll handler for sidebar category navigation
  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 104; // offset height for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll spy hook to highlight category as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset buffer

      for (const category of categoriesData) {
        const el = sectionRefs.current[category.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form handler
  const handleAdvisorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorForm.name || !advisorForm.phone) {
      alert('Please fill out Name and Phone number.');
      return;
    }
    setIsSuccessScreen(true);
  };

  const handleAdvisorClick = (categoryName?: string) => {
    setAdvisorForm(prev => ({
      ...prev,
      category: categoryName || 'General Inquiry'
    }));
    setIsSuccessScreen(false);
    setIsAdvisorModalOpen(true);
  };

  // Filter plans based on search query
  const filteredCategories = categoriesData.map(cat => {
    const matchedPlans = cat.subPlans.filter(
      plan => plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      subPlans: matchedPlans
    };
  }).filter(cat => cat.subPlans.length > 0);

  return (
    <div className="app-layout">
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HEADER / NAVBAR                                                    */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <header className="header-wrapper">
        <div className="container header-container">
          <div className="logo-section" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer' }}>
            <div className="logo-badge">pn</div>
            policy<span>nation</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation & Contact Section Container */}
          <div className={`header-menu-container ${isMobileMenuOpen ? 'open' : ''}`}>
            <nav>
              <ul className="nav-links">
                <li className="nav-item">
                  <button type="button" className="nav-link-button" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  Insurance <ChevronDown size={14} />
                  <div className="nav-dropdown">
                    {categoriesData.slice(0, 5).map(cat => (
                      <a key={cat.id} onClick={() => { handleExploreProducts(); setIsMobileMenuOpen(false); }} className="dropdown-link">
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="nav-item">
                  Corporate Solutions <ChevronDown size={14} />
                  <div className="nav-dropdown">
                    <a className="dropdown-link">Group Health Policy</a>
                    <a className="dropdown-link">Keyman Insurance</a>
                    <a className="dropdown-link">Liability Insurance</a>
                  </div>
                </li>
                <li className="nav-item">
                  Claims Support
                </li>
                <li className="nav-item">
                  Renewal Support
                </li>
                <li className="nav-item">
                  Resources <ChevronDown size={14} />
                  <div className="nav-dropdown">
                    <a className="dropdown-link">Premium Calculators</a>
                    <a className="dropdown-link">Knowledge Center</a>
                    <a className="dropdown-link">Insurance FAQs</a>
                  </div>
                </li>
              </ul>
            </nav>

            <div className="contact-section">
              <div className="phone-card">
                <div className="phone-icon-wrapper">
                  <Phone size={18} />
                </div>
                <div className="phone-details">
                  <span className="phone-number">1800 123 9099</span>
                  <span className="phone-hours">Mon-Sat: 10AM - 7PM</span>
                </div>
              </div>

              <button className="btn-advisor" onClick={() => { handleAdvisorClick(); setIsMobileMenuOpen(false); }}>
                Talk to an Advisor
                <Headphones size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentPage === 'home' ? (
          <>
            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 2. HERO SECTION                                                       */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <section className="pn-hero">
              <div className="container pn-hero-inner">
                <div className="pn-hero-left">
                  <h1 className="pn-hero-title">
                    Insurance Made Simpler.<br />
                    <span className="pn-hero-bold">Human Help When You<br />Need It Most.</span>
                  </h1>
                  <p className="pn-hero-desc">
                    Compare plans from 50+ insurers, pay securely directly to the insurer and get expert guidance at every step.
                  </p>
                  <div className="pn-hero-buttons">
                    <button className="btn-hero-primary" onClick={handleExploreProducts}>
                      Compare Plans Now <ArrowRight size={18} />
                    </button>
                    <button className="btn-hero-secondary" onClick={() => handleAdvisorClick()}>
                      Talk to an Advisor <Headphones size={18} />
                    </button>
                  </div>

                  {/* Trust Badges Row */}
                  <div className="pn-hero-trust-badges">
                    <div className="trust-badge-item">
                      <ShieldCheck size={18} />
                      <div>
                        <strong>IRDAI</strong>
                        <span>Licensed Broker</span>
                      </div>
                    </div>
                    <div className="trust-badge-item">
                      <Award size={18} />
                      <div>
                        <strong>50+</strong>
                        <span>Insurance Partners</span>
                      </div>
                    </div>
                    <div className="trust-badge-item">
                      <IndianRupee size={18} />
                      <div>
                        <strong>Direct Payment</strong>
                        <span>to Insurer</span>
                      </div>
                    </div>
                    <div className="trust-badge-item">
                      <Headphones size={18} />
                      <div>
                        <strong>Claims Assistance</strong>
                        <span>Included</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pn-hero-right">
                    <div className="pn-hero-image-wrapper">
                    <img src={familyImage} alt="Happy family protected by PolicyNation insurance" className="pn-hero-family-img" />
                  </div>  

                  {/* Floating premium info card */}
                  <div className="pn-premium-card">
                    <div className="pn-premium-card-header">
                      <div className="pn-premium-logo">pn</div>
                      <div>
                        <strong>Your Premium Goes<br />Directly To The Insurer</strong>
                      </div>
                    </div>
                    <p className="pn-premium-desc">
                      We do not hold your premium. Payments are made securely to the insurer through UPI, Cards or Net Banking.
                    </p>
                    <div className="pn-premium-features">
                      <span><Check size={14} /> Transparent</span>
                      <span><Check size={14} /> Secure</span>
                      <span><Check size={14} /> Faster Policy Issuance</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 3. STATS BAR                                                          */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <section className="pn-stats-bar">
              <div className="container pn-stats-inner">
                <div className="pn-stat-item">
                  <Users size={24} />
                  <div>
                    <strong>50,000+</strong>
                    <span>Happy Customers</span>
                  </div>
                </div>
                <div className="pn-stat-divider" />
                <div className="pn-stat-item">
                  <Headphones size={24} />
                  <div>
                    <strong>1,200+</strong>
                    <span>POS Advisors</span>
                  </div>
                </div>
                <div className="pn-stat-divider" />
                <div className="pn-stat-item">
                  <ShieldCheck size={24} />
                  <div>
                    <strong>50+</strong>
                    <span>Insurance Companies</span>
                  </div>
                </div>
                <div className="pn-stat-divider" />
                <div className="pn-stat-item">
                  <Clock size={24} />
                  <div>
                    <strong>12+</strong>
                    <span>Years in Business</span>
                  </div>
                </div>
                <div className="pn-stat-divider" />
                <div className="pn-stat-item">
                  <IndianRupee size={24} />
                  <div>
                    <strong>₹500+ Cr</strong>
                    <span>Premium Facilitated</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 4. INSURANCE FOR EVERY NEED                                           */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <section className="pn-insurance-section">
              <div className="container">
                <h2 className="pn-section-title">Insurance For Every Need</h2>
                <div className="pn-insurance-grid">
                  {categoriesData.map(cat => {
                    const CatIcon = cat.icon;
                    const themeColors: { [key: string]: { bg: string; color: string; border: string } } = {
                      'theme-health': { bg: '#fff0f1', color: '#e63946', border: '#ffd1d4' },
                      'theme-life': { bg: '#f0f6ff', color: '#007aff', border: '#cce0ff' },
                      'theme-car': { bg: '#edf9f0', color: '#2b9348', border: '#c7ebcf' },
                      'theme-bike': { bg: '#fff8f0', color: '#f77f00', border: '#ffe2cc' },
                      'theme-corporate': { bg: '#f4f0ff', color: '#8338ec', border: '#e2d4ff' },
                      'theme-other': { bg: '#f0f6ff', color: '#007aff', border: '#cce0ff' },
                    };
                    const colors = themeColors[cat.theme] || themeColors['theme-health'];
                    return (
                      <div
                        key={cat.id}
                        className="pn-insurance-card"
                        style={{ borderColor: colors.border }}
                        onClick={handleExploreProducts}
                      >
                        <div className="pn-ins-card-icon" style={{ backgroundColor: colors.bg, color: colors.color }}>
                          <CatIcon size={28} />
                        </div>
                        <h3>{cat.name}</h3>
                        <p>{cat.description}</p>
                        <a className="pn-ins-card-link" style={{ color: colors.color }}>
                          {cat.id === 'other-insurance' ? 'Explore All' : cat.id === 'corporate-insurance' ? 'Explore Solutions' : 'Compare Plans'} <ArrowRight size={14} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 5. WHY CHOOSE POLICYNATION                                            */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <section className="pn-why-section">
              <div className="container">
                {/* <h2 className="pn-section-title">Why Choose Policynation?</h2> */}
                <div className="pn-why-grid">
                  {/* Comparison Table */}
                  <div className="pn-comparison-card">
                     <h2 className="pn-section-title">Why Choose Policynation?</h2>
                    <div className="pn-comparison-header">
                      <div className="pn-comparison-col-header">Others</div>
                      <div className="pn-comparison-col-header pn-brand-header">
                        <div className="pn-comparison-logo">pn</div>
                        <span>policy<strong>nation</strong></span>
                      </div>
                    </div>
                    <div className="pn-comparison-body">
                      <div className="pn-comparison-row">
                        <div className="pn-compare-left"><XCircle size={16} className="icon-red" /> Self-service only</div>
                        <div className="pn-compare-right"><CheckCircle size={16} className="icon-green" /> Human advisor support</div>
                      </div>
                      <div className="pn-comparison-row">
                        <div className="pn-compare-left"><XCircle size={16} className="icon-red" /> Buy and forget</div>
                        <div className="pn-compare-right"><CheckCircle size={16} className="icon-green" /> Renewal tracking & reminders</div>
                      </div>
                      <div className="pn-comparison-row">
                        <div className="pn-compare-left"><XCircle size={16} className="icon-red" /> Limited claim help</div>
                        <div className="pn-compare-right"><CheckCircle size={16} className="icon-green" /> Dedicated claim support</div>
                      </div>
                      <div className="pn-comparison-row">
                        <div className="pn-compare-left"><XCircle size={16} className="icon-red" /> Documents scattered</div>
                        <div className="pn-compare-right"><CheckCircle size={16} className="icon-green" /> Policy vault – All documents in one place</div>
                      </div>
                      <div className="pn-comparison-row">
                        <div className="pn-compare-left"><XCircle size={16} className="icon-red" /> Generic recommendations</div>
                        <div className="pn-compare-right"><CheckCircle size={16} className="icon-green" /> Personalized advice for your needs</div>
                      </div>
                    </div>
                  </div>

                  {/* Claims Buddy Card */}
                  <div className="pn-claims-buddy-card">
                    <div className="pn-claims-buddy-content">
                      <h3>Claims Buddy – We're With You Always</h3>
                      <p>We don't disappear after policy purchase. Our team assists you through:</p>
                      <div className="pn-claims-features">
                        <span><CheckCircle size={14} className="icon-green" /> Cashless Claims</span>
                        <span><CheckCircle size={14} className="icon-green" /> Escalation Support</span>
                        <span><CheckCircle size={14} className="icon-green" /> Reimbursement Claims</span>
                        <span><CheckCircle size={14} className="icon-green" /> Grievance Support</span>
                        <span><CheckCircle size={14} className="icon-green" /> Documentation Guidance</span>
                      </div>
                      <button className="btn-claims-support" onClick={() => handleAdvisorClick('Claims Support')}>
                        Know More About Claims Support <ArrowRight size={16} />
                      </button>
                    </div>
                    <div className="pn-claims-buddy-image">
                      <img src="/claims-support.png" alt="Claims support representative" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 6. TESTIMONIALS + PARTNER INSURERS                                    */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <section className="pn-testimonials-section">
              <div className="container">
                <div className="pn-testimonials-grid">
                  {/* Google Rating */}
                  <div className="pn-google-rating">
                    <div className="pn-google-logo">
                      <span className="g-blue">G</span>
                      <span className="g-red">o</span>
                      <span className="g-yellow">o</span>
                      <span className="g-blue">g</span>
                      <span className="g-green">l</span>
                      <span className="g-red">e</span>
                    </div>
                    <div className="pn-google-score">4.8/5</div>
                    <div className="pn-google-stars">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span className="pn-google-reviews">Based on 300+ Reviews</span>
                  </div>

                  {/* Testimonials */}
                  {testimonialsData.map(t => (
                    <div key={t.id} className="pn-testimonial-card">
                      <div className="pn-testimonial-stars">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <p className="pn-testimonial-text">"{t.text}"</p>
                      <div className="pn-testimonial-author">
                        <div className="pn-testimonial-avatar">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <strong>{t.name}</strong>
                          <span><MapPin size={12} /> {t.city}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Partner Insurers */}
                  <div className="pn-partner-logos">
                    <div className="pn-partner-logo-item">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/01/Star_Health_Insurance_Logo.png"
                        alt="Star Health"
                      />
                    </div>

                    <div className="pn-partner-logo-item">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5f/HDFC_ERGO_General_Insurance_Company_logo.png"
                        alt="HDFC Ergo"
                      />
                    </div>

                    <div className="pn-partner-logo-item">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7f/ICICI_Lombard_logo.png"
                        alt="ICICI Lombard"
                      />
                    </div>

                    <div className="pn-partner-logo-item">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/32/Bajaj_Allianz_logo.png"
                        alt="Bajaj Allianz"
                      />
                    </div>
                  </div>

                  <a className="pn-partner-more">+ 46 More Insurers</a>
                  {/* <div className="pn-partner-insurers">
                    <h4>Our Partner Insurers</h4>
                    <div className="pn-partner-logos">
                      <div className="pn-partner-logo-item">Star Health</div>
                      <div className="pn-partner-logo-item">HDFC Ergo</div>
                      <div className="pn-partner-logo-item">ICICI Lombard</div>
                      <div className="pn-partner-logo-item">Bajaj Allianz</div>
                    </div>
                    <a className="pn-partner-more">+ 46 More Insurers</a>
                  </div> */}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 7. HOW IT WORKS                                                       */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <section className="pn-how-section">
              <div className="container">
                <h2 className="pn-section-title">How It Works</h2>
                <div className="pn-how-grid">
                  {[
                    { step: 1, icon: Search, title: 'Compare Plans', desc: 'Compare plans from 50+ insurers' },
                    { step: 2, icon: FileText, title: 'Select Coverage', desc: 'Choose the plan that fits your needs' },
                    { step: 3, icon: CreditCard, title: 'Pay Securely', desc: 'Make payment directly to the Insurer' },
                    { step: 4, icon: Mail, title: 'Receive Policy', desc: 'Get your policy instantly on email & SMS' },
                    { step: 5, icon: Headphones, title: 'Lifetime Support', desc: 'Get renewal, policy & claim support always' },
                  ].map((item, idx, arr) => {
                    const StepIcon = item.icon;
                    return (
                      <React.Fragment key={item.step}>
                        <div className="pn-how-step">
                          <div className="pn-how-step-icon">
                            <StepIcon size={24} />
                            <span className="pn-how-step-number">{item.step}</span>
                          </div>
                          <h4>{item.title}</h4>
                          <p>{item.desc}</p>
                        </div>
                        {idx < arr.length - 1 && (
                          <div className="pn-how-step-arrow">
                            <ArrowRight size={20} />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 8. CTA BANNER - FREE INSURANCE CHECKUP                                */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <section className="pn-cta-section">
              <div className="container">
                <div className="pn-cta-banner">
                  <div className="pn-cta-icon">
                    <ShieldCheck size={48} />
                  </div>
                  <div className="pn-cta-content">
                    <h2>Are You Underinsured?</h2>
                    <h3>Get a Free Insurance Checkup</h3>
                    <p>Take a 2-minute assessment and find out if your coverage is enough for you and your family.</p>
                  </div>
                  <div className="pn-cta-action">
                    <button className="btn-cta-primary" onClick={() => handleAdvisorClick()}>
                      Check My Coverage Now <ArrowRight size={18} />
                    </button>
                    <span className="pn-cta-note">It's Free. No Spam. 100% Secure.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════════ */}
            {/* 9. FOOTER                                                             */}
            {/* ══════════════════════════════════════════════════════════════════════ */}
            <footer className="pn-footer">
              <div className="container">
                <div className="pn-footer-grid">
                  {/* Column 1 - Brand */}
                  <div className="pn-footer-brand">
                    <div className="pn-footer-logo">
                      <div className="logo-badge">pn</div>
                      <span>policy<strong>nation</strong></span>
                    </div>
                    <p>Policynation is an IRDAI licensed insurance broker committed to making insurance simple, transparent and people friendly.</p>
                    <span className="pn-footer-license">IRDAI License No. 595</span>
                    <div className="pn-footer-socials">
                      <a href="#"><Mail size={18} /></a>
                    </div>
                  </div>

                  {/* Column 2 - Insurance */}
                  <div className="pn-footer-links">
                    <h4>Insurance</h4>
                    <a href="#">Health Insurance</a>
                    <a href="#">Term Insurance</a>
                    <a href="#">Car Insurance</a>
                    <a href="#">Bike Insurance</a>
                    <a href="#">Travel Insurance</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleExploreProducts(); }}>View All Products</a>
                  </div>

                  {/* Column 3 - Corporate Solutions */}
                  <div className="pn-footer-links">
                    <h4>Corporate Solutions</h4>
                    <a href="#">Group Health Insurance</a>
                    <a href="#">Group Term Insurance</a>
                    <a href="#">Group Personal Accident</a>
                    <a href="#">Employee Benefits</a>
                    <a href="#">POSP / Become Advisor</a>
                  </div>

                  {/* Column 4 - Support */}
                  <div className="pn-footer-links">
                    <h4>Support</h4>
                    <a href="#">Claims Support</a>
                    <a href="#">Renewal Support</a>
                    <a href="#">Policy Vault</a>
                    <a href="#">FAQs</a>
                    <a href="#">Contact Us</a>
                  </div>

                  {/* Column 5 - Resources */}
                  <div className="pn-footer-links">
                    <h4>Resources</h4>
                    <a href="#">Insurance Guide</a>
                    <a href="#">Blogs</a>
                    <a href="#">Calculators</a>
                    <a href="#">Glossary</a>
                    <a href="#">News</a>
                  </div>

                  {/* Column 6 - Newsletter */}
                  <div className="pn-footer-newsletter">
                    <h4>Stay Updated</h4>
                    <p>Get the latest insurance tips and offers straight to your inbox.</p>
                    <div className="pn-newsletter-form">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                      />
                      <button><Send size={16} /></button>
                    </div>
                  </div>
                </div>

                {/* Footer Bottom */}
                <div className="pn-footer-bottom">
                  <p>© 2024 Policynation Insurance Brokers Private Limited. All Rights Reserved.</p>
                  <div className="pn-footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Disclaimer</a>
                  </div>
                </div>
              </div>
            </footer>
          </>
        ) : (<>
          {/* ════════════════════════════════════════════════════════════════════ */}
          {/* PRODUCTS PAGE (existing)                                            */}
          {/* ════════════════════════════════════════════════════════════════════ */}
          <div className="container">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
              {/* <span className="breadcrumb-item" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>Home</span>
              <span className="breadcrumb-separator"><ChevronRight size={12} /></span>
              <span className="breadcrumb-item">Insurance</span>
              <span className="breadcrumb-separator"><ChevronRight size={12} /></span>
              <span className="breadcrumb-item active">All Products</span> */}
            </div>

            {/* Hero Section */}
            <section className="hero-header">
              <h1 className="hero-title">All Insurance Products</h1>
              <p className="hero-subtitle">Explore our wide range of insurance solutions and find the perfect plan for you.</p>

              {/* Dynamic Search Bar */}
              <div style={{
                display: 'flex',
                maxWidth: '500px',
                margin: '24px auto 0 auto',
                position: 'relative'
              }}>
                <input
                  type="text"
                  placeholder="Search for plans, covers or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-body)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
                <Search size={18} className="text-muted" style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }} />
                {searchQuery && (
                  <X size={18} onClick={() => setSearchQuery('')} style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)'
                  }} />
                )}
              </div>
            </section>

            {/* 2. TRUST / FEATURES BANNER */}
            <section className="trust-banner">
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <ShieldCheck size={22} />
                </div>
                <div className="trust-details">
                  <span className="trust-title">50+ Insurance Partners</span>
                  <span className="trust-desc">Wide range of plans</span>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-wrapper" style={{ backgroundColor: '#ecfdf5' }}>
                  <IndianRupee size={22} style={{ color: '#059669' }} />
                </div>
                <div className="trust-details">
                  <span className="trust-title">Direct Payment to Insurer</span>
                  <span className="trust-desc">100% secure transactions</span>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-wrapper" style={{ backgroundColor: '#fffbeb' }}>
                  <Headphones size={22} style={{ color: '#d97706' }} />
                </div>
                <div className="trust-details">
                  <span className="trust-title">Claims Assistance</span>
                  <span className="trust-desc">We're with you, always</span>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-wrapper" style={{ backgroundColor: '#f5f3ff' }}>
                  <ShieldCog size={22} style={{ color: '#7c3aed' }} />
                </div>
                <div className="trust-details">
                  <span className="trust-title">IRDAI Licensed Broker</span>
                  <span className="trust-desc">Your trust, our responsibility</span>
                </div>
              </div>
            </section>

            {/* 3. MAIN WORKSPACE GRID */}
            <div className="main-grid">
              {/* Left Sidebar */}
              <aside className="sidebar-sticky">
                <div className="browse-card">
                  <h2 className="browse-title">Browse by Category</h2>
                  <ul className="category-nav-list">
                    {categoriesData.map(cat => {
                      const CatIcon = cat.icon;
                      return (
                        <li
                          key={cat.id}
                          className={`category-nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                        >
                          <button onClick={() => scrollToCategory(cat.id)}>
                            <span>
                              <div className="icon-wrapper">
                                <CatIcon size={18} />
                              </div>
                              {cat.name}
                            </span>
                            <ChevronRight size={14} className="chevron" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Sidebar Callout Card */}
                <div className="sidebar-callout">
                  <div className="callout-icon">
                    <Headphones size={26} />
                  </div>
                  <p className="callout-text">Not sure which insurance is right for you?</p>
                  <a href="#" className="callout-link" onClick={(e) => { e.preventDefault(); handleAdvisorClick(); }}>
                    Talk to an Advisor <ChevronRight size={14} />
                  </a>
                </div>
              </aside>

              {/* Right Content Area — All Categories in One Container */}
              <section className="product-sections-container">
                <div className="all-categories-card">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((cat, index) => {
                      const CatIcon = cat.icon;
                      return (
                        <div
                          key={cat.id}
                          className={`category-row ${cat.theme} ${index < filteredCategories.length - 1 ? 'has-divider' : ''}`}
                          id={cat.id}
                          ref={(el) => { sectionRefs.current[cat.id] = el; }}
                        >
                          {/* Category Label Block */}
                          <div className="category-block">
                            <div className="category-badge-circle" style={{
                              backgroundColor: `var(--theme-color-light)`,
                              color: `var(--theme-color-primary)`
                            }}>
                              <CatIcon size={28} />
                            </div>
                            <h3 className="category-name">{cat.name}</h3>
                            <p className="category-desc">{cat.description}</p>
                          </div>

                          {/* Sub-plans Cards — horizontal flow */}
                          <div className="subplans-row">
                            {cat.subPlans.map(plan => {
                              const PlanIcon = plan.icon;
                              return (
                                <div
                                  key={plan.id}
                                  className="subplan-card"
                                  onClick={() => setSelectedSubPlan(plan)}
                                >
                                  <div className="subplan-icon-wrapper" style={{
                                    backgroundColor: `var(--theme-color-light)`,
                                    color: `var(--theme-color-primary)`
                                  }}>
                                    <PlanIcon size={16} />
                                  </div>
                                  <span className="subplan-name">{plan.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="empty-search-state">
                      <Search size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }} />
                      <h3 style={{ marginBottom: '8px' }}>No plans match your search</h3>
                      <p style={{ color: 'var(--color-text-muted)' }}>Try checking your spelling or searching for another keyword.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* 4. BOTTOM BANNER */}
            <section className="bottom-banner">
              <div className="bottom-banner-left">
                <div className="bottom-banner-icon">
                  <Headphones size={32} />
                </div>
                <div className="bottom-banner-info">
                  <h3>Still need help finding the right insurance?</h3>
                  <p>Our expert advisors are here to guide you and help you choose the best plan.</p>
                </div>
              </div>

              <button className="btn-bottom-advisor" onClick={() => handleAdvisorClick()}>
                Talk to an Advisor <Headphones size={18} />
              </button>
            </section>
          </div>
        </>
        )}
      </main>

      {/* --- POPUP MODAL: TALK TO ADVISOR --- */}
      {isAdvisorModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAdvisorModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsAdvisorModalOpen(false)}>
              <X size={20} />
            </button>

            {!isSuccessScreen ? (
              <>
                <div className="modal-header">
                  <div className="modal-icon-wrapper">
                    <Headphones size={24} />
                  </div>
                  <h2 className="modal-title">Talk to an Advisor</h2>
                  <p className="modal-desc">Fill out your details, and our insurance expert will call you shortly.</p>
                </div>

                <form className="modal-form" onSubmit={handleAdvisorSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="adv-name">Your Full Name *</label>
                    <input
                      id="adv-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="form-input"
                      value={advisorForm.name}
                      onChange={(e) => setAdvisorForm({ ...advisorForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="adv-phone">Phone Number *</label>
                    <input
                      id="adv-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="form-input"
                      value={advisorForm.phone}
                      onChange={(e) => setAdvisorForm({ ...advisorForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="adv-email">Email Address</label>
                    <input
                      id="adv-email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      className="form-input"
                      value={advisorForm.email}
                      onChange={(e) => setAdvisorForm({ ...advisorForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="adv-category">Interested Insurance Product</label>
                    <select
                      id="adv-category"
                      className="form-select"
                      value={advisorForm.category}
                      onChange={(e) => setAdvisorForm({ ...advisorForm, category: e.target.value })}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Health Insurance">Health Insurance</option>
                      <option value="Term Life Insurance">Term Life Insurance</option>
                      <option value="Car Insurance">Car Insurance</option>
                      <option value="Bike Insurance">Bike Insurance</option>
                      <option value="Corporate Insurance">Corporate Insurance</option>
                      <option value="Other Insurance">Other Products</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="adv-time">Preferred Call Time</label>
                    <select
                      id="adv-time"
                      className="form-select"
                      value={advisorForm.time}
                      onChange={(e) => setAdvisorForm({ ...advisorForm, time: e.target.value })}
                    >
                      <option value="As soon as possible">As soon as possible (Within 15 mins)</option>
                      <option value="In 1 Hour">In 1 Hour</option>
                      <option value="Evening (5 PM - 7 PM)">Evening (5 PM - 7 PM)</option>
                      <option value="Tomorrow Morning">Tomorrow Morning</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-form-submit">Request Call Back</button>
                </form>
              </>
            ) : (
              <div className="modal-success-screen">
                <div className="success-icon-wrapper">
                  <Check size={40} />
                </div>
                <h2 className="success-title">Request Received!</h2>
                <p className="success-desc">
                  Thanks <strong>{advisorForm.name}</strong>, our expert advisor will reach you at <strong>{advisorForm.phone}</strong> around <strong>{advisorForm.time.toLowerCase()}</strong> for <strong>{advisorForm.category}</strong>.
                </p>
                <button className="btn-success-close" onClick={() => setIsAdvisorModalOpen(false)}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- POPUP MODAL: PLAN DETAIL INFORMATION --- */}
      {selectedSubPlan && (
        <div className="modal-overlay" onClick={() => setSelectedSubPlan(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSubPlan(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-icon-wrapper">
                {React.createElement(selectedSubPlan.icon, { size: 24 })}
              </div>
              <h2 className="modal-title">{selectedSubPlan.name}</h2>
              <p className="modal-desc" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                Secure, Transparent, Instant Issuance
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontSize: '0.925rem',
              color: 'var(--color-text-dark)'
            }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-secondary)' }}>
                  Description:
                </strong>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  {selectedSubPlan.description}
                </p>
              </div>

              <div>
                <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-secondary)' }}>
                  Key Benefits & Inclusion Details:
                </strong>
                <ul style={{
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  color: 'var(--color-text-muted)'
                }}>
                  <li>Cashless treatments across 10,000+ network hospitals.</li>
                  <li>Paperless claims with 99.8% settlement ratio.</li>
                  <li>Free annual health checkup coupon included.</li>
                  <li>Tax exemptions under local insurance laws.</li>
                </ul>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '16px'
              }}>
                <button
                  className="btn-success-close"
                  style={{ flex: 1, backgroundColor: 'var(--color-primary)' }}
                  onClick={() => {
                    const planName = selectedSubPlan.name;
                    setSelectedSubPlan(null);
                    handleAdvisorClick(planName);
                  }}
                >
                  Apply & Get Quote
                </button>
                <button
                  className="btn-success-close"
                  style={{ flex: 1, backgroundColor: 'var(--color-secondary)' }}
                  onClick={() => setSelectedSubPlan(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}