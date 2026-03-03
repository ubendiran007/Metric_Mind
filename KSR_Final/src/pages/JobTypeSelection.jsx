import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customBusiness, setCustomBusiness] = useState({ name: '', icon: '🏢' });
  const [userBusinesses, setUserBusinesses] = useState([]);

  const jobTypes = [
    {
      id: 'textile',
      title: 'Textile Business',
      icon: '🧵',
      color: '#2563eb',
      metrics: ['Production Output', 'Material Cost', 'Order Fulfillment', 'Quality Defects']
    },
    {
      id: 'hospital',
      title: 'Hospital',
      icon: '🏥',
      color: '#10b981',
      metrics: ['Patient Satisfaction', 'Bed Occupancy', 'Treatment Success', 'Wait Time']
    },
    {
      id: 'restaurant',
      title: 'Restaurant',
      icon: '🍽️',
      color: '#f59e0b',
      metrics: ['Daily Revenue', 'Table Turnover', 'Food Cost %', 'Customer Rating']
    },
    {
      id: 'retail',
      title: 'Retail Store',
      icon: '🏪',
      color: '#8b5cf6',
      metrics: ['Sales per Sq.Ft', 'Inventory Turnover', 'Foot Traffic', 'Conversion Rate']
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      icon: '🏭',
      color: '#ec4899',
      metrics: ['Production Efficiency', 'Downtime', 'Defect Rate', 'Output per Hour']
    },
    {
      id: 'hotel',
      title: 'Hotel',
      icon: '🏨',
      color: '#06b6d4',
      metrics: ['Occupancy Rate', 'RevPAR', 'Guest Satisfaction', 'Booking Rate']
    }
  ];

  const iconOptions = ['🏢', '🏪', '🏭', '🏗️', '🚗', '✈️', '🎓', '💻', '🎨', '📱', '🔧', '⚡'];

  useEffect(() => {
    const businesses = JSON.parse(localStorage.getItem('userBusinesses') || '[]');
    setUserBusinesses(businesses);
  }, []);

  const handleJobSelect = async (job) => {
    setSelectedJob(job.id);
    
    const existingBusinesses = JSON.parse(localStorage.getItem('userBusinesses') || '[]');
    const businessExists = existingBusinesses.find(b => b.id === job.id);
    
    if (!businessExists) {
      existingBusinesses.push(job);
      localStorage.setItem('userBusinesses', JSON.stringify(existingBusinesses));
      
      // Save to backend
      try {
        const userEmail = localStorage.getItem('userEmail');
        await axios.post('http://localhost:5000/api/user/business', {
          email: userEmail,
          business: job
        });
      } catch (error) {
        console.error('Error saving business:', error);
      }
    }
    
    setTimeout(() => {
      navigate(`/dashboard/${job.id}`);
    }, 300);
  };

  const generateAIMetrics = (businessName) => {
    const name = businessName.toLowerCase().trim();
    
    if (!name) return ['Revenue Growth', 'Customer Satisfaction', 'Operational Efficiency', 'Market Share'];
    
    // Enhanced AI logic with better keyword matching and category detection
    const metricCategories = {
      // Food & Beverage
      food: {
        keywords: ['bakery', 'cafe', 'coffee', 'restaurant', 'pizza', 'burger', 'food', 'catering', 'diner', 'bistro', 'eatery', 'kitchen', 'canteen', 'fast food', 'takeaway', 'delivery'],
        metrics: ['Daily Revenue', 'Customer Footfall', 'Order Fulfillment', 'Food Quality Rating']
      },
      bakery: {
        keywords: ['bakery', 'bread', 'pastry', 'cake', 'baking'],
        metrics: ['Daily Sales', 'Bread Production', 'Customer Satisfaction', 'Ingredient Cost']
      },
      cafe: {
        keywords: ['cafe', 'coffee shop', 'espresso', 'latte', 'cappuccino'],
        metrics: ['Coffee Sales', 'Table Turnover', 'Customer Rating', 'Barista Efficiency']
      },
      restaurant: {
        keywords: ['restaurant', 'dining', 'cuisine', 'chef', 'menu'],
        metrics: ['Table Occupancy', 'Food Quality', 'Service Speed', 'Revenue per Table']
      },
      
      // Health & Wellness
      healthcare: {
        keywords: ['hospital', 'clinic', 'medical', 'health', 'doctor', 'nurse', 'patient', 'treatment'],
        metrics: ['Patient Satisfaction', 'Treatment Success', 'Wait Time', 'Bed Occupancy']
      },
      fitness: {
        keywords: ['gym', 'fitness', 'yoga', 'pilates', 'workout', 'exercise', 'trainer'],
        metrics: ['Member Retention', 'Class Attendance', 'Equipment Usage', 'Membership Growth']
      },
      spa: {
        keywords: ['spa', 'massage', 'wellness', 'therapy', 'relaxation'],
        metrics: ['Treatment Bookings', 'Therapist Utilization', 'Client Satisfaction', 'Product Sales']
      },
      
      // Beauty & Personal Care
      beauty: {
        keywords: ['salon', 'barber', 'beauty', 'hair', 'nail', 'styling', 'cosmetic'],
        metrics: ['Appointment Rate', 'Service Revenue', 'Customer Retention', 'Product Sales']
      },
      
      // Retail
      retail: {
        keywords: ['store', 'shop', 'retail', 'boutique', 'mart', 'supermarket', 'grocery', 'mall'],
        metrics: ['Daily Sales', 'Inventory Turnover', 'Foot Traffic', 'Conversion Rate']
      },
      
      // Services
      services: {
        keywords: ['laundry', 'cleaning', 'repair', 'garage', 'workshop', 'wash', 'service', 'maintenance'],
        metrics: ['Service Bookings', 'Job Completion', 'Customer Rating', 'Turnaround Time']
      },
      
      // Education
      education: {
        keywords: ['school', 'academy', 'coaching', 'tuition', 'training', 'education', 'learning', 'institute'],
        metrics: ['Student Enrollment', 'Academic Performance', 'Teacher Ratio', 'Parent Satisfaction']
      },
      
      // Hospitality
      hospitality: {
        keywords: ['hotel', 'resort', 'lodge', 'hostel', 'accommodation', 'booking', 'guest'],
        metrics: ['Occupancy Rate', 'Guest Satisfaction', 'Booking Rate', 'Revenue per Room']
      },
      
      // Manufacturing
      manufacturing: {
        keywords: ['factory', 'manufacturing', 'textile', 'plant', 'production', 'assembly', 'industrial'],
        metrics: ['Production Output', 'Quality Rate', 'Machine Efficiency', 'Defect Rate']
      },
      
      // Technology
      technology: {
        keywords: ['software', 'tech', 'app', 'digital', 'it', 'computer', 'programming', 'development'],
        metrics: ['User Engagement', 'System Uptime', 'Bug Resolution', 'Feature Adoption']
      },
      
      // Transportation
      transport: {
        keywords: ['taxi', 'uber', 'transport', 'delivery', 'logistics', 'shipping', 'freight'],
        metrics: ['Trip Completion', 'Driver Rating', 'Delivery Time', 'Fuel Efficiency']
      },
      
      // Real Estate
      realestate: {
        keywords: ['real estate', 'property', 'rental', 'apartment', 'housing', 'broker'],
        metrics: ['Property Sales', 'Rental Yield', 'Occupancy Rate', 'Client Satisfaction']
      },
      
      // Finance
      finance: {
        keywords: ['bank', 'finance', 'loan', 'insurance', 'investment', 'accounting'],
        metrics: ['Loan Approval', 'Customer Acquisition', 'Risk Assessment', 'Portfolio Growth']
      }
    };
    
    // Find the best matching category
    let bestMatch = null;
    let maxMatches = 0;
    
    for (const [category, config] of Object.entries(metricCategories)) {
      const matches = config.keywords.filter(keyword => name.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = config.metrics;
      }
    }
    
    // If we found a good match, return those metrics
    if (bestMatch && maxMatches > 0) {
      return bestMatch;
    }
    
    // Smart fallback based on common business words
    if (name.includes('online') || name.includes('digital') || name.includes('web')) {
      return ['Website Traffic', 'Conversion Rate', 'Customer Acquisition', 'Revenue Growth'];
    }
    
    if (name.includes('consulting') || name.includes('advisory')) {
      return ['Client Projects', 'Billable Hours', 'Client Satisfaction', 'Revenue per Client'];
    }
    
    if (name.includes('agency') || name.includes('marketing')) {
      return ['Campaign Performance', 'Client Retention', 'Lead Generation', 'ROI'];
    }
    
    // Ultimate fallback
    return ['Revenue Growth', 'Customer Satisfaction', 'Operational Efficiency', 'Market Share'];
  };

  const handleCustomBusinessCreate = () => {
    if (customBusiness.name.trim()) {
      const aiMetrics = generateAIMetrics(customBusiness.name);
      const newBusiness = {
        id: customBusiness.name.toLowerCase().replace(/\s+/g, '-'),
        title: customBusiness.name,
        icon: customBusiness.icon,
        color: '#6366f1',
        metrics: aiMetrics,
        businessName: customBusiness.name // Store original name for dashboard matching
      };
      handleJobSelect(newBusiness);
      setShowCustomModal(false);
      setCustomBusiness({ name: '', icon: '🏢' });
    }
  };

  const handleRemoveBusiness = async (businessId, e) => {
    e.stopPropagation();
    const updatedBusinesses = userBusinesses.filter(b => b.id !== businessId);
    setUserBusinesses(updatedBusinesses);
    localStorage.setItem('userBusinesses', JSON.stringify(updatedBusinesses));
    
    try {
      const userEmail = localStorage.getItem('userEmail');
      await axios.delete(`http://localhost:5000/api/user/business/${businessId}`, {
        data: { email: userEmail }
      });
    } catch (error) {
      console.error('Error removing business:', error);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '36px', margin: '0 0 10px 0', color: '#1e293b' }}>
            Select Your Business
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', margin: 0 }}>
            Choose your business type to see customized metrics and insights
          </p>
        </div>
        {userBusinesses.length > 0 && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px 0' }}>Your Businesses</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {userBusinesses.map((business) => (
                <div key={business.id} style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    onClick={() => navigate(`/dashboard/${business.id}`)}
                    style={{
                      padding: '6px 12px',
                      background: 'white',
                      border: `2px solid ${business.color}`,
                      color: business.color,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}
                  >
                    {business.icon} {business.title}
                  </button>
                  <button
                    onClick={(e) => handleRemoveBusiness(business.id, e)}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}
                    title="Remove business"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {jobTypes.map((job) => {
          const isMyJob = userBusinesses.some(b => b.id === job.id);
          return (
            <div key={job.id} style={{ position: 'relative' }}>
              <div
                onClick={() => handleJobSelect(job)}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  cursor: 'pointer',
                  border: selectedJob === job.id ? `3px solid ${job.color}` : isMyJob ? `2px solid ${job.color}` : '2px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  transform: selectedJob === job.id ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: selectedJob === job.id 
                    ? `0 8px 24px ${job.color}40` 
                    : '0 2px 8px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                  if (selectedJob !== job.id) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedJob !== job.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }
                }}
              >
                {isMyJob && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: job.color,
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    MY BUSINESS
                  </div>
                )}
                
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  {job.icon}
                </div>
                
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  color: job.color,
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  {job.title}
                </h3>

                <div style={{
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '16px'
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Key Metrics
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {job.metrics.map((metric, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#475569'
                      }}>
                        <span style={{ color: job.color }}>•</span>
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {isMyJob && (
                <button
                  onClick={(e) => handleRemoveBusiness(job.id, e)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  title="Remove from my businesses"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
        
        {/* Custom Businesses */}
        {userBusinesses.filter(business => !jobTypes.some(job => job.id === business.id)).map((business) => (
          <div key={business.id} style={{ position: 'relative' }}>
            <div
              onClick={() => handleJobSelect(business)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                cursor: 'pointer',
                border: selectedJob === business.id ? `3px solid ${business.color}` : `2px solid ${business.color}`,
                transition: 'all 0.3s ease',
                transform: selectedJob === business.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: selectedJob === business.id 
                  ? `0 8px 24px ${business.color}40` 
                  : '0 2px 8px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={(e) => {
                if (selectedJob !== business.id) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedJob !== business.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }
              }}
            >
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: business.color,
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600'
              }}>
                MY BUSINESS
              </div>
              
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {business.icon}
              </div>
              
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: business.color,
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {business.title}
              </h3>

              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '16px'
              }}>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b',
                  marginBottom: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Key Metrics
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {business.metrics.map((metric, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: '#475569'
                    }}>
                      <span style={{ color: business.color }}>•</span>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={(e) => handleRemoveBusiness(business.id, e)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                border: '2px solid white',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.4)';
              }}
              title="Remove from my businesses"
            >
              ×
            </button>
          </div>
        ))}
        
        {/* Create Custom Business Card */}
        <div
          onClick={() => setShowCustomModal(true)}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            cursor: 'pointer',
            border: '2px dashed #cbd5e1',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '280px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>➕</div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2563eb', textAlign: 'center' }}>
            Create Custom Business
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>
            Add your own business type
          </p>
        </div>
      </div>

      {/* Custom Business Modal */}
      {showCustomModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#1e293b' }}>
              Create Custom Business
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Business Name
              </label>
              <input
                type="text"
                value={customBusiness.name}
                onChange={(e) => setCustomBusiness({ ...customBusiness, name: e.target.value })}
                placeholder="e.g., Bakery, Gym, Salon, Pizza Shop, Yoga Studio"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {customBusiness.name && (
                <p style={{ fontSize: '12px', color: '#10b981', marginTop: '8px' }}>
                  ✨ AI will generate: {generateAIMetrics(customBusiness.name).join(', ')}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Choose Icon
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setCustomBusiness({ ...customBusiness, icon })}
                    style={{
                      padding: '12px',
                      fontSize: '28px',
                      border: customBusiness.icon === icon ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      background: customBusiness.icon === icon ? '#eff6ff' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowCustomModal(false);
                  setCustomBusiness({ name: '', icon: '🏢' });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCustomBusinessCreate}
                disabled={!customBusiness.name.trim()}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: customBusiness.name.trim() ? '#2563eb' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'white',
                  cursor: customBusiness.name.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Create Business
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTypeSelection;
