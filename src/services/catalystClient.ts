/**
 * Zoho Catalyst SDK Integration Client Helper
 * This helper provides ready-to-use methods for Zoho Catalyst Data Store (Tables: Users, Donors, Recipients, Matches)
 * and Catalyst Authentication when deployed on Catalyst AppSail and Slate.
 */

export interface CatalystTableSchema {
  tableName: string;
  columns: { name: string; type: 'VarChar' | 'BigInt' | 'Boolean' | 'Double' | 'DateTime' | 'Text' }[];
}

export const CATALYST_TABLE_SCHEMAS: CatalystTableSchema[] = [
  {
    tableName: 'Users',
    columns: [
      { name: 'ROWID', type: 'BigInt' },
      { name: 'name', type: 'VarChar' },
      { name: 'email', type: 'VarChar' },
      { name: 'role', type: 'VarChar' },
      { name: 'phone', type: 'VarChar' },
      { name: 'bloodGroup', type: 'VarChar' },
      { name: 'createdAt', type: 'DateTime' },
    ],
  },
  {
    tableName: 'Donors',
    columns: [
      { name: 'ROWID', type: 'BigInt' },
      { name: 'userId', type: 'VarChar' },
      { name: 'fullName', type: 'VarChar' },
      { name: 'email', type: 'VarChar' },
      { name: 'bloodGroup', type: 'VarChar' },
      { name: 'organsToDonate', type: 'Text' },
      { name: 'approvalStatus', type: 'VarChar' },
      { name: 'organConditionScore', type: 'BigInt' },
      { name: 'donorCode', type: 'VarChar' },
      { name: 'hospitalAffiliation', type: 'VarChar' },
    ],
  },
  {
    tableName: 'Recipients',
    columns: [
      { name: 'ROWID', type: 'BigInt' },
      { name: 'userId', type: 'VarChar' },
      { name: 'fullName', type: 'VarChar' },
      { name: 'requestedOrgan', type: 'VarChar' },
      { name: 'bloodGroup', type: 'VarChar' },
      { name: 'urgencyLevel', type: 'VarChar' },
      { name: 'status', type: 'VarChar' },
      { name: 'requestCode', type: 'VarChar' },
      { name: 'hospitalName', type: 'VarChar' },
    ],
  },
  {
    tableName: 'Matches',
    columns: [
      { name: 'ROWID', type: 'BigInt' },
      { name: 'donorId', type: 'VarChar' },
      { name: 'recipientId', type: 'VarChar' },
      { name: 'organType', type: 'VarChar' },
      { name: 'compatibilityScore', type: 'BigInt' },
      { name: 'status', type: 'VarChar' },
      { name: 'matchDate', type: 'DateTime' },
    ],
  },
];

export const CORS_WHITELIST_GUIDANCE = `
Zoho Catalyst CORS Configuration Steps:
1. Navigate to Catalyst Console -> Security Settings -> CORS Rules.
2. Add your Slate Web App domain: https://<your-slate-app>.catalystserver.com
3. Allow HTTP Methods: GET, POST, PUT, DELETE, OPTIONS
4. Allowed Headers: Content-Type, Authorization, X-Catalyst-App-Version
5. Ensure process.env.X_ZOHO_CATALYST_LISTEN_PORT is dynamically read in AppSail service startup.
`;

export class CatalystHelper {
  static getDeploymentGuide() {
    return {
      frontendHosting: 'Zoho Catalyst Slate',
      backendHosting: 'Zoho Catalyst AppSail (Node.js 18+)',
      dataStore: 'Catalyst Data Store NoSQL/Relational tables',
      authentication: 'Catalyst User Management & Auth',
      schemas: CATALYST_TABLE_SCHEMAS,
      cors: CORS_WHITELIST_GUIDANCE,
      cliCommands: [
        'npm install -g zcatalyst-cli',
        'catalyst login',
        'catalyst init',
        'catalyst deploy --appsail --slate',
      ],
    };
  }
}
