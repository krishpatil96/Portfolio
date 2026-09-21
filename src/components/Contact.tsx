import React, { useState, useEffect } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Calendar,
  Database,
  Building,
  User,
  Phone,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileCode2,
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import {
  saveAppointment,
  saveInquiry,
  checkSupabaseConnection,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  AppointmentBooking,
} from '../lib/supabase';
import { SupabaseModal } from './SupabaseModal';

export const Contact: React.FC = () => {
  // Mode selection: 'book' (default requested by user) or 'message'
  const [activeMode, setActiveMode] = useState<'book' | 'message'>('book');

  // Supabase modal state
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<{
    loading: boolean;
    connected: boolean;
    message: string;
  }>({
    loading: true,
    connected: false,
    message: 'Connecting to Supabase...',
  });

  // Appointment Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    appointment_type: 'internship',
    appointment_date: '',
    appointment_time: '02:00 PM',
    duration_minutes: 30,
    topic: '',
    notes: '',
  });

  // Direct Message Form State
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<AppointmentBooking | null>(null);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveLocation, setSaveLocation] = useState<'supabase' | 'local_cached'>('supabase');

  // Check Supabase connection on load
  useEffect(() => {
    let mounted = true;
    checkSupabaseConnection().then((res) => {
      if (mounted) {
        setDbStatus({
          loading: false,
          connected: res.connected,
          message: res.message,
        });
      }
    });

    // Default booking date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setBookingData((prev) => ({ ...prev, appointment_date: dateStr }));

    return () => {
      mounted = false;
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Appointment Types
  const appointmentTypes = [
    { id: 'internship', label: 'Internship & Career Interview', icon: '💼' },
    { id: 'collaboration', label: 'Hackathon & Project Collab', icon: '🚀' },
    { id: 'mentorship', label: 'AI & Engineering Discussion', icon: '🧠' },
    { id: 'coffee_chat', label: '1-on-1 Sync & Coffee Chat', icon: '☕' },
  ];

  // Quick Time Slots
  const quickTimeSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];

  // Handle Appointment Booking Submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name.trim() || !bookingData.email.trim() || !bookingData.topic.trim()) {
      setErrorMessage('Please fill in your name, email, and meeting topic.');
      return;
    }

    setErrorMessage('');
    setSubmitting(true);

    try {
      const res = await saveAppointment({
        name: bookingData.name.trim(),
        email: bookingData.email.trim(),
        phone: bookingData.phone.trim() || undefined,
        company_or_affiliation: bookingData.company.trim() || undefined,
        appointment_type: bookingData.appointment_type,
        appointment_date: bookingData.appointment_date,
        appointment_time: bookingData.appointment_time,
        duration_minutes: Number(bookingData.duration_minutes),
        topic: bookingData.topic.trim(),
        notes: bookingData.notes.trim() || undefined,
        status: 'confirmed',
      });

      setSaveLocation(res.savedTo);
      setBookingConfirmed(
        res.data || {
          ...bookingData,
          status: 'confirmed',
        }
      );
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error saving appointment to database.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Direct Message Submit
  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageData.name.trim() || !messageData.email.trim() || !messageData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setErrorMessage('');
    setSubmitting(true);

    try {
      await saveInquiry({
        name: messageData.name.trim(),
        email: messageData.email.trim(),
        subject: messageData.subject.trim() || 'General Inquiry',
        message: messageData.message.trim(),
      });
      setMessageSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit message.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to generate Google Calendar Link
  const getGoogleCalendarUrl = (booking: AppointmentBooking) => {
    const title = encodeURIComponent(`Meeting with Krish Patil: ${booking.topic}`);
    const details = encodeURIComponent(
      `Appointment Type: ${booking.appointment_type}\nWith: ${booking.name} (${booking.email})\nNotes: ${
        booking.notes || 'None'
      }\nSaved in Supabase Project: ${SUPABASE_PROJECT_ID}`
    );
    const location = encodeURIComponent('Google Meet / Virtual');

    // Parse date and rough time
    const dateFormatted = booking.appointment_date.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T090000Z/${dateFormatted}T100000Z`;
  };

  // Helper to download .ics invite file
  const downloadIcs = (booking: AppointmentBooking) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Krish Patil//Portfolio Supabase Booking//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Meeting with Krish Patil: ${booking.topic}
DESCRIPTION:Type: ${booking.appointment_type}\\nAttendee: ${booking.name} (${booking.email})\\nNotes: ${
      booking.notes || 'None'
    }\\nProject: ${SUPABASE_PROJECT_ID}
DTSTART:${booking.appointment_date.replace(/-/g, '')}T090000Z
DTEND:${booking.appointment_date.replace(/-/g, '')}T093000Z
LOCATION:Google Meet
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting_${booking.appointment_date}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Direct Channels & Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Schedule a Meeting or Reach Out
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-2 text-center">
            Book a 1-on-1 appointment for 2026 internship opportunities, hackathon partnerships, or drop a direct message.
            All bookings are persisted directly to my connected <strong className="text-emerald-400 font-mono">Supabase database</strong>.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details & Supabase Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Supabase Storage Live Status Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/10">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Supabase Database Connected</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </span>
                    <span className="text-[11px] font-mono text-emerald-300/90 block">
                      Project: {SUPABASE_PROJECT_ID}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsSupabaseModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                  title="View Supabase Table & SQL Schema"
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Schema & SQL</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Appointment records are stored into the Supabase <code className="text-emerald-300 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800 font-mono">appointments</code> table
                with automatic cloud synchronization and safety caching.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                <span className="truncate">Host: {SUPABASE_URL}</span>
                <button
                  onClick={() => setIsSupabaseModalOpen(true)}
                  className="text-cyan-400 hover:text-cyan-300 underline shrink-0 ml-2 cursor-pointer"
                >
                  Inspect Records →
                </button>
              </div>
            </div>

            {/* General Contact Details */}
            <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Contact Information</span>
              </h3>

              {/* Status Tag */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{personalInfo.statusBadge}</span>
              </div>

              {/* Direct Details List */}
              <div className="space-y-3.5">
                {/* Email with copy button */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors truncate block"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer shrink-0"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/60">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Based In
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                {/* Response Window */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/60">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Response Window
                    </span>
                    <span className="text-xs font-semibold text-white">
                      Within 24 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* External Profiles */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                  External Profiles
                </span>
                <div className="flex gap-2.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-blue-400 border border-slate-700 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Booking & Contact System */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              {/* Mode Toggle Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-950/60">
                <button
                  id="tab-book-appointment"
                  onClick={() => {
                    setActiveMode('book');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-4 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                    activeMode === 'book'
                      ? 'border-emerald-400 text-emerald-300 bg-emerald-950/20'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Book an Appointment</span>
                  <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">
                    Supabase Sync
                  </span>
                </button>

                <button
                  id="tab-send-message"
                  onClick={() => {
                    setActiveMode('message');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-4 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                    activeMode === 'message'
                      ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Send Direct Message</span>
                </button>
              </div>

              {/* Tab Content: Book Appointment */}
              {activeMode === 'book' && (
                <div className="p-6 sm:p-8">
                  {bookingConfirmed ? (
                    <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/50 shadow-lg shadow-emerald-500/15">
                        <Check className="w-8 h-8" />
                      </div>

                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                          Booking Saved to Supabase
                        </span>
                        <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                          Appointment Confirmed!
                        </h4>
                        <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                          Thank you, <strong className="text-white">{bookingConfirmed.name}</strong>. Your appointment
                          has been scheduled and saved to project <code className="text-emerald-300 font-mono">{SUPABASE_PROJECT_ID}</code>.
                        </p>
                      </div>

                      {/* Booking Summary Box */}
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left text-xs space-y-2.5 max-w-md mx-auto">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="text-slate-400">Date & Time:</span>
                          <span className="font-semibold text-white font-mono">
                            {bookingConfirmed.appointment_date} at {bookingConfirmed.appointment_time}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="text-slate-400">Duration:</span>
                          <span className="font-semibold text-cyan-300 font-mono">
                            {bookingConfirmed.duration_minutes} Minutes
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="text-slate-400">Topic:</span>
                          <span className="font-semibold text-white truncate max-w-[200px]">
                            {bookingConfirmed.topic}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="text-slate-400">Storage Engine:</span>
                          <span className="inline-flex items-center gap-1 font-mono text-emerald-400 text-[11px]">
                            <Database className="w-3 h-3" />
                            <span>Supabase PostgreSQL</span>
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <a
                          href={getGoogleCalendarUrl(bookingConfirmed)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Add to Google Calendar</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => downloadIcs(bookingConfirmed)}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Clock className="w-4 h-4 text-emerald-400" />
                          <span>Download .ics file</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-4 pt-3 text-xs">
                        <button
                          onClick={() => {
                            setBookingConfirmed(null);
                            setBookingData((prev) => ({ ...prev, topic: '', notes: '' }));
                          }}
                          className="text-slate-400 hover:text-white underline cursor-pointer"
                        >
                          Schedule Another Appointment
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => setIsSupabaseModalOpen(true)}
                          className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                        >
                          View All Supabase Records
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-5">
                      {errorMessage && (
                        <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300">
                          {errorMessage}
                        </div>
                      )}

                      {/* Step 1: Appointment Category */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-2">
                          1. Select Discussion Purpose <span className="text-emerald-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {appointmentTypes.map((type) => {
                            const isSelected = bookingData.appointment_type === type.id;
                            return (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => setBookingData({ ...bookingData, appointment_type: type.id })}
                                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                                  isSelected
                                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                                }`}
                              >
                                <span className="text-base">{type.icon}</span>
                                <span className="truncate">{type.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2: Date & Time & Duration */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="book-date" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Meeting Date <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            id="book-date"
                            type="date"
                            required
                            value={bookingData.appointment_date}
                            onChange={(e) => setBookingData({ ...bookingData, appointment_date: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>

                        <div>
                          <label htmlFor="book-time" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Time Slot <span className="text-emerald-400">*</span>
                          </label>
                          <select
                            id="book-time"
                            value={bookingData.appointment_time}
                            onChange={(e) => setBookingData({ ...bookingData, appointment_time: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          >
                            {quickTimeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                            <option value="Custom Time">Custom Time (Mention in Notes)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Duration
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[15, 30, 45].map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setBookingData({ ...bookingData, duration_minutes: d })}
                                className={`py-2 px-1 text-center rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                                  bookingData.duration_minutes === d
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                                }`}
                              >
                                {d}m
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Attendee Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="book-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Your Full Name <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            id="book-name"
                            type="text"
                            required
                            placeholder="e.g. Sarah Jenkins"
                            value={bookingData.name}
                            onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>

                        <div>
                          <label htmlFor="book-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Email Address <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            id="book-email"
                            type="email"
                            required
                            placeholder="sarah@company.com"
                            value={bookingData.email}
                            onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="book-company" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Company / Organization / University
                          </label>
                          <input
                            id="book-company"
                            type="text"
                            placeholder="e.g. TechCorp, PCU, AI Lab"
                            value={bookingData.company}
                            onChange={(e) => setBookingData({ ...bookingData, company: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>

                        <div>
                          <label htmlFor="book-phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Phone / WhatsApp (Optional)
                          </label>
                          <input
                            id="book-phone"
                            type="text"
                            placeholder="+91 / +1 ..."
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>

                      {/* Step 4: Topic & Notes */}
                      <div>
                        <label htmlFor="book-topic" className="block text-xs font-medium text-slate-300 mb-1.5">
                          Meeting Agenda / Discussion Topic <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          id="book-topic"
                          type="text"
                          required
                          placeholder="e.g. AI Engineering Internship Discussion, Hackathon teammate intro"
                          value={bookingData.topic}
                          onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="book-notes" className="block text-xs font-medium text-slate-300 mb-1.5">
                          Additional Context or Questions (Optional)
                        </label>
                        <textarea
                          id="book-notes"
                          rows={3}
                          placeholder="Share any specific links, job descriptions, or questions for our conversation..."
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        id="submit-booking-btn"
                        disabled={submitting}
                        className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <span>Saving to Supabase Database...</span>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            <span>Confirm & Save Appointment (Supabase)</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Direct Cloud Sync to Project: {SUPABASE_PROJECT_ID}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsSupabaseModalOpen(true)}
                          className="text-cyan-400 hover:underline cursor-pointer"
                        >
                          View Table Schema
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Tab Content: Send Message */}
              {activeMode === 'message' && (
                <div className="p-6 sm:p-8">
                  {messageSubmitted ? (
                    <div className="p-6 sm:p-8 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Thank you, <strong className="text-white">{messageData.name}</strong>. Your inquiry has been
                        recorded in Supabase. You can also reach me directly at{' '}
                        <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 underline">
                          {personalInfo.email}
                        </a>.
                      </p>
                      <button
                        onClick={() => {
                          setMessageSubmitted(false);
                          setMessageData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleMessageSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
                          {errorMessage}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="msg-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Your Name <span className="text-cyan-400">*</span>
                          </label>
                          <input
                            id="msg-name"
                            type="text"
                            required
                            value={messageData.name}
                            onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                            placeholder="e.g. Alex Sharma"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div>
                          <label htmlFor="msg-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Email Address <span className="text-cyan-400">*</span>
                          </label>
                          <input
                            id="msg-email"
                            type="email"
                            required
                            value={messageData.email}
                            onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="msg-subject" className="block text-xs font-medium text-slate-300 mb-1.5">
                          Subject
                        </label>
                        <input
                          id="msg-subject"
                          type="text"
                          value={messageData.subject}
                          onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                          placeholder="Internship opportunity / Technical inquiry"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="msg-text" className="block text-xs font-medium text-slate-300 mb-1.5">
                          Message <span className="text-cyan-400">*</span>
                        </label>
                        <textarea
                          id="msg-text"
                          rows={4}
                          required
                          value={messageData.message}
                          onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                          placeholder="Hi Krish, I came across your portfolio and wanted to discuss..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Transmit Message (Saved to Supabase)</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Supabase Database Manager & SQL Schema Modal */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </section>
  );
};
