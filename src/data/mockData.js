export const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Sharma",
        specialization: "Cardiologist",
        hospital: "City General Hospital",
        available: true,
        rating: 4.8,
        distance: "2.5 km"
    },
    {
        id: 2,
        name: "Dr. Rajesh Gupta",
        specialization: "General Physician",
        hospital: "Sunrise Clinic",
        available: true,
        rating: 4.5,
        distance: "1.2 km"
    },
    {
        id: 3,
        name: "Dr. Emily Chen",
        specialization: "Pediatrician",
        hospital: "City General Hospital",
        available: false,
        rating: 4.9,
        distance: "2.5 km"
    },
    {
        id: 4,
        name: "Dr. Michael Brown",
        specialization: "Dermatologist",
        hospital: "Skin Care Center",
        available: true,
        rating: 4.7,
        distance: "4.0 km"
    },
    {
        id: 5,
        name: "Dr. Anjali Desai",
        specialization: "Gynecologist",
        hospital: "Women's Wellness Hub",
        available: true,
        rating: 4.9,
        distance: "3.2 km"
    }
];

export const hospitals = [
    {
        id: 1,
        name: "City General Hospital",
        lat: 19.0760,
        lng: 72.8777,
        status: "Available", // Green
        address: "123 Main St, Central District",
        distance: "2.5 km",
        beds: 45
    },
    {
        id: 2,
        name: "Sunrise Clinic",
        lat: 19.0800,
        lng: 72.8800,
        status: "Limited", // Orange
        address: "45 Park Ave, North Zone",
        distance: "1.2 km",
        beds: 12
    },
    {
        id: 3,
        name: "Metro Specialty Hospital",
        lat: 19.0700,
        lng: 72.8700,
        status: "Full", // Red
        address: "88 Broadway, South Sector",
        distance: "5.0 km",
        beds: 0
    }
];

export const alerts = [
    {
        id: 1,
        title: "Flu Season Advisory",
        description: "Cases of seasonal flu are rising. Please wear masks in crowded areas.",
        level: "warning",
        date: "2023-10-25"
    },
    {
        id: 2,
        title: "Vaccination Drive",
        description: "Free polio vaccination camp at City General Hospital this Sunday.",
        level: "normal",
        date: "2023-10-24"
    },
    {
        id: 3,
        title: "Dengue Prevention",
        description: "Ensure no stagnant water in your surroundings to prevent mosquito breeding.",
        level: "warning",
        date: "2023-10-20"
    }
];

export const userProfile = {
    name: "Soham Munde",
    email: "soham@example.com",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    appointments: [
        {
            id: 101,
            doctor: "Dr. Sarah Sharma",
            date: "2023-10-28",
            time: "10:30 AM",
            status: "Confirmed"
        },
        {
            id: 102,
            doctor: "Dr. Rajesh Gupta",
            date: "2023-10-15",
            time: "02:00 PM",
            status: "Completed"
        }
    ]
};

// Health tips / articles (Practo, Apollo style)
export const healthTips = [
    { id: 1, title: "5 signs you need to see a cardiologist", excerpt: "Chest pain, shortness of breath, and fatigue could mean more than stress.", readTime: "3 min", category: "Heart" },
    { id: 2, title: "How to manage diabetes at home", excerpt: "Diet, exercise and monitoring – a simple guide for daily care.", readTime: "5 min", category: "Lifestyle" },
    { id: 3, title: "When to get a full body checkup", excerpt: "Age and risk-based guidelines for preventive health checks.", readTime: "4 min", category: "Prevention" },
    { id: 4, title: "Best time to take vitamins", excerpt: "Morning or night? Food or empty stomach? Here's what works.", readTime: "2 min", category: "Nutrition" },
    { id: 5, title: "Sleep hygiene: 7 tips for better rest", excerpt: "Small changes that can improve your sleep quality.", readTime: "4 min", category: "Lifestyle" },
];

// Offers / deals (1mg, Apollo style)
export const offers = [
    { id: 1, title: "Flat 20% off on first medicine order", code: "HEALTH20", validTill: "Dec 31, 2025" },
    { id: 2, title: "Free home collection for lab tests", code: "LABFREE", validTill: "Ongoing" },
    { id: 3, title: "Doctor consultation at ₹99", code: "CONSULT99", validTill: "This week" },
];

// Lab test packages (Apollo, Thyrocare style)
export const labTestPackages = [
    { id: 1, name: "Complete Blood Count (CBC)", price: 299, originalPrice: 499, tests: "20+ parameters" },
    { id: 2, name: "Full Body Checkup", price: 999, originalPrice: 1499, tests: "60+ parameters", popular: true },
    { id: 3, name: "Thyroid Profile", price: 449, originalPrice: 599, tests: "TSH, T3, T4" },
    { id: 4, name: "Diabetes Screening", price: 399, originalPrice: 549, tests: "FBS, HbA1c" },
    { id: 5, name: "Liver Function Test", price: 399, originalPrice: 549, tests: "8 parameters" },
    { id: 6, name: "Vitamin D & B12", price: 599, originalPrice: 799, tests: "2 tests" },
];

// Medicine categories / popular (1mg style)
export const medicineCategories = [
    { id: 1, name: "Vitamins & Supplements", icon: "💊" },
    { id: 2, name: "Diabetes Care", icon: "🩸" },
    { id: 3, name: "Pain & Fever", icon: "🌡️" },
    { id: 4, name: "Digestion", icon: "🫀" },
    { id: 5, name: "Skin & Hair", icon: "✨" },
    { id: 6, name: "Cold & Cough", icon: "🤧" },
];

export const popularMedicines = [
    { id: 1, name: "Paracetamol 500mg", category: "Pain & Fever", price: 25 },
    { id: 2, name: "Vitamin D3 60K", category: "Vitamins", price: 89 },
    { id: 3, name: "Cetirizine 10mg", category: "Allergy", price: 35 },
    { id: 4, name: "Omeprazole 20mg", category: "Digestion", price: 45 },
];

// Emergency (SOS, ambulance)
export const emergencyContacts = [
    { name: "Emergency", number: "112", type: "National" },
    { name: "Ambulance", number: "102", type: "Medical" },
    { name: "Police", number: "100", type: "Police" },
];
