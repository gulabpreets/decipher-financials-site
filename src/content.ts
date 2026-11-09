export const EMAIL = 'hello@decipherfinancials.com';

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Insights', href: '#insights' },
  { label: 'Careers', href: '#careers' },
];

export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/decipherfinancials/' },
  { label: 'Instagram', href: 'https://www.instagram.com/decipher.financials/' },
];

export const STATS = [
  { value: '24', unit: 'hr', label: ['Continuous workflow', 'across time zones'] },
  { value: '360', unit: '°', label: ['Support across the', 'investment lifecycle'] },
  { value: 'ISO', unit: '', label: ['27001:2022 certified', 'information security'] },
];

export const CAPABILITIES = [
  { title: 'Portfolio Management & Financial Modelling', icon: 'hexagon', points: ['Financial statement analysis & forecasting', 'Trading and transaction comparables', 'Discounted cash flow modelling'] },
  { title: 'Financial Research', icon: 'diamond', points: ['Equity, fixed income & credit research', 'Quarterly earnings reports', 'Investment memorandums & fund factsheets'] },
  { title: 'Business Research', icon: 'hexagon', points: ['Industry research & competitive landscaping', 'Detailed company profiling', 'Board materials & market insights'] },
  { title: 'Asset Management Support', icon: 'diamond', points: ['KYC & client due diligence', 'RFP and onboarding support', 'Data management & presentations'] },
  { title: 'Accounting', icon: 'hexagon', points: ['Month-end close & reconciliation', 'Accounts payable & receivable', 'Treasury operations & audit support'] },
  { title: 'Automation', icon: 'diamond', points: ['Automation of repetitive tasks', 'Data mining and analysis', 'BDC data analysis & visualisation'] },
] as const;

export const CAPABILITY_SUMMARY = 'Decision-ready work built on disciplined analysis, accuracy and ownership.';

export const ADVANTAGES = [
  { title: 'Ownership, end to end', body: 'We approach every mandate as an extension of your team, accountable for every detail and deadline.' },
  { title: 'Your next workday starts ahead', body: 'Work assigned during your hours is delivered before the following workday, enabling a near 24-hour operating rhythm.' },
  { title: 'Security at the core', body: 'ISO/IEC 27001:2022 certified systems and robust controls protect your information across every engagement.' },
];

export const INSIGHTS = [
  { tone: 'navy', category: 'Private markets', date: '15 Apr 2026', title: 'Co-investments vs. club deals: understanding shared investment' },
  { tone: 'peri', category: 'Private credit', date: '25 Mar 2026', title: 'Direct lending and syndicated loans: where they differ' },
  { tone: 'pale', category: 'Market intelligence', date: '02 Mar 2026', title: 'The metrics behind sustainable BDC dividend strategies' },
] as const;
