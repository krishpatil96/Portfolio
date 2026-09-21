import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Check,
  Copy,
  Terminal,
  Calendar,
  Clock,
  User,
  Mail,
  Building,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FileCode2,
} from 'lucide-react';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  checkSupabaseConnection,
  fetchAppointments,
  AppointmentBooking,
} from '../lib/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    loading: boolean;
    connected: boolean;
    tableExists: boolean;
    message: string;
  }>({
    loading: true,
    connected: false,
    tableExists: false,
    message: 'Testing Supabase connection...',
  });
  const [appointments, setAppointments] = useState<AppointmentBooking[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'schema' | 'config'>('bookings');

  const sqlSchema = `-- ==========================================
-- Supabase SQL Schema for Appointment Bookings
-- Project ID: ${SUPABASE_PROJECT_ID}
-- Run this in Supabase Dashboard > SQL Editor
-- ==========================================

-- 1. Create Appointments Table
create table if not exists public.appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  appointment_type text not null,
  appointment_date date not null,
  appointment_time text not null,
  duration_minutes integer default 30,
  company_or_affiliation text,
  topic text not null,
  notes text,
  status text default 'pending'
);

-- 2. Enable Row Level Security (RLS)
alter table public.appointments enable row level security;

-- 3. Policy: Allow visitors to book appointments (Insert)
create policy "Allow anonymous appointment bookings"
  on public.appointments
  for insert
  with check (true);

-- 4. Policy: Allow reading appointments
create policy "Allow reading appointments"
  on public.appointments
  for select
  using (true);

-- 5. Optional: Create General Contact Messages Table
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text,
  message text not null
);
alter table public.inquiries enable row level security;
create policy "Allow public inquiries"
  on public.inquiries
  for insert
  with check (true);
`;

  const refreshData = async () => {
    setConnectionStatus((prev) => ({ ...prev, loading: true }));
    const status = await checkSupabaseConnection();
    setConnectionStatus({
      loading: false,
      connected: status.connected,
      tableExists: status.tableExists,
      message: status.message,
    });

    const { appointments: fetched } = await fetchAppointments();
    setAppointments(fetched);
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const copySql = async () => {
    await navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Supabase Database Connection</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 font-mono">
                  Live
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Project: {SUPABASE_PROJECT_ID} • Endpoint: {SUPABASE_URL}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Connection Status Ribbon */}
        <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                connectionStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-200 font-medium">
              {connectionStatus.loading
                ? 'Testing connection...'
                : connectionStatus.connected
                ? `Connected to Supabase (${SUPABASE_PROJECT_ID})`
                : 'Connection Pending'}
            </span>
          </div>

          <button
            onClick={refreshData}
            disabled={connectionStatus.loading}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus.loading ? 'animate-spin' : ''}`} />
            <span>Re-check</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Saved Bookings ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'schema'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>SQL Schema Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Credentials & Access</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm">
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Stored Appointment Records</h3>
                  <p className="text-xs text-slate-400">
                    Appointments booked by recruiters, collaborators, or guests saved directly to your database.
                  </p>
                </div>
              </div>

              {appointments.length === 0 ? (
                <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
                  <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs sm:text-sm text-slate-400">
                    No bookings recorded yet. Try booking an appointment using the form in the Contact section!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt, idx) => (
                    <div
                      key={apt.id || idx}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {apt.appointment_type.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-bold text-white">{apt.topic}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>{apt.duration_minutes} mins</span>
                          <span>•</span>
                          <span className="text-emerald-400 capitalize">{apt.status || 'confirmed'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-semibold">{apt.name}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${apt.email}`} className="text-cyan-400 hover:underline truncate">
                            {apt.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {apt.appointment_date} at {apt.appointment_time}
                          </span>
                        </div>
                      </div>

                      {apt.company_or_affiliation && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Building className="w-3.5 h-3.5" />
                          <span>{apt.company_or_affiliation}</span>
                        </div>
                      )}

                      {apt.notes && (
                        <div className="p-2.5 rounded-lg bg-slate-900 text-xs text-slate-300 border border-slate-800">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Notes:</span>
                          {apt.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Supabase SQL Schema Setup</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Copy and paste this script directly into your Supabase Dashboard under{' '}
                  <strong className="text-cyan-300">SQL Editor &gt; New Query &gt; Run</strong>. It creates the table
                  and grants anonymous insert permissions so web appointments save automatically.
                </p>
              </div>

              <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-cyan-300">
                <button
                  onClick={copySql}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs transition-colors cursor-pointer border border-slate-700"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
                <pre className="pt-8 sm:pt-0 whitespace-pre leading-relaxed">{sqlSchema}</pre>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Setup Steps:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Open your Supabase project dashboard: <code className="text-cyan-300">https://supabase.com/dashboard/project/{SUPABASE_PROJECT_ID}</code></li>
                  <li>Click on <strong>SQL Editor</strong> on the left sidebar</li>
                  <li>Click <strong>New Query</strong>, paste the code above, and click <strong>Run</strong></li>
                  <li>Your <code className="text-cyan-300">appointments</code> table is now completely configured!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Connected Supabase Configuration</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Credentials provided for your personal Supabase project.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1 text-[11px] uppercase">Supabase Project ID</span>
                  <span className="text-white font-bold">{SUPABASE_PROJECT_ID}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1 text-[11px] uppercase">Supabase API Endpoint URL</span>
                  <a
                    href={SUPABASE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1.5"
                  >
                    <span>{SUPABASE_URL}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1 text-[11px] uppercase">Client API Key (Publishable / Anon)</span>
                  <span className="text-emerald-400 truncate block">sb_publishable_uuGsdrQOYxuCMuFCyUjLyg__GnepDEG</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Storage Engine: <strong className="text-emerald-400">Supabase PostgreSQL</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
