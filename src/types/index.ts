export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type OrganType = 
  | 'Kidney' 
  | 'Liver' 
  | 'Heart' 
  | 'Lungs' 
  | 'Pancreas' 
  | 'Cornea' 
  | 'Bone Marrow' 
  | 'Tissue';

export type UserRole = 'donor' | 'recipient' | 'admin';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type UrgencyLevel = 'critical' | 'high' | 'moderate';

export type MatchStatus = 'proposed' | 'scheduled' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  bloodGroup?: BloodGroup;
  avatar?: string;
  createdAt: string;
}

export interface Donor {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: BloodGroup;
  organsToDonate: OrganType[];
  medicalHistory: string;
  hlaType?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  hospitalAffiliation: string;
  city: string;
  state: string;
  approvalStatus: ApprovalStatus;
  rejectionReason?: string;
  pledgeDate: string;
  organConditionScore: number; // 1 to 100
  donorCode: string; // e.g. LNK-DNR-8821
}

export interface Recipient {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: BloodGroup;
  requestedOrgan: OrganType;
  urgencyLevel: UrgencyLevel;
  hospitalName: string;
  attendingDoctor: string;
  doctorPhone: string;
  medicalNotes: string;
  status: ApprovalStatus | 'matched' | 'transplanted';
  rejectionReason?: string;
  requestDate: string;
  requestCode: string; // e.g. LNK-REQ-4412
  matchId?: string;
}

export interface Match {
  id: string;
  donorId: string;
  recipientId: string;
  donorName: string;
  recipientName: string;
  donorBloodGroup: BloodGroup;
  recipientBloodGroup: BloodGroup;
  organType: OrganType;
  compatibilityScore: number; // 0 - 100%
  status: MatchStatus;
  matchDate: string;
  notes: string;
  hospitalName: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
  type: 'donor' | 'recipient' | 'match' | 'admin' | 'system';
}

export interface CatalystConfig {
  projectId: string;
  environment: string;
  dataStoreTableIds: {
    Users: string;
    Donors: string;
    Recipients: string;
    Matches: string;
  };
  authAppDomain: string;
  appSailUrl: string;
}
