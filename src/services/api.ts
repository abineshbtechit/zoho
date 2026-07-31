import { User, Donor, Recipient, Match, ActivityLog, BloodGroup, OrganType } from '../types';

const API_BASE = '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || 'Network request failed');
  }

  return response.json();
}

export const api = {
  // Auth
  login: async (email: string, role?: string): Promise<{ user: User; token: string }> => {
    return fetchJson(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
  },

  register: async (data: { name: string; email: string; role: string; phone?: string; bloodGroup?: BloodGroup }): Promise<{ user: User; token: string }> => {
    return fetchJson(`${API_BASE}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Donors
  getDonors: async (): Promise<Donor[]> => {
    return fetchJson(`${API_BASE}/donors`);
  },

  getDonorByUserId: async (userId: string): Promise<Donor | null> => {
    return fetchJson(`${API_BASE}/donors/user/${userId}`);
  },

  createDonor: async (data: Omit<Donor, 'id' | 'approvalStatus' | 'pledgeDate' | 'organConditionScore' | 'donorCode'>): Promise<Donor> => {
    return fetchJson(`${API_BASE}/donors`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateDonorStatus: async (id: string, status: 'approved' | 'rejected', reason?: string): Promise<Donor> => {
    return fetchJson(`${API_BASE}/donors/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, reason }),
    });
  },

  // Recipients
  getRecipients: async (): Promise<Recipient[]> => {
    return fetchJson(`${API_BASE}/recipients`);
  },

  getRecipientByUserId: async (userId: string): Promise<Recipient | null> => {
    return fetchJson(`${API_BASE}/recipients/user/${userId}`);
  },

  createRecipient: async (data: Omit<Recipient, 'id' | 'status' | 'requestDate' | 'requestCode'>): Promise<Recipient> => {
    return fetchJson(`${API_BASE}/recipients`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateRecipientStatus: async (id: string, status: string, reason?: string): Promise<Recipient> => {
    return fetchJson(`${API_BASE}/recipients/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, reason }),
    });
  },

  // Matches
  getMatches: async (): Promise<Match[]> => {
    return fetchJson(`${API_BASE}/matches`);
  },

  runMatchingEngine: async (): Promise<{ success: boolean; message: string; matches: Match[] }> => {
    return fetchJson(`${API_BASE}/matches/generate`, {
      method: 'POST',
    });
  },

  createManualMatch: async (donorId: string, recipientId: string, notes?: string): Promise<Match> => {
    return fetchJson(`${API_BASE}/matches/manual`, {
      method: 'POST',
      body: JSON.stringify({ donorId, recipientId, notes }),
    });
  },

  updateMatchStatus: async (matchId: string, status: Match['status']): Promise<Match> => {
    return fetchJson(`${API_BASE}/matches/${matchId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Admin Stats & Logs
  getAdminStats: async (): Promise<{
    totalDonors: number;
    approvedDonors: number;
    pendingDonors: number;
    totalRecipients: number;
    pendingRecipients: number;
    criticalRecipients: number;
    totalMatches: number;
    activeMatches: number;
    completedTransplants: number;
    livesSaved: number;
  }> => {
    return fetchJson(`${API_BASE}/admin/stats`);
  },

  getLogs: async (): Promise<ActivityLog[]> => {
    return fetchJson(`${API_BASE}/admin/logs`);
  },

  // Track Code
  trackCode: async (code: string): Promise<{ type: 'donor' | 'recipient'; data: Donor | Recipient; match?: Match | null }> => {
    return fetchJson(`${API_BASE}/track/${encodeURIComponent(code)}`);
  },

  // Catalyst Metadata
  getCatalystConfig: async () => {
    return fetchJson(`${API_BASE}/catalyst/config`);
  },
};
