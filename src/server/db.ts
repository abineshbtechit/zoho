import { Donor, Recipient, Match, ActivityLog, User, BloodGroup, OrganType } from '../types/index.js';

// Pre-seeded Users
let users: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Dr. Evelyn Vance (Chief Admin)',
    email: 'admin@lifelink.org',
    role: 'admin',
    phone: '+1 (555) 019-2831',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'usr-donor-1',
    name: 'John Miller',
    email: 'john.miller@example.com',
    role: 'donor',
    phone: '+1 (555) 234-5678',
    bloodGroup: 'O-',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-02-14T10:30:00Z',
  },
  {
    id: 'usr-donor-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    role: 'donor',
    phone: '+1 (555) 876-5432',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-03-01T12:00:00Z',
  },
  {
    id: 'usr-recipient-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    role: 'recipient',
    phone: '+1 (555) 345-6789',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-03-10T14:20:00Z',
  },
  {
    id: 'usr-recipient-2',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    role: 'recipient',
    phone: '+1 (555) 987-6543',
    bloodGroup: 'O-',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-03-15T09:15:00Z',
  },
];

// Pre-seeded Donors
let donors: Donor[] = [
  {
    id: 'dnr-1001',
    userId: 'usr-donor-1',
    fullName: 'John Miller',
    email: 'john.miller@example.com',
    phone: '+1 (555) 234-5678',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O-',
    organsToDonate: ['Kidney', 'Cornea', 'Tissue'],
    medicalHistory: 'No major illnesses. Non-smoker, regular cardiovascular fitness. Healthy renal function tests (GFR > 90).',
    hlaType: 'HLA-A2, B7, DR4',
    emergencyContactName: 'Clara Miller (Spouse)',
    emergencyContactPhone: '+1 (555) 234-9999',
    hospitalAffiliation: 'St. Jude General Hospital',
    city: 'New York',
    state: 'NY',
    approvalStatus: 'approved',
    pledgeDate: '2026-02-14',
    organConditionScore: 96,
    donorCode: 'LNK-DNR-8821',
  },
  {
    id: 'dnr-1002',
    userId: 'usr-donor-2',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 876-5432',
    age: 28,
    gender: 'Female',
    bloodGroup: 'A+',
    organsToDonate: ['Kidney', 'Liver'],
    medicalHistory: 'Excellent overall health. Annual physical passed. Negative for infectious diseases.',
    hlaType: 'HLA-A1, B8, DR3',
    emergencyContactName: 'Dmitri Rostov (Brother)',
    emergencyContactPhone: '+1 (555) 876-0000',
    hospitalAffiliation: 'Mount Sinai Transplant Center',
    city: 'Boston',
    state: 'MA',
    approvalStatus: 'approved',
    pledgeDate: '2026-03-01',
    organConditionScore: 98,
    donorCode: 'LNK-DNR-9104',
  },
  {
    id: 'dnr-1003',
    userId: 'usr-donor-3',
    fullName: 'David K. Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 456-7890',
    age: 41,
    gender: 'Male',
    bloodGroup: 'B+',
    organsToDonate: ['Heart', 'Lungs'],
    medicalHistory: 'Pledged upon deceased registry. Certified non-smoker, clear lungs, strong EKG.',
    hlaType: 'HLA-A3, B27, DR1',
    emergencyContactName: 'Mei Chen (Wife)',
    emergencyContactPhone: '+1 (555) 456-1111',
    hospitalAffiliation: 'Johns Hopkins Medical Center',
    city: 'Baltimore',
    state: 'MD',
    approvalStatus: 'pending',
    pledgeDate: '2026-03-20',
    organConditionScore: 92,
    donorCode: 'LNK-DNR-3382',
  },
  {
    id: 'dnr-1004',
    userId: 'usr-donor-4',
    fullName: 'Rachel Green',
    email: 'rachel.g@example.com',
    phone: '+1 (555) 678-1234',
    age: 35,
    gender: 'Female',
    bloodGroup: 'AB+',
    organsToDonate: ['Pancreas', 'Bone Marrow'],
    medicalHistory: 'No chronic illness. Healthy metabolic baseline.',
    hlaType: 'HLA-A24, B44, DR7',
    emergencyContactName: 'Ross Green',
    emergencyContactPhone: '+1 (555) 678-0000',
    hospitalAffiliation: 'Chicago Presbyterian Hospital',
    city: 'Chicago',
    state: 'IL',
    approvalStatus: 'pending',
    pledgeDate: '2026-03-25',
    organConditionScore: 90,
    donorCode: 'LNK-DNR-7721',
  },
];

// Pre-seeded Recipients
let recipients: Recipient[] = [
  {
    id: 'rcp-2001',
    userId: 'usr-recipient-1',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 345-6789',
    age: 45,
    gender: 'Male',
    bloodGroup: 'A+',
    requestedOrgan: 'Kidney',
    urgencyLevel: 'high',
    hospitalName: 'Mount Sinai Transplant Center',
    attendingDoctor: 'Dr. Aris Thorne (Nephrology)',
    doctorPhone: '+1 (555) 999-1001',
    medicalNotes: 'Stage 5 Chronic Kidney Disease on dialysis 3x weekly. Urgently awaiting living or deceased donor match.',
    status: 'approved',
    requestDate: '2026-03-10',
    requestCode: 'LNK-REQ-4412',
  },
  {
    id: 'rcp-2002',
    userId: 'usr-recipient-2',
    fullName: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 987-6543',
    age: 19,
    gender: 'Female',
    bloodGroup: 'O-',
    requestedOrgan: 'Kidney',
    urgencyLevel: 'critical',
    hospitalName: 'St. Jude General Hospital',
    attendingDoctor: 'Dr. Sarah Lin (Pediatric Nephrology)',
    doctorPhone: '+1 (555) 888-2002',
    medicalNotes: 'Acute renal failure following autoimmune glomeruli disease. High priority status 1A.',
    status: 'approved',
    requestDate: '2026-03-15',
    requestCode: 'LNK-REQ-5589',
  },
  {
    id: 'rcp-2003',
    userId: 'usr-recipient-3',
    fullName: 'Robert Harrison',
    email: 'robert.h@example.com',
    phone: '+1 (555) 654-3210',
    age: 58,
    gender: 'Male',
    bloodGroup: 'B+',
    requestedOrgan: 'Heart',
    urgencyLevel: 'critical',
    hospitalName: 'Johns Hopkins Medical Center',
    attendingDoctor: 'Dr. Michael Sterling (Cardiology)',
    doctorPhone: '+1 (555) 777-3003',
    medicalNotes: 'End-stage dilated cardiomyopathy, ventricular assist device (VAD) active.',
    status: 'pending',
    requestDate: '2026-03-18',
    requestCode: 'LNK-REQ-1209',
  },
];

// Pre-seeded Matches
let matches: Match[] = [
  {
    id: 'mtc-3001',
    donorId: 'dnr-1002',
    recipientId: 'rcp-2001',
    donorName: 'Elena Rostova',
    recipientName: 'Marcus Vance',
    donorBloodGroup: 'A+',
    recipientBloodGroup: 'A+',
    organType: 'Kidney',
    compatibilityScore: 98,
    status: 'scheduled',
    matchDate: '2026-03-22',
    notes: '98% HLA & Blood Group compatibility match. Cross-match tissue negative. Transplant scheduled for early April.',
    hospitalName: 'Mount Sinai Transplant Center',
  },
];

// Activity Logs
let activityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    action: 'New Donor Registered',
    performedBy: 'John Miller (Donor)',
    timestamp: '2026-02-14T10:30:00Z',
    details: 'Pledged Kidney, Cornea, Tissue with blood group O-',
    type: 'donor',
  },
  {
    id: 'log-2',
    action: 'Donor Approved',
    performedBy: 'Dr. Evelyn Vance (Admin)',
    timestamp: '2026-02-15T09:00:00Z',
    details: 'Verified medical clearance for donor John Miller (LNK-DNR-8821)',
    type: 'admin',
  },
  {
    id: 'log-3',
    action: 'Organ Request Submitted',
    performedBy: 'Marcus Vance (Recipient)',
    timestamp: '2026-03-10T14:20:00Z',
    details: 'Requested Kidney (A+) with High urgency at Mount Sinai Hospital',
    type: 'recipient',
  },
  {
    id: 'log-4',
    action: 'Automated Match Generated',
    performedBy: 'LifeLink AI Matching Engine',
    timestamp: '2026-03-22T11:00:00Z',
    details: 'Matched Donor Elena Rostova (A+) with Recipient Marcus Vance (A+) - 98% Compatibility',
    type: 'match',
  },
];

// Helper: Blood Compatibility Matrix
export const isBloodCompatible = (donorBlood: BloodGroup, recipientBlood: BloodGroup): boolean => {
  if (donorBlood === recipientBlood) return true;
  if (donorBlood === 'O-') return true; // Universal donor
  if (recipientBlood === 'AB+') return true; // Universal recipient

  const matrix: Record<BloodGroup, BloodGroup[]> = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'],
  };

  return matrix[donorBlood]?.includes(recipientBlood) || false;
};

// Database Query API
export const db = {
  // Users
  getUsers: () => users,
  getUserByEmail: (email: string) => users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  getUserById: (id: string) => users.find(u => u.id === id),
  createUser: (userData: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },

  // Donors
  getDonors: () => donors,
  getDonorById: (id: string) => donors.find(d => d.id === id),
  getDonorByUserId: (userId: string) => donors.find(d => d.userId === userId),
  createDonor: (donorData: Omit<Donor, 'id' | 'approvalStatus' | 'pledgeDate' | 'organConditionScore' | 'donorCode'>): Donor => {
    const newDonor: Donor = {
      ...donorData,
      id: `dnr-${Date.now()}`,
      approvalStatus: 'pending',
      pledgeDate: new Date().toISOString().split('T')[0],
      organConditionScore: Math.floor(Math.random() * 15) + 85, // 85 - 99
      donorCode: `LNK-DNR-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    donors.push(newDonor);

    // Add log
    db.addLog({
      action: 'Donor Registered',
      performedBy: newDonor.fullName,
      details: `Pledged ${newDonor.organsToDonate.join(', ')} (${newDonor.bloodGroup})`,
      type: 'donor',
    });

    return newDonor;
  },
  updateDonorStatus: (id: string, status: 'approved' | 'rejected', reason?: string): Donor | null => {
    const idx = donors.findIndex(d => d.id === id);
    if (idx === -1) return null;
    donors[idx].approvalStatus = status;
    if (reason) donors[idx].rejectionReason = reason;

    db.addLog({
      action: `Donor ${status.toUpperCase()}`,
      performedBy: 'Admin',
      details: `Donor ${donors[idx].fullName} (${donors[idx].donorCode}) was set to ${status}${reason ? `: ${reason}` : ''}`,
      type: 'admin',
    });

    return donors[idx];
  },

  // Recipients
  getRecipients: () => recipients,
  getRecipientById: (id: string) => recipients.find(r => r.id === id),
  getRecipientByUserId: (userId: string) => recipients.find(r => r.userId === userId),
  getRecipientByCode: (code: string) => recipients.find(r => r.requestCode.toUpperCase() === code.toUpperCase()),
  createRecipient: (recData: Omit<Recipient, 'id' | 'status' | 'requestDate' | 'requestCode'>): Recipient => {
    const newRecipient: Recipient = {
      ...recData,
      id: `rcp-${Date.now()}`,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      requestCode: `LNK-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    recipients.push(newRecipient);

    db.addLog({
      action: 'Organ Requested',
      performedBy: newRecipient.fullName,
      details: `Requested ${newRecipient.requestedOrgan} (${newRecipient.bloodGroup}) with ${newRecipient.urgencyLevel} urgency`,
      type: 'recipient',
    });

    return newRecipient;
  },
  updateRecipientStatus: (id: string, status: Recipient['status'], reason?: string): Recipient | null => {
    const idx = recipients.findIndex(r => r.id === id);
    if (idx === -1) return null;
    recipients[idx].status = status;
    if (reason) recipients[idx].rejectionReason = reason;

    db.addLog({
      action: `Recipient Request ${status.toUpperCase()}`,
      performedBy: 'Admin',
      details: `Recipient ${recipients[idx].fullName} (${recipients[idx].requestCode}) status updated to ${status}`,
      type: 'admin',
    });

    return recipients[idx];
  },

  // Matches
  getMatches: () => matches,
  createMatch: (donorId: string, recipientId: string, notes?: string): Match | null => {
    const donor = donors.find(d => d.id === donorId);
    const recipient = recipients.find(r => r.id === recipientId);

    if (!donor || !recipient) return null;

    // Check if organ matches
    if (!donor.organsToDonate.includes(recipient.requestedOrgan)) return null;

    // Check blood compatibility
    const compatible = isBloodCompatible(donor.bloodGroup, recipient.bloodGroup);
    if (!compatible) return null;

    // Calculate score
    const exactBlood = donor.bloodGroup === recipient.bloodGroup;
    let score = exactBlood ? 50 : 40;
    score += Math.round((donor.organConditionScore / 100) * 30);
    if (recipient.urgencyLevel === 'critical') score += 20;
    else if (recipient.urgencyLevel === 'high') score += 15;
    else score += 10;

    const scoreClamped = Math.min(99, Math.max(75, score));

    const newMatch: Match = {
      id: `mtc-${Date.now()}`,
      donorId: donor.id,
      recipientId: recipient.id,
      donorName: donor.fullName,
      recipientName: recipient.fullName,
      donorBloodGroup: donor.bloodGroup,
      recipientBloodGroup: recipient.bloodGroup,
      organType: recipient.requestedOrgan,
      compatibilityScore: scoreClamped,
      status: 'proposed',
      matchDate: new Date().toISOString().split('T')[0],
      notes: notes || `Compatibility score: ${scoreClamped}%. Match derived between ${donor.fullName} and ${recipient.fullName}.`,
      hospitalName: recipient.hospitalName,
    };

    matches.push(newMatch);

    // Update recipient status to matched
    const rIdx = recipients.findIndex(r => r.id === recipientId);
    if (rIdx !== -1) {
      recipients[rIdx].status = 'matched';
      recipients[rIdx].matchId = newMatch.id;
    }

    db.addLog({
      action: 'Match Created',
      performedBy: 'LifeLink Engine',
      details: `Matched Donor ${donor.fullName} with Recipient ${recipient.fullName} (${recipient.requestedOrgan}, ${scoreClamped}% match)`,
      type: 'match',
    });

    return newMatch;
  },

  updateMatchStatus: (matchId: string, status: Match['status']): Match | null => {
    const idx = matches.findIndex(m => m.id === matchId);
    if (idx === -1) return null;
    matches[idx].status = status;

    if (status === 'completed') {
      // Update recipient to transplanted
      const rec = recipients.find(r => r.id === matches[idx].recipientId);
      if (rec) rec.status = 'transplanted';
    }

    db.addLog({
      action: `Match Status Updated to ${status}`,
      performedBy: 'Admin',
      details: `Match ${matchId} for ${matches[idx].organType} updated to ${status}`,
      type: 'match',
    });

    return matches[idx];
  },

  // Algorithmic Matching Generator
  runMatchingEngine: () => {
    const approvedDonors = donors.filter(d => d.approvalStatus === 'approved');
    const approvedRecipients = recipients.filter(r => r.status === 'approved');

    const newMatchesCreated: Match[] = [];

    for (const recipient of approvedRecipients) {
      // Find candidate donors
      const candidates = approvedDonors.filter(donor => {
        const hasOrgan = donor.organsToDonate.includes(recipient.requestedOrgan);
        const bloodOk = isBloodCompatible(donor.bloodGroup, recipient.bloodGroup);
        // Check if donor is not already matched with an active match
        const alreadyMatched = matches.some(m => m.donorId === donor.id && m.status !== 'cancelled');
        return hasOrgan && bloodOk && !alreadyMatched;
      });

      if (candidates.length > 0) {
        // Pick best candidate based on condition score
        candidates.sort((a, b) => b.organConditionScore - a.organConditionScore);
        const bestDonor = candidates[0];

        const match = db.createMatch(
          bestDonor.id,
          recipient.id,
          `Automated algorithm match created with ${bestDonor.fullName} (${bestDonor.donorCode}).`
        );
        if (match) newMatchesCreated.push(match);
      }
    }

    return newMatchesCreated;
  },

  // Activity Logs
  getLogs: () => activityLogs,
  addLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    activityLogs.unshift(newLog);
    if (activityLogs.length > 50) activityLogs.pop();
    return newLog;
  },

  // Stats for Admin
  getAdminStats: () => {
    const totalDonors = donors.length;
    const approvedDonors = donors.filter(d => d.approvalStatus === 'approved').length;
    const pendingDonors = donors.filter(d => d.approvalStatus === 'pending').length;

    const totalRecipients = recipients.length;
    const pendingRecipients = recipients.filter(r => r.status === 'pending').length;
    const criticalRecipients = recipients.filter(r => r.urgencyLevel === 'critical').length;

    const totalMatches = matches.length;
    const activeMatches = matches.filter(m => m.status === 'proposed' || m.status === 'scheduled').length;
    const completedTransplants = matches.filter(m => m.status === 'completed').length;

    return {
      totalDonors,
      approvedDonors,
      pendingDonors,
      totalRecipients,
      pendingRecipients,
      criticalRecipients,
      totalMatches,
      activeMatches,
      completedTransplants,
      livesSaved: completedTransplants * 3 + approvedDonors * 2 + 142, // baseline impact stat
    };
  },
};
