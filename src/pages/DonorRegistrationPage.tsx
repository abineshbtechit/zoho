import React, { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, User, Phone, MapPin, Building2, Stethoscope, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { BloodGroup, OrganType } from '../types';

interface DonorRegistrationPageProps {
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

export const DonorRegistrationPage: React.FC<DonorRegistrationPageProps> = ({ setActiveTab }) => {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [selectedOrgans, setSelectedOrgans] = useState<OrganType[]>(['Kidney', 'Cornea']);
  const [medicalHistory, setMedicalHistory] = useState('No major underlying illnesses. Regular exercise and nonsmoker.');
  const [hlaType, setHlaType] = useState('HLA-A2, B7, DR4');
  const [emergencyName, setEmergencyName] = useState('Clara Miller (Spouse)');
  const [emergencyPhone, setEmergencyPhone] = useState('+1 (555) 234-9999');
  const [hospitalAffiliation, setHospitalAffiliation] = useState('St. Jude General Hospital');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleOrgan = (organ: OrganType) => {
    if (selectedOrgans.includes(organ)) {
      if (selectedOrgans.length === 1) return; // Must select at least 1
      setSelectedOrgans(selectedOrgans.filter(o => o !== organ));
    } else {
      setSelectedOrgans([...selectedOrgans, organ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || selectedOrgans.length === 0) {
      setError('Please fill in all required fields and select at least one organ to pledge.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.createDonor({
        userId: user?.id || `usr-${Date.now()}`,
        fullName,
        email,
        phone,
        age,
        gender,
        bloodGroup,
        organsToDonate: selectedOrgans,
        medicalHistory,
        hlaType,
        emergencyContactName: emergencyName,
        emergencyContactPhone: emergencyPhone,
        hospitalAffiliation,
        city,
        state,
      });

      setActiveTab('donor-dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to submit donor registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <Heart className="w-6 h-6 fill-emerald-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Organ Donor Pledge Registration
        </h1>
        <p className="text-slate-600 text-sm font-medium max-w-xl mx-auto">
          Complete your medical profile to register as an official organ donor. All records are confidential and verified by licensed hospital medical boards.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
        
        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: PERSONAL DETAILS */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <User className="w-4 h-4" />
              <span>Section 1: Donor Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-email"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-phone"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Age</label>
                  <input
                    type="number"
                    min={18}
                    max={100}
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value, 10) || 18)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                    id="input-donor-age"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500"
                    id="select-donor-gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ORGAN PLEDGE & BLOOD TYPE */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <Heart className="w-4 h-4" />
              <span>Section 2: Blood Group & Organs to Pledge</span>
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Select Your Blood Group *</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setBloodGroup(bg)}
                    className={`py-2.5 rounded-xl font-black text-xs transition-all ${
                      bloodGroup === bg
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    id={`btn-donor-bg-${bg.replace('+', 'pos').replace('-', 'neg')}`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Select Organs You Wish to Pledge *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ALL_ORGANS.map((organ) => {
                  const selected = selectedOrgans.includes(organ);
                  return (
                    <button
                      key={organ}
                      type="button"
                      onClick={() => toggleOrgan(organ)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selected
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 font-medium hover:bg-slate-100'
                      }`}
                      id={`chk-donor-organ-${organ.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="text-xs">♥ {organ}</span>
                      {selected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 3: MEDICAL HISTORY & HOSPITAL */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <Stethoscope className="w-4 h-4" />
              <span>Section 3: Medical History & Emergency Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Medical History Summary</label>
                <textarea
                  rows={2}
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  placeholder="Note any previous surgeries, chronic conditions, or allergies..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-history"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">HLA Tissue Typing Marker (If known)</label>
                <input
                  type="text"
                  value={hlaType}
                  onChange={(e) => setHlaType(e.target.value)}
                  placeholder="e.g. HLA-A2, B7, DR4"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-hla"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Affiliated Hospital Partner</label>
                <input
                  type="text"
                  required
                  value={hospitalAffiliation}
                  onChange={(e) => setHospitalAffiliation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-hospital"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Emergency Contact Name</label>
                <input
                  type="text"
                  required
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-emerg-name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Emergency Contact Phone</label>
                <input
                  type="text"
                  required
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-emerg-phone"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-city"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">State / Region</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                  id="input-donor-state"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
            id="btn-submit-donor-form"
          >
            <Sparkles className="w-5 h-5" />
            <span>{submitting ? 'Submitting Pledge...' : 'Complete & Generate Digital Organ Donor Badge'}</span>
          </button>

        </form>

      </div>

    </div>
  );
};
