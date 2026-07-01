/**
 * Dummy Users Seed Data
 * Realistic sample citizens with varied profiles for demonstration purposes.
 * All accounts use password "User@123"
 */
module.exports = [
  {
    name: 'Ramesh Kumar',
    email: 'ramesh.farmer@demo.in',
    profile: {
      age: 45, gender: 'male', occupation: 'Farmer', annualIncome: 80000,
      education: '10th', state: 'Bihar', district: 'Patna',
      category: 'OBC', maritalStatus: 'Married', disability: false,
    },
    bookmarkNames: ['PM Kisan Samman Nidhi', 'Kisan Credit Card (KCC)', 'PM Fasal Bima Yojana'],
  },
  {
    name: 'Priya Sharma',
    email: 'priya.student@demo.in',
    profile: {
      age: 20, gender: 'female', occupation: 'Student', annualIncome: 250000,
      education: 'Graduate', state: 'Delhi', district: 'New Delhi',
      category: 'General', maritalStatus: 'Single', disability: false,
    },
    bookmarkNames: ['Digital India Internship', 'Sukanya Samriddhi Yojana'],
  },
  {
    name: 'Sunita Devi',
    email: 'sunita.home@demo.in',
    profile: {
      age: 32, gender: 'female', occupation: 'Homemaker', annualIncome: 60000,
      education: '12th', state: 'Uttar Pradesh', district: 'Lucknow',
      category: 'SC', maritalStatus: 'Married', disability: false,
    },
    bookmarkNames: ['Pradhan Mantri Ujjwala Yojana', 'Janani Suraksha Yojana', 'Ayushman Bharat - PMJAY'],
  },
  {
    name: 'Ravi Patel',
    email: 'ravi.business@demo.in',
    profile: {
      age: 35, gender: 'male', occupation: 'Business Owner', annualIncome: 500000,
      education: 'Post-Graduate', state: 'Gujarat', district: 'Ahmedabad',
      category: 'General', maritalStatus: 'Married', disability: false,
    },
    bookmarkNames: ['MUDRA Yojana', 'Startup India Seed Fund', 'Atal Pension Yojana'],
  },
  {
    name: 'Lakshmi Nair',
    email: 'lakshmi.senior@demo.in',
    profile: {
      age: 68, gender: 'female', occupation: 'Retired', annualIncome: 40000,
      education: 'Graduate', state: 'Karnataka', district: 'Bengaluru',
      category: 'ST', maritalStatus: 'Widowed', disability: false,
    },
    bookmarkNames: ['National Old Age Pension Scheme', 'Ayushman Bharat - PMJAY'],
  },
  {
    name: 'Amit Verma',
    email: 'amit.salaried@demo.in',
    profile: {
      age: 28, gender: 'male', occupation: 'Salaried', annualIncome: 800000,
      education: 'Post-Graduate', state: 'Maharashtra', district: 'Mumbai',
      category: 'General', maritalStatus: 'Single', disability: false,
    },
    bookmarkNames: ['National Pension System (NPS)', 'Pradhan Mantri Awas Yojana (Urban)'],
  },
  {
    name: 'Meera Devi',
    email: 'meera.weaver@demo.in',
    profile: {
      age: 40, gender: 'female', occupation: 'Weaver', annualIncome: 90000,
      education: '10th', state: 'West Bengal', district: 'Kolkata',
      category: 'OBC', maritalStatus: 'Married', disability: false,
    },
    bookmarkNames: ['PM Vishwakarma Yojana', 'Stand Up India', 'MUDRA Yojana'],
  },
  {
    name: 'Rahul Singh',
    email: 'rahul.unemployed@demo.in',
    profile: {
      age: 24, gender: 'male', occupation: 'Unemployed', annualIncome: 100000,
      education: 'Graduate', state: 'Punjab', district: 'Ludhiana',
      category: 'EWS', maritalStatus: 'Single', disability: false,
    },
    bookmarkNames: ['Skill India - PMKVY', 'MGNREGA - Rural Employment', 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana'],
  },
  {
    name: 'Kavita Rathore',
    email: 'kavita.widow@demo.in',
    profile: {
      age: 55, gender: 'female', occupation: 'Homemaker', annualIncome: 50000,
      education: 'Below 10th', state: 'Rajasthan', district: 'Jaipur',
      category: 'SC', maritalStatus: 'Widowed', disability: false,
    },
    bookmarkNames: ['National Family Benefit Scheme', 'Ayushman Bharat - PMJAY'],
  },
  {
    name: 'Sanjeev Kumar',
    email: 'sanjeev.vendor@demo.in',
    profile: {
      age: 38, gender: 'male', occupation: 'Street Vendor', annualIncome: 120000,
      education: '12th', state: 'Madhya Pradesh', district: 'Bhopal',
      category: 'OBC', maritalStatus: 'Married', disability: false,
    },
    bookmarkNames: ['PM SVANidhi', 'MUDRA Yojana'],
  },
];
