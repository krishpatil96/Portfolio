import { createClient } from '@supabase/supabase-js';

// Supabase credentials provided for Project: stlqeodpbzsxwcxnyizj
export const SUPABASE_PROJECT_ID = 'stlqeodpbzsxwcxnyizj';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uuGsdrQOYxuCMuFCyUjLyg__GnepDEG';

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface AppointmentBooking {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  appointment_type: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  company_or_affiliation?: string;
  topic: string;
  notes?: string;
  status?: 'confirmed' | 'pending';
  created_at?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
}

const LOCAL_STORAGE_BOOKINGS_KEY = 'krish_portfolio_supabase_bookings';
const LOCAL_STORAGE_INQUIRIES_KEY = 'krish_portfolio_supabase_inquiries';

/**
 * Save an appointment booking directly to Supabase.
 * Includes graceful fallback to localStorage so bookings are never lost.
 */
export async function saveAppointment(
  booking: Omit<AppointmentBooking, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: AppointmentBooking; error?: string; savedTo: 'supabase' | 'local_cached' }> {
  const timestamp = new Date().toISOString();
  const generatedId = `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  const recordToInsert: AppointmentBooking = {
    ...booking,
    status: booking.status || 'pending',
  };

  // Always keep a local copy for client resilience & immediate UI display
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
    const existingList: AppointmentBooking[] = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem(
      LOCAL_STORAGE_BOOKINGS_KEY,
      JSON.stringify([{ ...recordToInsert, id: generatedId, created_at: timestamp }, ...existingList])
    );
  } catch (err) {
    console.warn('Could not cache booking to local storage:', err);
  }

  // Attempt saving to Supabase 'appointments' table
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([recordToInsert])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert warning (appointments table):', error.message);
      // Try fallback to 'bookings' table in case user configured that name
      const { data: bData, error: bError } = await supabase
        .from('bookings')
        .insert([recordToInsert])
        .select()
        .single();

      if (bError) {
        return {
          success: true,
          savedTo: 'local_cached',
          data: { ...recordToInsert, id: generatedId, created_at: timestamp },
          error: `Saved locally. Note: In Supabase, ensure the 'appointments' table is created with public insert permissions. (${error.message})`,
        };
      }

      return {
        success: true,
        savedTo: 'supabase',
        data: bData,
      };
    }

    return {
      success: true,
      savedTo: 'supabase',
      data,
    };
  } catch (networkErr: any) {
    console.warn('Supabase network error:', networkErr);
    return {
      success: true,
      savedTo: 'local_cached',
      data: { ...recordToInsert, id: generatedId, created_at: timestamp },
      error: `Network error connecting to Supabase (${networkErr?.message || 'Check connection'}). Saved safely to browser cache.`,
    };
  }
}

/**
 * Save contact inquiry to Supabase 'inquiries' or 'contacts' table
 */
export async function saveInquiry(
  inquiry: Omit<ContactInquiry, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: ContactInquiry; error?: string; savedTo: 'supabase' | 'local_cached' }> {
  const timestamp = new Date().toISOString();
  const generatedId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const recordToInsert: ContactInquiry = {
    ...inquiry,
  };

  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
    const existingList: ContactInquiry[] = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem(
      LOCAL_STORAGE_INQUIRIES_KEY,
      JSON.stringify([{ ...recordToInsert, id: generatedId, created_at: timestamp }, ...existingList])
    );
  } catch (err) {
    console.warn('Could not cache inquiry to local storage:', err);
  }

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([recordToInsert])
      .select()
      .single();

    if (error) {
      // Try fallback to 'contacts'
      const { data: cData, error: cError } = await supabase
        .from('contacts')
        .insert([recordToInsert])
        .select()
        .single();

      if (cError) {
        return {
          success: true,
          savedTo: 'local_cached',
          data: { ...recordToInsert, id: generatedId, created_at: timestamp },
          error: error.message,
        };
      }

      return {
        success: true,
        savedTo: 'supabase',
        data: cData,
      };
    }

    return {
      success: true,
      savedTo: 'supabase',
      data,
    };
  } catch (err: any) {
    return {
      success: true,
      savedTo: 'local_cached',
      data: { ...recordToInsert, id: generatedId, created_at: timestamp },
      error: err?.message,
    };
  }
}

/**
 * Retrieve cached or Supabase appointments
 */
export async function fetchAppointments(): Promise<{
  appointments: AppointmentBooking[];
  source: 'supabase' | 'local_cached';
}> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return { appointments: data, source: 'supabase' };
    }
  } catch (err) {
    console.warn('Fetch from Supabase failed, reading local cache:', err);
  }

  // Fallback to local storage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
    if (raw) {
      return { appointments: JSON.parse(raw), source: 'local_cached' };
    }
  } catch {
    // Ignore
  }

  return { appointments: [], source: 'local_cached' };
}

/**
 * Test connectivity to Supabase
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  projectId: string;
  url: string;
  tableExists: boolean;
  message: string;
}> {
  try {
    const { error } = await supabase.from('appointments').select('id').limit(1);
    if (error) {
      // Code 42P01 in Postgres indicates table does not exist
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return {
          connected: true,
          projectId: SUPABASE_PROJECT_ID,
          url: SUPABASE_URL,
          tableExists: false,
          message: "Connected to Supabase project! 'appointments' table needs to be created.",
        };
      }
      return {
        connected: true,
        projectId: SUPABASE_PROJECT_ID,
        url: SUPABASE_URL,
        tableExists: false,
        message: `Connected to Supabase. Note: ${error.message}`,
      };
    }

    return {
      connected: true,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      tableExists: true,
      message: "Successfully connected and verified 'appointments' table in Supabase.",
    };
  } catch (err: any) {
    return {
      connected: false,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      tableExists: false,
      message: `Connection check failed: ${err?.message || 'Check network'}`,
    };
  }
}
