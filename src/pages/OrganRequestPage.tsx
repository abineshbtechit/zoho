import React, { useState } from 'react';
import { Activity, AlertTriangle, Building2, Stethoscope, User, Phone, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { BloodGroup, OrganType, UrgencyLevel } from '../types';

interface OrganRequestPageProps {
  setActiveTab: (tab: string) => void;
}

const ALL_ORGANS: OrganType[] = [
  'Kidney',
  'Liver',
  'Heart',
  'Lungs',
  'Pancreas',
  'Cornea',
  'Bone Marrow',
  'Tissue',
];

export const OrganRequestPage: React.FC<OrganRequestPageProps> = ({ setActiveTab }) => {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 345-6789');
  const [age, setAge] = useState<number>(45);
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('A+');
  const [requestedOrgan, setRequestedOrgan] = useState<OrganType>('Kidney');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('high');
  const [hospitalName, setHospitalName] = useState('Mount Sinai Transplant Center');
  const [attendingDoctor, setAttendingDoctor] = useState('Dr. Aris Thorne');
  const [doctorPhone, setDoctorPhone] = useState('+1 (555) 999-1001');
  const [medicalNotes, setMedicalNotes] = useState('Stage 5 Chronic Kidney Disease awaiting living or deceased donor match.');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !requestedOrgan || !hospitalName) {
      setError('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.createRecipient({
        userId: user?.id || `usr-${Date.now()}`,
        fullName,
        email,
        phone,
        age,
        gender,
        bloodGroup,
        requestedOrgan,
        urgencyLevel,
        hospitalName,
        attendingDoctor,
        doctorPhone,
        medicalNotes,
      });

      setActiveTab('recipient-dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to submit organ request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto shadow-md">
          <Activity className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Organ Transplant Request Application
        </h1>
        <p className="text-slate-600 text-sm font-medium max-w-xl mx-auto">
          Submit your official organ request. Once verified by your attending doctor and LifeLink medical administrators, you will be queued for automated donor matching.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
        
        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: RECIPIENT INFORMATION */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <User className="w-4 h-4" />
              <span>Section 1: Patient Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                  id="input-req-name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                  id="input-req-email"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                  id="input-req-phone"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                    id="input-req-age"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500"
                    id="select-req-gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ORGAN & URGENCY */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <Activity className="w-4 h-4" />
              <span>Section 2: Requested Organ & Medical Urgency</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Requested Organ *</label>
                <select
                  value={requestedOrgan}
                  onChange={(e) => setRequestedOrgan(e.target.value as OrganType)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500"
                  id="select-req-organ"
                >
                  {ALL_ORGANS.map((organ) => (
                    <option key={organ} value={organ}>{organ}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Patient Blood Group *</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500"
                  id="select-req-blood"
                >
                  {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Medical Urgency Level *</label>
              <div className="grid grid-cols-3 gap-3">
                
                <button
                  type="button"
                  onClick={() => setUrgencyLevel('critical')}
                  className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
                    urgencyLevel === 'critical'
                      ? 'bg-red-50 border-red-500 text-red-950 font-extrabold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  id="btn-urgency-critical"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-black text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>CRITICAL (Status 1A)</span>
                  </div>
                  <p className="text-[10px] text-red-800/80 font-normal">Immediate ICU / organ failure</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgencyLevel('high')}
                  className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
                    urgencyLevel === 'high'
                      ? 'bg-amber-50 border-amber-500 text-amber-950 font-extrabold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  id="btn-urgency-high"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-black text-amber-600">
                    <Activity className="w-4 h-4" />
                    <span>HIGH URGENCY</span>
                  </div>
                  <p className="text-[10px] text-amber-800/80 font-normal">Dialysis / deteriorating condition</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgencyLevel('moderate')}
                  className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
                    urgencyLevel === 'moderate'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-extrabold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  id="btn-urgency-moderate"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-black text-emerald-600">
                    <Sparkles className="w-4 h-4" />
                    <span>MODERATE</span>
                  </div>
                  <p className="text-[10px] text-emerald-800/80 font-normal">Stable awaiting transplant</p>
                </button>

              </div>
            </div>
          </div>

          {/* SECTION 3: HOSPITAL & ATTENDING PHYSICIAN */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <Building2 className="w-4 h-4" />
              <span>Section 3: Hospital & Doctor Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Hospital Name & Department *</label>
                <input
                  type="text"
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                  id="input-req-hospital"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Attending Physician / Doctor *</label>
                <input
                  type="text"
                  required
                  value={attendingDoctor}
                  onChange={(e) => setAttendingDoctor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                  id="input-req-doctor"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Doctor Office Contact *</label>
                <input
                  type="text"
                  required
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                  id="input-req-doc-phone"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Medical Notes & Diagnosis</label>
                <textarea
                  rows={2}
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500"
                  id="input-req-notes"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-cyan-600/30 transition-all flex items-center justify-center space-x-2"
            id="btn-submit-organ-request"
          >
            <Activity className="w-5 h-5" />
            <span>{submitting ? 'Submitting Request...' : 'Submit Organ Request & Queue for Matching'}</span>
          </button>

        </form>

      </div>

    </div>
  );
};
