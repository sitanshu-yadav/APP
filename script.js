// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('loader-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    initPage();
                }, 500);
            }, 500);
        }
    }, 100);
});

function initPage() {
    // Initialize Google Maps
    initMap();
    
    // Initialize Calendar
    initCalendar();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(26, 37, 48, 0.95))';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.padding = '1rem 0';
            header.style.background = 'linear-gradient(135deg, var(--primary), #1a2530)';
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        }
    });

    // Animation on Scroll
    const animateElements = document.querySelectorAll('.animate-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
// Testimonial Slider
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        testimonialSlides[index].classList.add('active');
        navDots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Add click event listeners to navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Clear auto-slide interval when user manually changes slide
            clearInterval(slideInterval);
            
            // Show selected slide
            showSlide(index);
            
            // Restart auto-slide after manual interaction
            startAutoSlide();
        });
    });
    
    // Auto slide function
    function startAutoSlide() {
        clearInterval(slideInterval); // Clear any existing interval
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause auto slide on hover, resume on mouse leave
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
}

// Make sure to call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing loading code ...
    
    // After loading is complete, initialize all components
    setTimeout(function() {
        initTestimonialSlider(); // Initialize testimonial slider
        initCalendar(); // Initialize calendar
        // ... any other initializations
    }, 1500);
});


    
    // Stats Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('id') === 'books-count' ? '1000' : 
                                counter.getAttribute('id') === 'customers-count' ? '5000' : '10');
            const duration = 2000;
            const step = target / (duration / 16);
            let count = 0;
            
            const updateCount = () => {
                count += step;
                if (count < target) {
                    counter.textContent = Math.floor(count) + (counter.getAttribute('id') === 'years-count' ? '+' : '+');
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + (counter.getAttribute('id') === 'years-count' ? '+' : '+');
                }
            };
            
            updateCount();
        });
    }
    
    // Trigger counter animation when about section is in view
    const aboutSection = document.querySelector('.about');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && phone && message) {
            alert(`Thank you, ${name}! Your message has been sent successfully. We will contact you soon at ${phone} or ${email}.`);
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Interactive Book Cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Feature Cards Interaction
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Add click event to logo to go to homepage
    document.getElementById('home-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.getElementById('footer-home-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Google Maps Initialization
function initMap() {
    // Siraha, Nepal coordinates
    const sirahaCoords = { lat: 26.7500, lng: 86.2500 };
    
    // Create a map centered on Siraha
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 15,
        center: sirahaCoords,
        mapTypeId: "roadmap",
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });

    // Add a marker for Anshu Pustak Pashal
    const marker = new google.maps.Marker({
        position: sirahaCoords,
        map: map,
        title: "Anshu Pustak Pashal",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#e74c3c",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2
        }
    });

    // Add an info window
    const infoWindow = new google.maps.InfoWindow({
        content: "<div class='info-window'><h3>Anshu Pustak Pashal</h3><p>Golbazar (Asanpur Rd), Q8PH+GJ2 / Q8PH+GHP, Golbazar 56500, Siraha, Nepal</p><p>Phone: +977 984-2903471</p></div>"
    });

    // Open info window when marker is clicked
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

// Calendar Functionality
function initCalendar() {
    const monthYearElement = document.getElementById('calendar-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Get the calendar grid element
    const calendarGrid = document.querySelector('.calendar-grid');
    
    // Store current date
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Generate calendar for a specific month and year
    function generateCalendar(month, year) {
        // First, remove all existing day elements (keeping the 7 day headers)
        const dayElements = document.querySelectorAll('.calendar-grid .calendar-day');
        dayElements.forEach(day => day.remove());
        
        // Update the month and year display
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        // Calculate the first day of the month (0 = Sunday, 1 = Monday, etc.)
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        
        // Calculate the number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get today's date for highlighting
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const todayDate = today.getDate();
        
        // Add blank cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const blankDay = document.createElement('div');
            blankDay.className = 'calendar-day';
            blankDay.style.backgroundColor = 'transparent';
            calendarGrid.appendChild(blankDay);
        }
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Highlight today's date if it's in the current month
            if (isCurrentMonth && day === todayDate) {
                dayCell.classList.add('today');
            }
            
            // Add click event to highlight selected date
            dayCell.addEventListener('click', function() {
                // Remove highlight from all days
                document.querySelectorAll('.calendar-day').forEach(d => {
                    if (!d.classList.contains('today')) {
                        d.style.backgroundColor = '';
                        d.style.transform = '';
                    }
                });
                
                // Highlight the clicked day
                this.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
                this.style.transform = 'scale(1.1)';
            });
            
            // Add hover effect
            dayCell.addEventListener('mouseenter', function() {
                if (!this.classList.contains('today')) {
                    this.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
                }
            });
            
            dayCell.addEventListener('mouseleave', function() {
                if (!this.classList.contains('today') && !this.style.backgroundColor.includes('rgba(52, 152, 219, 0.3)')) {
                    this.style.backgroundColor = '';
                }
            });
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Generate calendar for the current month initially
    generateCalendar(currentMonth, currentYear);
    
    // Add event listeners for navigation buttons
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
}

// Make sure to call initCalendar when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing loading code ...
    
    // After loading is complete, initialize the calendar
    setTimeout(function() {
        initCalendar();
    }, 1500);
});
