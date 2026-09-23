import React, { useEffect, useState } from 'react';
import './App.css';
import logoBlue from './assets/Logo Files/IMBY-Logo-Black-Negative_Logo-Negative-Blue.png';
import logoBrown from './assets/Logo Files/IMBY-Logo-Black-Negative_Logo-Negative-Brown.png';
import logoGreen from './assets/Logo Files/IMBY-Logo-Black-Negative_Logo-Negative-Green.png';
import logoLime from './assets/Logo Files/IMBY-Logo-Black-Negative_Logo-Negative-Lime.png';
import logoOrange from './assets/Logo Files/IMBY-Logo-Black-Negative_Logo-Negative-Orange.png';
import logoTan from './assets/Logo Files/IMBY-Logo-Black-Negative_Logo-Negative-Tan.png';
import logoTeal from './assets/Logo Files/IMBY-Logo-Black-Negative_Logo-Negative-Teal.png';
import camping from './assets/camping.jpg';
import lineup from './assets/lineup.jpg';
import volunteer from './assets/volunteer.jpeg';
import MenuItem from './components/menuItem';
import DropDown from './components/dropDown';

const logoFrames = [logoBlue, logoBrown, logoGreen, logoLime, logoOrange, logoTan, logoTeal];
const preloadLogoFrames = () => Promise.all(
  logoFrames.map((logo) => new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = resolve;
    img.onerror = resolve;
    img.src = logo;
  }))
);
const slideshowContext = require.context('./assets/homepage-slideshow', false, /\.(png|jpe?g|webp)$/i);
const homepageSlides = slideshowContext.keys().map((key, index) => {
  const normalizedKey = key.toLowerCase();
  const isIMG6578 = normalizedKey.includes('img_6578');

  return {
    image: slideshowContext(key),
    alt: `IMBY Fest slideshow image ${index + 1}`,
    position: isIMG6578 ? 'center 28%' : 'center center'
  };
});
const instagramProfileUrl = 'https://www.instagram.com/imbyfest/';

function App() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("None");
  const [activeSection, setActiveSection] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [logosReady, setLogosReady] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let isMounted = true;

    preloadLogoFrames().finally(() => {
      if (isMounted) {
        setLogosReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const slideshowTimer = setInterval(() => {
      setSlideIndex((currentIndex) => Math.min(currentIndex + 1, homepageSlides.length - 1));
    }, 6500);

    return () => clearInterval(slideshowTimer);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-10-17T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const showSlide = (direction) => {
    setSlideIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;
      return Math.min(Math.max(nextIndex, 0), homepageSlides.length - 1);
    });
  };

  const openSection = (section) => {
    setActiveSection(section);
    setDropdownOpen("None");
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileNavSelect = (section) => {
    openSection(section);
  };

  return (
    <div className="App">
      <div className="topContainer" onMouseLeave={() => setDropdownOpen("None")}>
        <div className={"slideBox" + (dropdownOpen !== "None" ? " open" : "")}/>
        <div className="topbar" >
            
              <div className="nav-left">
                <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
                <MenuItem label="Music" onHover={() => setDropdownOpen("Music")}/>
                <MenuItem label="Camping & Lodging" onHover={() => setDropdownOpen("Camping & Lodging")}/>
              </div>
              <div className="nav-center">
                <button className="logo-button" type="button" onClick={() => { setActiveSection(null); setDropdownOpen("None"); }} aria-label="Return to home">
                  <span className="logo-animation" aria-hidden="true">
                    {logoFrames.map((logo, index) => (
                      <img
                        src={logo}
                        alt=""
                        className="center-logo"
                        key={logo}
                        style={{
                          animationDelay: `${index * -1.5}s`,
                          animationPlayState: logosReady ? 'running' : 'paused',
                          opacity: logosReady ? undefined : index === 0 ? 1 : 0
                        }}
                      />
                    ))}
                  </span>
                </button>
              </div>
              <div className="nav-right">
              <MenuItem label="Beyond The Music" onHover={() => setDropdownOpen("Beyond The Music")}/>
              <MenuItem label="Get Involved" onHover={() => setDropdownOpen("Get Involved")}/>
              <button className="buy-button" type="button" onClick={() => openSection('tickets')}>GET TICKETS</button>
              </div>
            
        </div>
        <div className={"mobile-nav-overlay" + (open ? " open" : "")} onClick={() => setOpen(false)} />
        <aside className={"mobile-nav-panel" + (open ? " open" : "")} aria-label="Mobile navigation panel">
          <button className="mobile-nav-close" type="button" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
          <button className="mobile-nav-item" type="button" onClick={() => handleMobileNavSelect('music')}>Music</button>
          <button className="mobile-nav-item" type="button" onClick={() => handleMobileNavSelect('camping')}>Camping & Lodging</button>
          <button className="mobile-nav-item" type="button" onClick={() => handleMobileNavSelect('beyond')}>Beyond The Music</button>
          <button className="mobile-nav-item" type="button" onClick={() => handleMobileNavSelect('involved')}>Get Involved</button>
          <button className="mobile-nav-item mobile-nav-cta" type="button" onClick={() => handleMobileNavSelect('tickets')}>Get Tickets</button>
        </aside>
        <DropDown displayType={dropdownOpen} onMouseLeave={() => setDropdownOpen("None")} onSelect={openSection} />
      </div>
      {activeSection ? (
        <SectionView section={activeSection} onBack={() => setActiveSection(null)} />
      ) : <>
      <div className="video-container">
        <div className="homepage-slideshow" aria-label="IMBY Fest photo slideshow">
          {homepageSlides.map((slide, index) => (
            <img
              key={slide.image}
              className={`homepage-slide${index === slideIndex ? ' active' : ''}`}
              src={slide.image}
              alt={slide.alt}
              style={{ objectPosition: slide.position }}
            />
          ))}
          <div className="slideshow-controls">
            <button type="button" onClick={() => showSlide(-1)} aria-label="Previous slideshow photo">&lt;</button>
            <div className="slideshow-dots" aria-label="Slideshow position">
              {homepageSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  className={index === slideIndex ? 'active' : ''}
                  type="button"
                  onClick={() => setSlideIndex(index)}
                  aria-label={`Show photo ${index + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => showSlide(1)} aria-label="Next slideshow photo">&gt;</button>
          </div>
        </div>
      </div>
      <div className={"body-container"}>
        <div className="body-item hero-panel" style={{backgroundColor: "hsla(211.11,100%,10.59%,1)", gridArea: "box-1"}}>
          <svg className="hero-scenery" viewBox="0 0 600 180" aria-hidden="true" focusable="false">
            <circle className="hero-scenery-sun" cx="505" cy="42" r="23" />
            <path className="hero-scenery-line" d="M0 145 C95 112 145 132 220 112 C295 92 338 125 410 104 C480 84 535 104 600 78" />
            <path className="hero-scenery-line hero-scenery-horizon" d="M0 160 C115 143 178 158 275 145 C376 132 460 146 600 126" />
            <path className="hero-scenery-line hero-scenery-tree-trunk" d="M72 145 V104 M66 145 H78 M72 119 L55 105 M72 126 L89 111" />
            <path className="hero-scenery-line hero-scenery-tree-canopy" d="M72 108 C52 108 41 98 47 86 C38 76 48 62 62 64 C65 47 83 44 91 58 C106 54 116 68 108 79 C116 91 104 106 90 103 C84 109 77 110 72 108 Z" />
            <path className="hero-scenery-line hero-scenery-tree-detail" d="M52 85 C64 80 78 81 91 73 M61 97 C74 91 87 92 101 86" />
            <path className="hero-scenery-line hero-scenery-tree-trunk" d="M548 127 V88 M542 127 H554 M548 101 L531 88 M548 108 L565 94" />
            <path className="hero-scenery-line hero-scenery-tree-canopy" d="M548 91 C529 92 517 82 522 70 C514 59 523 46 537 48 C539 32 557 29 566 43 C580 39 591 53 584 64 C593 76 581 90 567 87 C562 93 554 94 548 91 Z" />
            <path className="hero-scenery-line hero-scenery-tree-detail" d="M527 70 C540 65 553 67 568 58 M536 82 C548 76 562 78 578 72" />
            <path className="hero-scenery-line hero-scenery-grass" d="M18 164 C20 153 22 149 24 144 M24 164 C28 155 32 151 36 148 M112 164 C114 154 118 149 123 145 M120 164 C125 155 130 152 136 150 M575 145 C579 137 583 133 588 130 M584 145 C590 139 594 137 599 137" />
            <path className="hero-scenery-line hero-scenery-birds" d="M415 48 Q423 41 431 48 Q439 41 447 48 M458 62 Q464 57 470 62 Q476 57 482 62" />
          </svg>
          <div className="hero-kicker">In My Backyard Festival</div>
          <div className="body-item-content hero-title">DISCOVER GREAT MUSIC IN THE GREAT OUTDOORS</div>
          <div className="body-item-content hero-subtitle">Izaak Walton League | Gaithersburg, Maryland</div>
          <div className="body-item-content hero-date">October 17-18, 2026</div>
          <button className="hero-ticket-button" type="button" onClick={() => openSection('tickets')}>Get Tickets <span aria-hidden="true">↗</span></button>
        </div> 
        <button className="body-item image-card" type="button" style={{gridArea: "box-3"}} onClick={() => openSection('music')}>
          <img src={lineup} className="image-card-photo" alt="2026 lineup" />
          <div className="body-item-content">
            <span className="image-card-kicker">Live music</span>
            <span>2026 LINEUP</span>
          </div>
        </button> 
        <button className="body-item image-card" style={{gridArea: "box-4"}} onClick={() => openSection('camping')}>
          <img src={camping} className="image-card-photo" alt="Camping and lodging" />
          <div className="body-item-content">
            <span className="image-card-kicker">Stay awhile</span>
            <span>CAMPING & LODGING</span>
          </div>
        </button> 
        <button className="body-item image-card" style={{gridArea: "box-5"}} onClick={() => openSection('involved')}>
          <img src={volunteer} className="image-card-photo" alt="Volunteer at IMBY" />
          <div className="body-item-content">
            <span className="image-card-kicker">Join the crew</span>
            <span>VOLUNTEER AT IMBY</span>
          </div>
        </button> 
        <div className="body-item countdown-box" style={{backgroundColor: "hsla(35.09,100%,68.82%,1)", gridArea: "box-6"}}>
          <div className="countdown-label">Days Till IMBY</div>
          <div className="countdown-value">{countdown.days} days {countdown.hours} hours {countdown.minutes} minutes {countdown.seconds} seconds</div>
        </div> 
        <div className="body-item partiful-panel" style={{gridArea: "box-7"}}>
          <div className="support-panel-title">Join IMBY</div>
          <p className="partiful-panel-copy">Reserve your spot for a weekend of music in the great outdoors.</p>
          <a
            className="partiful-cta-button"
            href="https://partiful.com/e/lS5WyjDsdnkutsfRiFCn"
            target="_blank"
            rel="noreferrer"
          >
            RSVP on Partiful
          </a>
        </div>
        <div className="body-item support-panel" style={{gridArea: "box-8"}}>
          <div className="support-panel-title">Support IMBY</div>
          <div className="hero-payment-links" aria-label="Support IMBY through Venmo or Cash App">
            <a className="payment-link payment-link-venmo" href="https://venmo.com/u/IMBYFEST" target="_blank" rel="noreferrer"><span className="payment-brand-mark" aria-hidden="true">V</span>Venmo @IMBYFEST</a>
            <a className="payment-link payment-link-cashapp" href="https://cash.app/$IMBYFEST" target="_blank" rel="noreferrer"><span className="payment-brand-mark" aria-hidden="true">$</span>Cash App $IMBYFEST</a>
          </div>
        </div>
        <div className="body-item instagram-profile-panel" style={{gridArea: "box-10"}}>
          <div className="instagram-profile-mark" aria-hidden="true">◎</div>
          <div className="instagram-profile-title">@imbyfest</div>
          <a className="instagram-profile-button" href={instagramProfileUrl} target="_blank" rel="noreferrer">
            Follow us on Instagram <span aria-hidden="true">↗</span>
          </a>
        </div> 
      </div>
      </>}
    </div>
  );
}

function SectionView({ section }) {
  if (section === 'tickets') {
    return <BuyTicketsView />;
  }

  const content = {
    music: {
      eyebrow: 'Lineup & schedule',
      title: 'Music',
      intro: '',
      body: <>
        <p>Music will be starting at 3:30 on Saturday (10/17) and concluding at 11:00pm Saturday.</p>
        <p>Sundays (10/18) lineup will start at 12:00 Noon and conclude at 4:00 Pm</p>
        <p>We ask that the grounds be cleared no later than 5:00Pm on Sunday (10/18)</p>
        <p><strong>Stay Tuned for the Lineup drop!</strong></p>
      </>
    },
    camping: {
      eyebrow: 'Plan your stay', title: 'Camping & Lodging',
      intro: 'Make a weekend of it. Bring your own tent for a quiet, walk-up campsite, or choose a nearby hotel for a little more comfort.',
      body: <><h2>Camping</h2><p>Pitch your own tent at one of our 2 different walk-up remote tent camping areas. Each campsite is reserved for <strong>$25</strong> and can fit up to <strong>4 people</strong>.</p><p>Campsite sizes are all roughly 20’x10’, which generally allows for enough room for 1 tent and a small sitting area. There will be public fire pits available for cooking, making s’mores, or making friends!</p><p>Because we have limited availability, reservations for camping are <em>required</em>. We cannot guarantee day-of campsite availability.</p><div className="stay-columns"><div><h3>Camp Redwood</h3><ul><li>Open to all ages, families, and those wanting a more quiet, sober experience</li><li>Quiet hours from 10:00pm - 8:00am</li><li><strong>Alcohol and substance use prohibited within campground</strong></li></ul></div><div><h3>Camp White Pine</h3><ul><li>18+ campers only</li><li>No enforced quiet hours, but we ask that you be respectful of your neighbors</li></ul></div></div><p><em>Please note: while we do ask for quiet hours in Camp Redwood, the sites are close enough to the stage that music and lights may still affect your little ones or light sleepers. Plan accordingly and bring ear plugs, eye masks, or anything else you may need!</em></p><h2>Hotels</h2><p>There are a number of hotels and Airbnbs within a 15-30 minute drive from the festival grounds. Below are some, but not all of the options:</p><ul className="hotel-list"><li><strong>The Inn on Fox Meadow</strong><br />104 Russell Avenue<br />Gaithersburg, MD 20877<br /><a href="https://foxmeadow.us/" target="_blank" rel="noreferrer">foxmeadow.us</a></li><li><strong>Holiday Inn Gaithersburg</strong><br />Two Montgomery Village Ave<br />Gaithersburg, MD 20879</li><li><strong>Motel 6 Gaithersburg</strong><br />497 Quince Orchard Rd<br />Gaithersburg, MD 20879</li><li><strong>Doubletree by Hilton</strong><br />620 Perry Parkway<br />Gaithersburg, MD 20877</li><li><strong>Spark by Hilton Germantown</strong><br />20260 Goldenrod Lane<br />Gaithersburg, MD 20876</li><li><strong>Hampton Inn & Suites</strong><br />960 N Frederick Ave<br />Gaithersburg, MD 20879</li></ul></>
    },
    beyond: { eyebrow: 'More than music', title: 'Beyond the Music', intro: 'A festival weekend built around local creativity, good food, and plenty of room to play.', body: <><h2>Art</h2><p>We plan to offer a great selection of art vendors with a variety of mediums represented. Here’s a list of confirmed vendors with more added every day!</p><ul><li><strong>Clay Monger Pottery:</strong> Baltimore-based ceramicist offering specialized mugs, jewelry, cutting boards, and a wheel-throwing demonstration.</li><li><strong>Lily Ertel:</strong> An IMBY staple offering $10 quick marker portraits and a collection of prints.</li><li><strong>Necronomikitten and Yupitslizz:</strong> Cute custom Halloween decor, prints, and accessories perfect for the season.</li></ul><h2>Activities</h2><p>There’s all kinds of fun to be had In My Backyard! We are bringing in incredible professionals to provide interactive experiences everyone can enjoy.</p><ul><li>Join Eco-Poet Hillary Gonzalez, author of <em>Seasons, Wild, Unfelt World</em> (2026) and <em>Where the Osprey Nest</em> (2026), on a guided open-mic poetry hike and get inspired by your surroundings.</li><li>Salute the sun with Sunday morning yoga led by Naomi Hurley, perfect for beginners and veteran yogis alike.</li><li>Keep an eye out for Elvers the Clown, spreading mischief and sad clown melodies throughout the festival.</li></ul><p>There is always more to do and more to discover In My Backyard!</p></> },
    involved: { eyebrow: 'Join the community', title: 'Get Involved', intro: 'IMBY is only as successful as the community we have, and we’d love to have you join that community.', body: <><h2>Volunteer at IMBY</h2><p>IMBY is only as successful as the community we have, and we’d love to have you join that community. You will be getting in at the ground floor, helping create an experience for everyone to enjoy for years to come. Linked above are the positions we will need help with both during the festival and leading up to it.</p><p>Each volunteer will receive a free commemorative patch for their participation as a thank you. Please sign up here: <a href="https://www.signupgenius.com/go/20F0D4EA9AC29ABFEC34-65580751-imby#/" target="_blank" rel="noreferrer">IMBY volunteer signup</a>.</p><p>If you aren’t able to volunteer but still want to help out, please donate via Venmo or Cash App to @IMBYFEST, or email <a href="mailto:contact@imbyfest.com">contact@imbyfest.com</a> with any questions. Can’t wait to see you In My Backyard!</p><h2>About IWL</h2><p>IMBY is hosted on the grounds of the <a href="https://sites.google.com/view/iwla-loisgreensligochapter/home?pli=1&authuser=0" target="_blank" rel="noreferrer">Lois Green Chapter of the Izaak Walton League</a>, a local conservation group dedicated to preserving and enjoying the outdoors. The League helps make this festival possible through their stewardship of the land and their support of community-centered outdoor gathering.</p></> }
  }[section];

  return <main className="section-page"><header className="section-heading"><p>{content.eyebrow}</p><h1>{content.title}</h1><div>{content.intro}</div></header><article className="section-copy">{content.body}</article></main>;
}

function BuyTicketsView() {
  const [submissionState, setSubmissionState] = useState('idle');
  const [submissionError, setSubmissionError] = useState('');
  const [requestDetails, setRequestDetails] = useState({
    campsites: 0,
    parkingSpaces: 0,
    donationAmount: 0
  });

  const campsiteTotal = Number(requestDetails.campsites) * 25;
  const parkingTotal = Number(requestDetails.parkingSpaces) * 5;
  const donationTotal = Number(requestDetails.donationAmount || 0);
  const totalPrice = campsiteTotal + parkingTotal + donationTotal;

  const handleRequestDetailChange = (event) => {
    const { name, value } = event.target;
    setRequestDetails((prev) => ({
      ...prev,
      [name]: value === '' ? 0 : Number(value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionState('submitting');
    setSubmissionError('');

    try {
      const response = await fetch('https://formspree.io/f/mljelazg', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);
        const providerError = errorResponse?.errors?.map((error) => error.message).join(' ')
          || errorResponse?.message;
        throw new Error(providerError || `Formspree returned error ${response.status}.`);
      }

      form.reset();
      setSubmissionState('success');
    } catch (error) {
      setSubmissionError(error.message || 'Unable to reach Formspree.');
      setSubmissionState('error');
    }
  };

  return <main className="section-page ticket-page">
    <header className="section-heading"><p>Reserve your spot</p><h1>Get Tickets</h1><div>Tickets to IMBY Fest are pay-what-you-can, so everyone can be part of the festival.</div></header>
    <div className="ticket-layout">
      <article className="section-copy ticket-details">
        <h2>Pay what you can</h2>
        <p>Tickets to IMBY Fest are entirely pay-what-you-can donation based in order to let anyone and everyone be a part of the festival. We suggest a donation of <strong>$45 per person</strong> in order to properly compensate the artists, pay for utilities, and give back to our host venue. Every little bit you give will help IMBY grow to be bigger and better next year! Cash donations will also be accepted on site the day of the festival.</p>
        <h2>Parking and camping</h2>
        <p>In order to maximize space for activities, space for camping and parking is <strong>very limited</strong> and will cost <strong>$5 per car</strong> and <strong>$25 per campsite</strong>. Slots will fill up fast so we encourage you to purchase in advance.</p>
        <p>Please fill out the form with your name, email, desired camp sites and/or parking spaces and a Cash App or Venmo account. Once your form is processed, we will send you a payment request. Once your payment request has been fulfilled, your desired payment app will send you a confirmation email. <strong>PLEASE SAVE THIS EMAIL</strong> as it will serve as your proof of purchase. Do not accept payment requests from any account other than IMBYFEST as we are not responsible for online impersonators or fraudsters.</p>
        <h2>Parking</h2>
        <p>Parking passes may be purchased ahead of time to secure your spot, and available on site on a first come first serve basis. We encourage you to carpool, ride share, or even hike into the property!</p>
        <p>If for any reason camping or parking is not available to you and you have purchased a parking or camping pass ahead of time, please email <a href="mailto:support@imbyfest.com">support@imbyfest.com</a> and a full refund will be issued.</p>
        <h2>Camping</h2>
        <p>Pitch your own tent at one of our 2 different walk-up remote tent camping areas! Each campsite is reserved for <strong>$25</strong> and can fit up to <strong>4 people</strong>.</p>
        <p>Campsite sizes are all roughly 20’x10’, which generally allows for enough room for 1 tent and a small sitting area. There will be public fire pits available for cooking, making s’mores, or making friends!</p>
        <p>Because we have limited availability, reservations for camping are <em>required</em>. We cannot guarantee day-of campsite availability. Please email <a href="mailto:camping@imbyfest.com">camping@imbyfest.com</a> with the number of people in your party to reserve and purchase your camping pass!</p>
        <div className="stay-columns"><div><h3>Camp Redwood</h3><ul><li>Open to all ages, families, and those wanting a more quiet, sober experience</li><li>Quiet hours from 10:00pm - 8:00am</li><li><strong>Alcohol and substance use prohibited within campground</strong></li></ul></div><div><h3>Camp White Pine</h3><ul><li>18+ campers only</li><li>No enforced quiet hours, but we ask that you be respectful of your neighbors</li></ul></div></div>
        <p><em>Please note: while we do ask for quiet hours in Camp Redwood, the sites are close enough to the stage that music and lights may still affect your little ones or light sleepers. Plan accordingly and bring ear plugs, eye masks, or anything else you may need!</em></p>
        <p><strong>CAMPSITES ARE NOT CAR ACCESSIBLE:</strong> Volunteers and carts will be available to assist, but you will need to carry your own supplies from your car to the campsites. It is a short walk from the parking lot to Camp Redwood, and a slightly longer walk into the woods to Camp White Pine.</p>
        <p>Remote campsites <strong>do not have any power or water hookup</strong>. Running water, first aid, power, light and a shared bathroom and sink will be available at the pavilion. You will need to bring your own solution for bathing if desired.</p>
        <h2>Getting there</h2>
        <p><strong>Enter the following address into your maps app or atlas (if you’re really hardcore):</strong><br />8721 turkey thicket rd<br />Gaithersburg, MD 20879</p>
        <p>You will turn off of Snouffer School Rd onto Turkey Thicket Rd. You will see a large green sign for the Izaak Walton League. Pass a large building on the left and come to a fork in the road, where you’ll follow the small green IWLA signs to the right through the Izaak Walton League property gate. After getting on the gravel road, continue to the left up the hill until you reach the front gate. From there, parking assistants will show you where to park in the field. Please do not continue down the gravel road after passing through the gate as that will be a one way exit lane.</p>
      </article>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <h2>Camping & parking request</h2>
        <p>Complete the form and your request will be sent automatically to the IMBYfest team.</p>
        <label>Name<input name="name" type="text" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Desired campsite<select name="campsite" required defaultValue=""><option value="" disabled>Select a campsite</option><option>Camp Redwood</option><option>Camp White Pine</option></select></label>
        <label>Number of campsites<input name="campsites" type="number" min="0" required value={requestDetails.campsites} onChange={handleRequestDetailChange} /></label>
        <label>Number of parking spaces<input name="parkingSpaces" type="number" min="0" required value={requestDetails.parkingSpaces} onChange={handleRequestDetailChange} /></label>
        <label>Donation amount (optional)<input name="donationAmount" type="number" min="0" step="0.01" placeholder="0.00" value={requestDetails.donationAmount || ''} onChange={handleRequestDetailChange} /></label>
        <label>Venmo or Cash App account<input name="paymentAccount" type="text" required /></label>
        <div className="form-total" aria-live="polite">
          <div className="total-row">
            <span>Campsites</span>
            <span>${campsiteTotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Parking</span>
            <span>${parkingTotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Donation</span>
            <span>${donationTotal.toFixed(2)}</span>
          </div>
          <div className="total-divider" aria-hidden="true" />
          <div className="total-row total-row-grand">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button className="form-submit" type="submit" disabled={submissionState === 'submitting'}>{submissionState === 'submitting' ? 'Sending request...' : 'Send request'}</button>
        {submissionState === 'success' && <p className="form-message success-message" role="status">Thanks! Your request has been sent.</p>}
        {submissionState === 'error' && <p className="form-message error-message" role="alert">Something went wrong: {submissionError} Please try again or email support@imbyfest.com directly.</p>}
      </form>
    </div>
  </main>;
}

export default App;
