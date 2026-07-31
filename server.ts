import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/db.js';

async function startServer() {
  const app = express();

  // Read port dynamically as per Zoho Catalyst / Cloud Run environment guidelines
  const PORT = parseInt(
    process.env.X_ZOHO_CATALYST_LISTEN_PORT || process.env.PORT || '3000',
    10
  );

  app.use(express.json());

  // CORS headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // ================= API ENDPOINTS ================= //

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      service: 'LifeLink Organ Donation Management System',
      catalystStatus: 'Active',
      port: PORT,
      timestamp: new Date().toISOString(),
    });
  });

  // AUTH API
  app.post('/api/auth/login', (req, res) => {
    const { email, role } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let user = db.getUserByEmail(email);
    if (!user) {
      // Auto register for demo seamless entry
      const name = email.split('@')[0].replace('.', ' ').toUpperCase();
      user = db.createUser({
        name,
        email,
        role: role || 'donor',
      });
    }

    res.json({
      success: true,
      token: `jwt-token-${user.id}-${Date.now()}`,
      user,
    });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email, role, phone, bloodGroup } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email and role are required' });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return res.json({ success: true, token: `jwt-token-${existing.id}`, user: existing });
    }

    const user = db.createUser({
      name,
      email,
      role,
      phone,
      bloodGroup,
    });

    res.json({
      success: true,
      token: `jwt-token-${user.id}-${Date.now()}`,
      user,
    });
  });

  // DONORS API
  app.get('/api/donors', (req, res) => {
    const donors = db.getDonors();
    res.json(donors);
  });

  app.get('/api/donors/user/:userId', (req, res) => {
    const donor = db.getDonorByUserId(req.params.userId);
    res.json(donor || null);
  });

  app.post('/api/donors', (req, res) => {
    try {
      const donorData = req.body;
      const newDonor = db.createDonor(donorData);
      res.status(201).json(newDonor);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to create donor record' });
    }
  });

  app.put('/api/donors/:id/status', (req, res) => {
    const { status, reason } = req.body;
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = db.updateDonorStatus(req.params.id, status, reason);
    if (!updated) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json(updated);
  });

  // RECIPIENTS API
  app.get('/api/recipients', (req, res) => {
    const recipients = db.getRecipients();
    res.json(recipients);
  });

  app.get('/api/recipients/user/:userId', (req, res) => {
    const recipient = db.getRecipientByUserId(req.params.userId);
    res.json(recipient || null);
  });

  app.post('/api/recipients', (req, res) => {
    try {
      const recData = req.body;
      const newRecipient = db.createRecipient(recData);
      res.status(201).json(newRecipient);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to create recipient request' });
    }
  });

  app.put('/api/recipients/:id/status', (req, res) => {
    const { status, reason } = req.body;
    const updated = db.updateRecipientStatus(req.params.id, status, reason);
    if (!updated) {
      return res.status(404).json({ error: 'Recipient request not found' });
    }
    res.json(updated);
  });

  // MATCHES API
  app.get('/api/matches', (req, res) => {
    const matches = db.getMatches();
    res.json(matches);
  });

  app.post('/api/matches/generate', (req, res) => {
    const newMatches = db.runMatchingEngine();
    res.json({
      success: true,
      message: `Matching engine executed. ${newMatches.length} new compatible matches generated.`,
      newMatchesCount: newMatches.length,
      matches: db.getMatches(),
    });
  });

  app.post('/api/matches/manual', (req, res) => {
    const { donorId, recipientId, notes } = req.body;
    const match = db.createMatch(donorId, recipientId, notes);
    if (!match) {
      return res.status(400).json({ error: 'Incompatible organ, blood type, or donor/recipient not found' });
    }
    res.json(match);
  });

  app.put('/api/matches/:id/status', (req, res) => {
    const { status } = req.body;
    const updated = db.updateMatchStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(updated);
  });

  // ADMIN STATS & LOGS API
  app.get('/api/admin/stats', (req, res) => {
    res.json(db.getAdminStats());
  });

  app.get('/api/admin/logs', (req, res) => {
    res.json(db.getLogs());
  });

  // TRACK REQUEST PUBLIC API
  app.get('/api/track/:code', (req, res) => {
    const code = req.params.code.trim();
    // Check if recipient code or donor code
    const recipient = db.getRecipientByCode(code);
    if (recipient) {
      const match = recipient.matchId ? db.getMatches().find(m => m.id === recipient.matchId) : null;
      return res.json({
        type: 'recipient',
        data: recipient,
        match,
      });
    }

    const donor = db.getDonors().find(d => d.donorCode.toUpperCase() === code.toUpperCase());
    if (donor) {
      return res.json({
        type: 'donor',
        data: donor,
      });
    }

    res.status(404).json({ error: 'No record found with ID or code: ' + code });
  });

  // CATALYST METADATA PROVIDER API
  app.get('/api/catalyst/config', (req, res) => {
    res.json({
      platform: 'Zoho Catalyst',
      hostingService: 'Slate (Frontend) & AppSail (Backend Node.js)',
      authService: 'Catalyst Authentication',
      dataStoreTables: ['Users', 'Donors', 'Recipients', 'Matches', 'ActivityLogs'],
      listenPortEnvVar: 'X_ZOHO_CATALYST_LISTEN_PORT',
      status: 'Ready for Deployment',
    });
  });

  // ================= VITE / FRONTEND SERVING ================= //

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LifeLink System] Server listening on http://0.0.0.0:${PORT}`);
    console.log(`[LifeLink System] Zoho Catalyst Port Binding: process.env.X_ZOHO_CATALYST_LISTEN_PORT = ${process.env.X_ZOHO_CATALYST_LISTEN_PORT || PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start LifeLink server:', err);
});
