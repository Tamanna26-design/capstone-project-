import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, 
  ArcElement, Title, Tooltip, Legend, Filler
)

const destinations = [
  {
    id: 1,
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    price: '$2,200'
  },
  {
    id: 2,
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop',
    price: '$2,800'
  },
  {
    id: 3,
    name: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop',
    price: '$1,400'
  },
  {
    id: 4,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop',
    price: '$3,500'
  }
]

function Navbar() {
  const location = useLocation()
  
  return (
    <nav className="nav">
      <Link to="/" style={{textDecoration: 'none'}}>
        <h2>🌍 Voyago</h2>
      </Link>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/places" className={location.pathname === '/places' ? 'active' : ''}>Find Places</Link>
        <Link to="/packages" className={location.pathname === '/packages' ? 'active' : ''}>Packages</Link>
        <Link to="/booking" className={location.pathname === '/booking' ? 'active' : ''}>Booking</Link>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer reveal">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Voyago</h3>
          <p>Experience the world like never before. We provide premium luxury travel packages and instant bookings for your ultimate adventures.</p>
          <div className="social-links">
            <a href="#">X</a>
            <a href="#">In</a>
            <a href="#">Fb</a>
            <a href="#">Ig</a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Travel Guides</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Subscribe</h4>
          <p style={{color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 10px 0'}}>Get latest deals directly in your inbox.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="btn-primary" style={{padding: '12px 15px'}}>Join</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Voyago Travel Pro. All rights reserved.
      </div>
    </footer>
  )
}

function Home() {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then(res => res.json())
      .then(data => {
        setCountries(data.slice(0, 15))
      })
      .catch(err => console.error("Error fetching countries:", err))
  }, [])

  const handleHeroSearch = (e) => {
    e.preventDefault()
    if(searchQuery.trim()) {
      navigate(`/places?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div>
      <header className="hero">
        <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop" alt="Hero Background" className="hero-bg" />
        <div className="hero-overlay"></div>
        
        <div className="overlay">
          <h1>Explore Luxury <span>Adventures</span> Worldwide</h1>
          <p>Book premium tours, flights, and resorts instantly. Discover the true meaning of travel with our curated experiences tailored just for you.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="btn-primary" onClick={() => navigate('/booking')}>Book Your Trip</button>
            <button className="btn-secondary" onClick={() => navigate('/places')}>Discover API</button>
          </div>
        </div>

        {/* Floating Search Widget */}
        <form className="hero-widget reveal delay-2" onSubmit={handleHeroSearch}>
          <div className="widget-item">
            <label>Location</label>
            <input type="text" placeholder="Where are you going?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="widget-item">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="widget-item">
            <label>Guests</label>
            <input type="number" placeholder="2 Guests" min="1" />
          </div>
          <button type="submit" className="widget-btn">Search</button>
        </form>
      </header>

      <section className="section">
        <div className="section-header reveal">
          <h2>Top <span>Destinations</span></h2>
          <p style={{color: '#94a3b8', marginTop: '10px'}}>Curated exclusively for our premium members</p>
        </div>
        <div className="grid">
          {destinations.map((item, i) => (
            <div className={`card reveal delay-${i%3 + 1}`} key={item.id}>
              <div className="card-img-wrap">
                <img src={item.image} alt={item.name} />
                <span className="card-price">{item.price}</span>
              </div>
              <div className="card-body">
                <h3>{item.name}</h3>
                <p>Experience the incredible culture, food, and landscapes that {item.name} has to offer.</p>
                <button className="btn-primary" style={{width: '100%'}} onClick={() => navigate('/booking')}>Book Package</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{background: 'linear-gradient(to bottom, #050b14, #0f172a)'}}>
        <div className="section-header reveal">
          <h2>Global <span>Destinations API</span></h2>
          <p style={{color: '#94a3b8', marginTop: '10px'}}>Live data powered by REST Countries API</p>
        </div>
        <div className="country-wrap reveal delay-1">
          {countries.map((c, index) => (
            <div className="country" key={index} onClick={() => navigate(`/places?q=${c.name.common}`)}>
              <img src={c.flags.png} alt={`${c.name.common} flag`} />
              <span>{c.name.common}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function FindPlaces() {
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const initialQuery = urlParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)
    setPlaces([])
    
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`)
      const data = await response.json()
      
      if (data.query && data.query.search) {
        setPlaces(data.query.search)
      } else {
        setPlaces([])
      }
    } catch (err) {
      setError('Failed to fetch places. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Auto search if came from Hero widget
  useEffect(() => {
    if (initialQuery) handleSearch()
  }, [])

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '150px' }}>
      <div className="section-header" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <h2>Find <span>Tourist Attractions</span></h2>
        <p style={{ color: '#94a3b8', marginTop: '10px' }}>Search anything to discover amazing places using the Wikipedia Public API</p>
      </div>

      <form className="search-container" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="e.g., Paris, Tokyo, New York, Eiffel Tower..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn-primary">Search Places</button>
      </form>

      {error && <div className="error reveal">{error}</div>}
      
      {loading ? (
        <div className="grid">
          {/* Skeleton Loaders */}
          {[1,2,3].map(n => (
             <div className="place-card" key={n} style={{animation: 'pulse 1.5s infinite', backgroundColor: 'rgba(255,255,255,0.02)'}}>
               <div style={{height: '30px', background: 'rgba(255,255,255,0.05)', marginBottom: '15px', borderRadius: '5px'}}></div>
               <div style={{height: '15px', background: 'rgba(255,255,255,0.05)', marginBottom: '10px', borderRadius: '5px'}}></div>
               <div style={{height: '15px', background: 'rgba(255,255,255,0.05)', width: '80%', borderRadius: '5px'}}></div>
             </div>
          ))}
        </div>
      ) : (
        <>
          {hasSearched && places.length === 0 && !error && (
             <p style={{ color: '#cbd5e1', textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px' }}>
                No Wikipedia articles found for "{query}". Try a different search term.
             </p>
          )}

          <div className="grid">
            {places.map((place, i) => (
              <div className="place-card" key={place.pageid} style={{display: 'flex', flexDirection: 'column', animation: 'slideUp 0.6s ease forwards'}}>
                <h3 style={{color: '#38bdf8', marginBottom: '15px', fontSize: '1.4rem'}}>{place.title}</h3>
                <p 
                  style={{color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', flex: 1}} 
                  dangerouslySetInnerHTML={{ __html: (place.snippet || '') + '...' }} 
                />
                <a 
                   href={`https://en.wikipedia.org/wiki/${encodeURIComponent(place.title.replace(/ /g, '_'))}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', borderRadius: '50px', textAlign: 'center', transition: 'all 0.3s ease' }}
                >
                  Read on Wikipedia ↗
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    localStorage.setItem('voyagoUser', email)
    alert('Login Successful')
    navigate('/dashboard')
  }

  return (
    <div className="split-layout">
      <div className="split-image reveal" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop')" }}>
        <div className="split-overlay">
          <h2>Your Journey <br/>Begins <span style={{color: '#38bdf8'}}>Here.</span></h2>
        </div>
      </div>
      
      <div className="split-form-container reveal delay-1">
        <form className="form-box" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to manage your bookings and access exclusive dashboard analytics.</p>
          
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary">Login to Account</button>
        </form>
      </div>
    </div>
  )
}

function Booking() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('Dubai')
  const [people, setPeople] = useState(1)

  const submitBooking = (e) => {
    e.preventDefault()
    const booking = { name, destination, people }
    localStorage.setItem('booking', JSON.stringify(booking))
    navigate('/confirmation')
  }

  return (
    <div className="split-layout">
      <div className="split-form-container reveal delay-1">
        <form className="form-box" onSubmit={submitBooking}>
          <h2>Book Your Trip</h2>
          <p className="subtitle">Reserve your next luxury adventure today.</p>

          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Destination</label>
            <select value={destination} onChange={(e)=>setDestination(e.target.value)}>
              <option>Dubai</option>
              <option>Paris</option>
              <option>Thailand</option>
              <option>Maldives</option>
            </select>
          </div>

          <div className="input-group">
            <label>Number of Travelers</label>
            <input type="number" min="1" value={people} onChange={(e)=>setPeople(e.target.value)} />
          </div>

          <button type="submit" className="btn-primary">Confirm Secure Booking</button>
        </form>
      </div>

      <div className="split-image reveal" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop')" }}>
        <div className="split-overlay">
          <h2>Travel with <br/>Absolute <span style={{color: '#38bdf8'}}>Confidence.</span></h2>
        </div>
      </div>
    </div>
  )
}

function Confirmation() {
  const booking = JSON.parse(localStorage.getItem('booking'))

  return (
    <div className="split-layout" style={{background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.1), transparent 50%)'}}>
      <div className="split-form-container reveal" style={{margin: '0 auto'}}>
        <div style={{textAlign: 'center', width: '100%'}}>
          <h1 style={{fontSize: '3.5rem', marginBottom: '10px'}}>🎉 Confirmed!</h1>
          <p style={{color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px'}}>Thank you for choosing Voyago. Your adventure awaits.</p>
          
          {booking ? (
            <div className="form-box" style={{margin: '0 auto', textAlign: 'left'}}>
              <h3 style={{marginBottom: '20px', color: '#38bdf8'}}>Booking Details</h3>
              <p style={{padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                <strong>Traveler Name:</strong> <span style={{float: 'right', color: 'white'}}>{booking.name}</span>
              </p>
              <p style={{padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                <strong>Destination:</strong> <span style={{float: 'right', color: 'white'}}>{booking.destination}</span>
              </p>
              <p style={{padding: '15px 0'}}>
                <strong>Party Size:</strong> <span style={{float: 'right', color: 'white'}}>{booking.people} People</span>
              </p>
            </div>
          ) : (
            <p>No recent booking found.</p>
          )}
          
          <Link to="/" className="btn-primary" style={{display: 'inline-block', textDecoration: 'none', marginTop: '30px'}}>Return Home</Link>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  // Line Chart Data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Bookings',
        data: [65, 85, 110, 90, 145, 180],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#2563eb'
      }
    ]
  }

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
  }

  // Doughnut Chart Data
  const doughnutData = {
    labels: ['Dubai', 'Paris', 'Thailand', 'Maldives'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: ['#38bdf8', '#818cf8', '#2563eb', '#1e1b4b'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  }
  
  const doughnutOptions = {
    plugins: { legend: { position: 'bottom', labels: { color: '#cbd5e1', padding: 20 } } },
    cutout: '75%'
  }

  return (
    <div className="dashboard">
      <div className="section-header reveal" style={{textAlign: 'left', marginBottom: '20px'}}>
        <h1 style={{fontSize: '3rem'}}>Analytics <span>Dashboard</span></h1>
        <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>Monitor travel trends and booking statistics.</p>
      </div>

      <div className="charts-grid">
        <div className="chart-box reveal delay-1">
          <h3 style={{marginBottom: '20px', color: '#cbd5e1'}}>Booking Trends (6 Months)</h3>
          <Line data={lineData} options={lineOptions} />
        </div>
        
        <div className="chart-box reveal delay-2" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h3 style={{marginBottom: '20px', color: '#cbd5e1', width: '100%'}}>Top Destinations</h3>
          <div style={{width: '80%'}}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Packages() {
  const navigate = useNavigate()
  return (
    <div className="section packages-section">
      <div className="section-header reveal">
        <h2>Premium <span>Travel Packages</span></h2>
        <p style={{color: '#94a3b8', marginTop: '10px'}}>Compare our curated itineraries and choose your dream vacation.</p>
      </div>

      <div className="package-detail-card reveal delay-1">
        <div className="package-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop')"}}></div>
        <div className="package-info">
          <h3>The Bali Retreat</h3>
          <p className="price">$1,899 <span style={{fontSize: '1rem', color: '#94a3b8', fontWeight: 'normal'}}>/ person</span></p>
          <ul>
            <li>7 Days, 6 Nights at a 5-Star Jungle Villa</li>
            <li>Daily Spa Treatments & Yoga Sessions</li>
            <li>Private Guided Temple Tours</li>
            <li>All Meals Included (Organic & Local Cuisine)</li>
          </ul>
          <button className="btn-primary" style={{width: 'max-content'}} onClick={() => navigate('/booking')}>Book This Package</button>
        </div>
      </div>

      <div className="package-detail-card reveal delay-2">
        <div className="package-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop')"}}></div>
        <div className="package-info">
          <h3>European City Hopper</h3>
          <p className="price">$3,450 <span style={{fontSize: '1rem', color: '#94a3b8', fontWeight: 'normal'}}>/ person</span></p>
          <ul>
            <li>10 Days across Paris, Rome, and Barcelona</li>
            <li>First-Class Train Travel Between Cities</li>
            <li>Skip-the-Line Museum Passes</li>
            <li>Boutique Hotel Accommodations</li>
          </ul>
          <button className="btn-primary" style={{width: 'max-content'}} onClick={() => navigate('/booking')}>Book This Package</button>
        </div>
      </div>

      <div className="comparison-container reveal delay-3">
        <h2 style={{marginBottom: '20px', fontSize: '2rem'}}>Compare <span>Plans</span></h2>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Features</th>
              <th>Basic</th>
              <th className="plan-header-pro">Premium</th>
              <th>Elite VIP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Commercial Flights</td>
              <td>Economy</td>
              <td className="plan-col-pro">Business Class</td>
              <td>First Class</td>
            </tr>
            <tr>
              <td>Accommodation</td>
              <td>3-Star Hotels</td>
              <td className="plan-col-pro">5-Star Resorts</td>
              <td>Private Villas</td>
            </tr>
            <tr>
              <td>Airport Transfers</td>
              <td><span className="cross">✗</span></td>
              <td className="plan-col-pro"><span className="check">✓</span></td>
              <td><span className="check">✓</span> (Helicopter/Limo)</td>
            </tr>
            <tr>
              <td>Dedicated Concierge</td>
              <td><span className="cross">✗</span></td>
              <td className="plan-col-pro"><span className="cross">✗</span></td>
              <td><span className="check">✓</span> (24/7)</td>
            </tr>
            <tr>
              <td>Excursion Passes</td>
              <td>1 Included</td>
              <td className="plan-col-pro">3 Included</td>
              <td>Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    window.scrollTo(0, 0)
    
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' })

      const reveals = document.querySelectorAll('.reveal')
      reveals.forEach(el => observer.observe(el))
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<FindPlaces />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
