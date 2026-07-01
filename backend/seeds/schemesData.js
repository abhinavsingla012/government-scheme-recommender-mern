/**
 * Scheme Seed Data
 * 25 real Indian government schemes with detailed eligibility criteria
 */
module.exports = [
  {
    name: 'PM Kisan Samman Nidhi',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Agriculture',
    shortDescription:
      'Income support of ₹6,000 per year to eligible farmer families.',
    description:
      'Under this scheme, financial benefit of ₹6,000 per year is transferred in three equal installments of ₹2,000 every four months into the bank accounts of eligible farmers.',
    benefits: [
      '₹2,000 credited every 4 months (₹6,000/year total)',
      'Direct benefit transfer to Aadhaar-linked bank account',
      'Support for input costs like seeds, fertilizers',
    ],
    eligibility: {
      minAge: 18,
      maxIncome: null,
      occupations: ['Farmer'],
      states: [],
    },
    eligibilityText:
      'All landholding farmer families with cultivable land. Institutional landholders and higher income tax payers are excluded.',
    documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Passbook', 'Mobile Number'],
    applicationProcess:
      'Register on pmkisan.gov.in or visit nearest CSC / Village Revenue Officer.',
    applicationUrl: 'https://pmkisan.gov.in',
    deadline: 'Ongoing',
    launchYear: 2019,
  },
  {
    name: 'Ayushman Bharat - PMJAY',
    ministry: 'Ministry of Health & Family Welfare',
    category: 'Health',
    shortDescription:
      'Health cover of ₹5 lakh per family per year for secondary and tertiary care.',
    description:
      'Pradhan Mantri Jan Arogya Yojana provides a health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families.',
    benefits: [
      '₹5 lakh cashless treatment per family per year',
      'Covers 1,929 medical procedures',
      'Portable across India',
      'No cap on family size, age, or gender',
    ],
    eligibility: {
      maxIncome: 500000,
      categories: [],
      states: [],
    },
    eligibilityText:
      'Families identified as per SECC 2011 deprivation criteria. Verify eligibility on official portal.',
    documentsRequired: ['Aadhaar Card', 'Ration Card', 'SECC Verification'],
    applicationProcess: 'Check eligibility on pmjay.gov.in and visit empanelled hospitals.',
    applicationUrl: 'https://pmjay.gov.in',
    deadline: 'Ongoing',
    launchYear: 2018,
  },
  {
    name: 'Pradhan Mantri Awas Yojana (Urban)',
    ministry: 'Ministry of Housing & Urban Affairs',
    category: 'Housing',
    shortDescription: 'Affordable housing for urban poor with interest subsidy.',
    description:
      'Provides central assistance to urban local bodies to provide houses to all eligible families/beneficiaries by 2024. Includes credit-linked subsidy on home loans.',
    benefits: [
      'Interest subsidy up to ₹2.67 lakh on home loans',
      'Beneficiary-led construction assistance up to ₹1.5 lakh',
      'Preference to women, SC/ST, minorities',
    ],
    eligibility: {
      maxIncome: 1800000,
      categories: [],
      states: [],
    },
    eligibilityText:
      'EWS/LIG/MIG-I/MIG-II families with no pucca house. Annual household income up to ₹18 lakh.',
    documentsRequired: ['Aadhaar', 'Income Certificate', 'Bank Account', 'Address Proof'],
    applicationProcess: 'Apply online at pmaymis.gov.in or through your bank.',
    applicationUrl: 'https://pmaymis.gov.in',
    deadline: 'Ongoing',
    launchYear: 2015,
  },
  {
    name: 'Sukanya Samriddhi Yojana',
    ministry: 'Ministry of Finance',
    category: 'Women & Child',
    shortDescription:
      'Small deposit scheme for the girl child with high interest rate.',
    description:
      'A small savings scheme launched under Beti Bachao Beti Padhao campaign. Provides one of the highest interest rates for a small savings scheme.',
    benefits: [
      'Interest rate ~8.2% p.a. (revised quarterly)',
      'Tax benefit under Section 80C',
      'Partial withdrawal after 18 for education',
      'Full maturity at age 21',
    ],
    eligibility: {
      minAge: 0,
      maxAge: 10,
      gender: ['female'],
    },
    eligibilityText: 'Account can be opened for a girl child below 10 years of age.',
    documentsRequired: ['Birth Certificate of Girl', 'Guardian Aadhaar', 'Address Proof'],
    applicationProcess: 'Visit any authorized bank or India Post branch.',
    applicationUrl: 'https://www.indiapost.gov.in',
    deadline: 'Ongoing',
    launchYear: 2015,
  },
  {
    name: 'Pradhan Mantri Ujjwala Yojana',
    ministry: 'Ministry of Petroleum & Natural Gas',
    category: 'Social Welfare',
    shortDescription: 'Free LPG connection to women from BPL households.',
    description:
      'Provides free LPG connections to women from below-poverty-line families to reduce dependency on polluting cooking fuels.',
    benefits: [
      'Free LPG connection deposit',
      'First refill and stove free',
      'Subsidy on subsequent refills',
    ],
    eligibility: {
      minAge: 18,
      gender: ['female'],
      maxIncome: 250000,
    },
    eligibilityText: 'Adult woman belonging to a BPL family without an existing LPG connection.',
    documentsRequired: ['Aadhaar', 'Ration Card', 'Bank Passbook', 'BPL Certificate'],
    applicationProcess: 'Apply at nearest LPG distributor or on pmuy.gov.in.',
    applicationUrl: 'https://pmuy.gov.in',
    deadline: 'Ongoing',
    launchYear: 2016,
  },
  {
    name: 'National Scholarship (Post-Matric SC)',
    ministry: 'Ministry of Social Justice & Empowerment',
    category: 'Education',
    shortDescription:
      'Scholarship for SC students pursuing post-matriculation studies.',
    description:
      'Financial assistance to SC students studying at post-matriculation level to enable them to complete their education.',
    benefits: [
      'Maintenance allowance',
      'Tuition fee reimbursement',
      'Study tour charges, thesis typing charges',
    ],
    eligibility: {
      minAge: 15,
      maxIncome: 250000,
      categories: ['SC'],
      education: ['10th', '12th', 'Graduate', 'Post-Graduate', 'Diploma'],
    },
    eligibilityText:
      'SC student, parents/guardians annual income should not exceed ₹2.5 lakh. Studying post-matric course.',
    documentsRequired: ['Caste Certificate', 'Income Certificate', 'Marksheet', 'Aadhaar'],
    applicationProcess: 'Register on scholarships.gov.in (NSP portal).',
    applicationUrl: 'https://scholarships.gov.in',
    deadline: '31st October (Annual)',
    launchYear: 1944,
  },
  {
    name: 'National Scholarship (Post-Matric OBC)',
    ministry: 'Ministry of Social Justice & Empowerment',
    category: 'Education',
    shortDescription: 'Post-matric scholarship for OBC students.',
    description:
      'Financial assistance for OBC students to pursue post-matriculation education.',
    benefits: ['Tuition fees', 'Maintenance allowance', 'Book allowance'],
    eligibility: {
      minAge: 15,
      maxIncome: 150000,
      categories: ['OBC'],
      education: ['10th', '12th', 'Graduate', 'Post-Graduate'],
    },
    eligibilityText: 'OBC student with family income up to ₹1.5 lakh.',
    documentsRequired: ['OBC Certificate', 'Income Certificate', 'Marksheet', 'Aadhaar'],
    applicationProcess: 'Apply on scholarships.gov.in.',
    applicationUrl: 'https://scholarships.gov.in',
    deadline: '31st October (Annual)',
    launchYear: 1998,
  },
  {
    name: 'Skill India - PMKVY',
    ministry: 'Ministry of Skill Development & Entrepreneurship',
    category: 'Skill Development',
    shortDescription:
      'Free skill training and certification for Indian youth.',
    description:
      'Pradhan Mantri Kaushal Vikas Yojana provides free short-term skill training and monetary rewards on successful completion.',
    benefits: [
      'Free short-term training',
      'Nationally recognized certification',
      'Placement assistance',
      'Monetary reward for successful candidates',
    ],
    eligibility: {
      minAge: 15,
      maxAge: 45,
    },
    eligibilityText:
      'Indian citizens aged 15-45 who are unemployed, school/college dropouts.',
    documentsRequired: ['Aadhaar', 'Bank Details', 'Educational Certificate'],
    applicationProcess: 'Register at pmkvyofficial.org or nearest training center.',
    applicationUrl: 'https://www.pmkvyofficial.org',
    deadline: 'Ongoing',
    launchYear: 2015,
  },
  {
    name: 'Atal Pension Yojana',
    ministry: 'Ministry of Finance',
    category: 'Financial',
    shortDescription:
      'Guaranteed pension of ₹1,000-5,000 per month for unorganized sector workers.',
    description:
      'A pension scheme mainly targeted at the unorganized sector workers. Subscribers receive guaranteed minimum monthly pension after 60 years.',
    benefits: [
      'Guaranteed monthly pension ₹1,000 to ₹5,000',
      'Government co-contribution for eligible subscribers',
      'Nominee gets full amount on subscriber demise',
    ],
    eligibility: {
      minAge: 18,
      maxAge: 40,
    },
    eligibilityText:
      'Indian citizens aged 18-40 with a bank/post office savings account.',
    documentsRequired: ['Aadhaar', 'Bank Account', 'Mobile Number'],
    applicationProcess: 'Visit your bank or apply through net banking.',
    applicationUrl: 'https://www.npscra.nsdl.co.in',
    deadline: 'Ongoing',
    launchYear: 2015,
  },
  {
    name: 'MUDRA Yojana',
    ministry: 'Ministry of Finance',
    category: 'Financial',
    shortDescription:
      'Collateral-free loans up to ₹10 lakh for small businesses and micro enterprises.',
    description:
      'Pradhan Mantri MUDRA Yojana offers loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises via banks and MFIs.',
    benefits: [
      'Shishu loans up to ₹50,000',
      'Kishor loans ₹50,001 to ₹5 lakh',
      'Tarun loans ₹5 lakh to ₹10 lakh',
      'No collateral required',
    ],
    eligibility: {
      minAge: 18,
      occupations: ['Self-Employed', 'Business Owner', 'Entrepreneur'],
    },
    eligibilityText:
      'Indian citizens involved in small business, trading, manufacturing, or services.',
    documentsRequired: ['Aadhaar', 'PAN', 'Business Proof', 'Address Proof', 'Bank Statement'],
    applicationProcess:
      'Apply at any bank, NBFC, or on udyamimitra.in portal.',
    applicationUrl: 'https://www.mudra.org.in',
    deadline: 'Ongoing',
    launchYear: 2015,
  },
  {
    name: 'Stand Up India',
    ministry: 'Ministry of Finance',
    category: 'Financial',
    shortDescription:
      'Bank loans between ₹10 lakh and ₹1 crore for SC/ST/Women entrepreneurs.',
    description:
      'Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.',
    benefits: [
      'Loan ₹10 lakh to ₹1 crore',
      'Composite loan covering 75% of project cost',
      '7 years tenure with 18 months moratorium',
    ],
    eligibility: {
      minAge: 18,
      categories: ['SC', 'ST'],
      occupations: ['Entrepreneur', 'Self-Employed'],
    },
    eligibilityText:
      'SC/ST and/or Women entrepreneurs above 18 years for greenfield enterprise.',
    documentsRequired: ['Aadhaar', 'Caste Certificate', 'Project Report', 'Bank KYC'],
    applicationProcess: 'Apply on standupmitra.in or at bank branch.',
    applicationUrl: 'https://www.standupmitra.in',
    deadline: 'Ongoing',
    launchYear: 2016,
  },
  {
    name: 'MGNREGA - Rural Employment',
    ministry: 'Ministry of Rural Development',
    category: 'Employment',
    shortDescription:
      'Guaranteed 100 days of wage employment per year to rural households.',
    description:
      'Mahatma Gandhi National Rural Employment Guarantee Act provides a legal guarantee for 100 days of employment in every financial year to adult members of any rural household willing to do public work.',
    benefits: [
      '100 days guaranteed wage employment',
      'Wage payment directly to bank/post office',
      'Unemployment allowance if work not provided in 15 days',
    ],
    eligibility: {
      minAge: 18,
      occupations: ['Unemployed', 'Labourer', 'Farmer'],
    },
    eligibilityText:
      'Adult members of rural households willing to do unskilled manual work.',
    documentsRequired: ['Aadhaar', 'Ration Card', 'Bank/Post Office Account'],
    applicationProcess:
      'Apply for job card at Gram Panchayat office.',
    applicationUrl: 'https://nrega.nic.in',
    deadline: 'Ongoing',
    launchYear: 2005,
  },
  {
    name: 'National Pension System (NPS)',
    ministry: 'Ministry of Finance',
    category: 'Financial',
    shortDescription:
      'Voluntary retirement savings scheme with tax benefits.',
    description:
      'A voluntary, defined-contribution retirement savings scheme designed to enable systematic savings during working life.',
    benefits: [
      'Tax benefit under 80CCD(1B) up to ₹50,000 additional',
      'Market-linked returns',
      'Portable across jobs and locations',
      'Regular pension after retirement',
    ],
    eligibility: {
      minAge: 18,
      maxAge: 70,
    },
    eligibilityText: 'Any Indian citizen (resident/NRI) between 18-70 years.',
    documentsRequired: ['Aadhaar', 'PAN', 'Bank Account', 'Address Proof'],
    applicationProcess: 'Register on enps.nsdl.com or via banks.',
    applicationUrl: 'https://enps.nsdl.com',
    deadline: 'Ongoing',
    launchYear: 2004,
  },
  {
    name: 'PM Vishwakarma Yojana',
    ministry: 'Ministry of Micro, Small & Medium Enterprises',
    category: 'Employment',
    shortDescription:
      'Support for traditional artisans and craftsmen with tools, skill training and credit.',
    description:
      'Aims to provide end-to-end holistic support to artisans and craftspeople through toolkits, credit support, skill upgradation, and market linkage.',
    benefits: [
      'Toolkit incentive of ₹15,000',
      'Skill training with ₹500/day stipend',
      'Collateral-free credit up to ₹3 lakh at 5% interest',
      'PM Vishwakarma Certificate & ID card',
    ],
    eligibility: {
      minAge: 18,
      occupations: [
        'Carpenter',
        'Blacksmith',
        'Goldsmith',
        'Potter',
        'Weaver',
        'Barber',
        'Cobbler',
        'Tailor',
        'Mason',
      ],
    },
    eligibilityText:
      'Artisans and craftspeople from 18 recognized trades. Must be 18+ years.',
    documentsRequired: ['Aadhaar', 'Trade Proof', 'Bank Account', 'Mobile Number'],
    applicationProcess: 'Register at pmvishwakarma.gov.in or nearest CSC.',
    applicationUrl: 'https://pmvishwakarma.gov.in',
    deadline: 'Ongoing',
    launchYear: 2023,
  },
  {
    name: 'Beti Bachao Beti Padhao',
    ministry: 'Ministry of Women & Child Development',
    category: 'Women & Child',
    shortDescription:
      "Campaign for the survival, protection and education of the girl child.",
    description:
      "A national initiative to address issues of declining Child Sex Ratio and empower girls through education and welfare programs.",
    benefits: [
      'Awareness and advocacy programs',
      'Access to health & nutrition services for girls',
      'Convergence with Sukanya Samriddhi & scholarships',
    ],
    eligibility: {
      gender: ['female'],
      minAge: 0,
      maxAge: 18,
    },
    eligibilityText: 'All girl children in India, particularly focus on 640 districts.',
    documentsRequired: ['Birth Certificate', 'Aadhaar (if available)'],
    applicationProcess:
      'Contact your local Anganwadi / district administration.',
    applicationUrl: 'https://wcd.nic.in',
    deadline: 'Ongoing',
    launchYear: 2015,
  },
  {
    name: 'National Old Age Pension Scheme',
    ministry: 'Ministry of Rural Development',
    category: 'Senior Citizen',
    shortDescription:
      'Monthly pension for senior citizens from BPL households.',
    description:
      'Provides monthly pension to persons aged 60 years and above belonging to households below the poverty line.',
    benefits: [
      '₹200/month for 60-79 age group',
      '₹500/month for 80+ age group',
      'Direct benefit transfer to bank account',
    ],
    eligibility: {
      minAge: 60,
      maxIncome: 100000,
    },
    eligibilityText:
      'Persons aged 60 or above belonging to BPL households as per criteria.',
    documentsRequired: ['Aadhaar', 'Age Proof', 'BPL Card', 'Bank Passbook'],
    applicationProcess: 'Apply at Gram Panchayat or Block Development Office.',
    applicationUrl: 'https://nsap.nic.in',
    deadline: 'Ongoing',
    launchYear: 1995,
  },
  {
    name: 'PM Fasal Bima Yojana',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Agriculture',
    shortDescription:
      'Comprehensive crop insurance to farmers against natural calamities.',
    description:
      'Provides insurance cover and financial support to farmers in case of failure of any of the notified crops due to natural calamities, pests & diseases.',
    benefits: [
      'Low premium (1.5-2% for farmers, rest subsidized)',
      'Covers pre-sowing to post-harvest losses',
      'Quick claim settlement',
    ],
    eligibility: {
      minAge: 18,
      occupations: ['Farmer'],
    },
    eligibilityText:
      'All farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.',
    documentsRequired: ['Aadhaar', 'Land Records', 'Bank Account', 'Sowing Certificate'],
    applicationProcess:
      'Apply through banks, CSCs, insurance agents, or pmfby.gov.in.',
    applicationUrl: 'https://pmfby.gov.in',
    deadline: 'Before sowing season (Kharif/Rabi)',
    launchYear: 2016,
  },
  {
    name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    ministry: 'Ministry of Rural Development',
    category: 'Skill Development',
    shortDescription:
      'Placement-linked skill development for rural poor youth.',
    description:
      'Aims to provide skill training to rural poor youth aged 15-35 years and place them in wage employment.',
    benefits: [
      'Free skill training',
      'Boarding & lodging support',
      'Placement in jobs after training',
      'Post-placement support',
    ],
    eligibility: {
      minAge: 15,
      maxAge: 35,
      maxIncome: 300000,
    },
    eligibilityText:
      'Rural poor youth aged 15-35 years. Age limit relaxed to 45 for women, PwD, and other special categories.',
    documentsRequired: ['Aadhaar', 'Income Certificate', 'Educational Certificate'],
    applicationProcess: 'Contact PIA (Program Implementing Agency) or DDU-GKY office.',
    applicationUrl: 'https://ddugky.gov.in',
    deadline: 'Ongoing',
    launchYear: 2014,
  },
  {
    name: 'Janani Suraksha Yojana',
    ministry: 'Ministry of Health & Family Welfare',
    category: 'Health',
    shortDescription:
      'Cash assistance to pregnant women for institutional delivery.',
    description:
      'Safe motherhood intervention promoting institutional delivery among poor pregnant women.',
    benefits: [
      '₹1,400 for rural / ₹1,000 for urban delivery',
      'ASHA worker incentive',
      'Free ante-natal check-ups',
    ],
    eligibility: {
      gender: ['female'],
      minAge: 18,
      maxIncome: 200000,
      maritalStatus: ['Married'],
    },
    eligibilityText:
      'Pregnant women from BPL households, especially in Low Performing States.',
    documentsRequired: ['Aadhaar', 'BPL Card', 'Antenatal Card', 'Bank Passbook'],
    applicationProcess: 'Contact nearest PHC / ASHA worker / govt hospital.',
    applicationUrl: 'https://nhm.gov.in',
    deadline: 'Ongoing',
    launchYear: 2005,
  },
  {
    name: 'Startup India Seed Fund',
    ministry: 'Department for Promotion of Industry and Internal Trade',
    category: 'Employment',
    shortDescription:
      'Financial assistance to startups for proof of concept, prototype and market entry.',
    description:
      'Provides financial assistance to eligible startups through incubators across India for early stage funding.',
    benefits: [
      'Grants up to ₹20 lakh for prototype/PoC',
      'Investment up to ₹50 lakh through convertible debentures',
      'Access to incubators',
    ],
    eligibility: {
      minAge: 18,
      occupations: ['Entrepreneur', 'Self-Employed'],
    },
    eligibilityText:
      'DPIIT-recognized startups incorporated not more than 2 years ago at time of application.',
    documentsRequired: ['DPIIT Recognition', 'Company Docs', 'PAN', 'Business Plan'],
    applicationProcess: 'Apply at seedfund.startupindia.gov.in.',
    applicationUrl: 'https://seedfund.startupindia.gov.in',
    deadline: 'Ongoing',
    launchYear: 2021,
  },
  {
    name: 'Rashtriya Vayoshri Yojana',
    ministry: 'Ministry of Social Justice & Empowerment',
    category: 'Senior Citizen',
    shortDescription:
      'Free assistive devices for BPL senior citizens with age-related disabilities.',
    description:
      'Provides physical aids and assisted living devices to senior citizens belonging to BPL category who suffer from age-related disabilities.',
    benefits: [
      'Free walking sticks, wheelchairs, hearing aids',
      'Spectacles, dentures, artificial limbs',
      'Free distribution camps',
    ],
    eligibility: {
      minAge: 60,
      maxIncome: 150000,
      disabilityRequired: true,
    },
    eligibilityText:
      'Senior citizens aged 60+ from BPL households with age-related physical disability.',
    documentsRequired: ['Aadhaar', 'BPL Card', 'Medical Certificate', 'Age Proof'],
    applicationProcess: 'Contact District Social Welfare Office or ALIMCO camp.',
    applicationUrl: 'https://socialjustice.gov.in',
    deadline: 'Camp-based',
    launchYear: 2017,
  },
  {
    name: 'National Family Benefit Scheme',
    ministry: 'Ministry of Rural Development',
    category: 'Social Welfare',
    shortDescription:
      'Lump sum of ₹20,000 to BPL family on death of primary breadwinner.',
    description:
      'Provides ₹20,000 lump sum assistance to bereaved households in case of death of the primary breadwinner (age 18-59).',
    benefits: ['One-time payment of ₹20,000 to family', 'Direct credit to bank account'],
    eligibility: {
      maxIncome: 100000,
    },
    eligibilityText:
      'BPL household where primary earning member (18-59 years) has passed away.',
    documentsRequired: ['Death Certificate', 'BPL Card', 'Aadhaar', 'Bank Passbook'],
    applicationProcess: 'Apply at Gram Panchayat / Block office within 1 year of death.',
    applicationUrl: 'https://nsap.nic.in',
    deadline: 'Within 1 year of death',
    launchYear: 1995,
  },
  {
    name: 'Digital India Internship',
    ministry: 'Ministry of Electronics & Information Technology',
    category: 'Education',
    shortDescription:
      'Internship program for students in Digital India initiatives.',
    description:
      'Two-month internship program offered by MeitY for undergraduate/postgraduate students.',
    benefits: ['Stipend of ₹10,000 per month', 'Certificate of internship', 'Exposure to govt tech'],
    eligibility: {
      minAge: 18,
      maxAge: 27,
      education: ['Graduate', 'Post-Graduate'],
    },
    eligibilityText: 'Students in final year of graduation/post-graduation aged up to 27.',
    documentsRequired: ['Educational Certificate', 'Aadhaar', 'Bonafide Certificate'],
    applicationProcess: 'Apply on internship.meity.gov.in.',
    applicationUrl: 'https://internship.meity.gov.in',
    deadline: 'Bi-annual notification',
    launchYear: 2019,
  },
  {
    name: 'Kisan Credit Card (KCC)',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Agriculture',
    shortDescription:
      'Short-term credit for farmers for crop production and allied activities.',
    description:
      'Provides short-term formal credit to farmers to meet cultivation costs including inputs, harvesting and post-harvest expenses.',
    benefits: [
      'Credit limit based on land holding & cropping pattern',
      'Interest subvention of 2%',
      'Additional 3% prompt repayment incentive',
      'Insurance coverage of ₹2 lakh',
    ],
    eligibility: {
      minAge: 18,
      occupations: ['Farmer'],
    },
    eligibilityText:
      'All farmers - individual/joint borrowers who are owner cultivators, tenant farmers, sharecroppers.',
    documentsRequired: ['Aadhaar', 'Land Records', 'Bank Passbook', 'Passport Photo'],
    applicationProcess: 'Apply at any bank branch.',
    applicationUrl: 'https://pmkisan.gov.in',
    deadline: 'Ongoing',
    launchYear: 1998,
  },
  {
    name: 'PM SVANidhi',
    ministry: 'Ministry of Housing & Urban Affairs',
    category: 'Financial',
    shortDescription:
      'Micro-credit scheme for street vendors to resume their businesses.',
    description:
      'Provides affordable working capital loans to street vendors to help them restart livelihoods after COVID-19.',
    benefits: [
      'Initial working capital of ₹10,000',
      '₹20,000 in second tranche, ₹50,000 in third',
      '7% interest subsidy',
      'Cashback for digital transactions',
    ],
    eligibility: {
      minAge: 18,
      occupations: ['Street Vendor', 'Self-Employed'],
    },
    eligibilityText:
      'Street vendors in urban areas as identified in survey / with certificate of vending.',
    documentsRequired: ['Aadhaar', 'Vendor Certificate', 'Bank Account'],
    applicationProcess: 'Apply at pmsvanidhi.mohua.gov.in or nearest bank.',
    applicationUrl: 'https://pmsvanidhi.mohua.gov.in',
    deadline: 'Ongoing',
    launchYear: 2020,
  },
];
