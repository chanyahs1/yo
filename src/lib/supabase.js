import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export async function signInEmployee(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Attendance functions
export async function checkIn(employeeId) {
  const { data, error } = await supabase
    .from('attendance')
    .insert([{
      employee_id: employeeId,
      check_in: new Date().toISOString(),
      status: 'present'
    }]);
  return { data, error };
}

export async function checkOut(attendanceId) {
  const { data, error } = await supabase
    .from('attendance')
    .update({ check_out: new Date().toISOString() })
    .eq('id', attendanceId);
  return { data, error };
}

// Leave requests functions
export async function submitLeaveRequest(employeeId, startDate, endDate, reason) {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert([{
      employee_id: employeeId,
      start_date: startDate,
      end_date: endDate,
      reason
    }]);
  return { data, error };
}

// Messages functions
export async function sendMessage(senderId, receiverId, content) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      sender_id: senderId,
      receiver_id: receiverId,
      content
    }]);
  return { data, error };
}

export async function getMessages(userId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  return { data, error };
}

// Tasks functions
export async function getTasks(employeeId) {
  const { data, error } = await supabase
    .from('employee_tasks')
    .select('*')
    .eq('employee_id', employeeId)
    .order('due_date', { ascending: true });
  return { data, error };
}

export async function updateTaskStatus(taskId, status) {
  const { data, error } = await supabase
    .from('employee_tasks')
    .update({ status })
    .eq('id', taskId);
  return { data, error };
}

// Real-time subscriptions
export function subscribeToMessages(userId, callback) {
  return supabase
    .channel('messages')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `receiver_id=eq.${userId}`
    }, callback)
    .subscribe();
}

export function subscribeToTasks(employeeId, callback) {
  return supabase
    .channel('tasks')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'employee_tasks',
      filter: `employee_id=eq.${employeeId}`
    }, callback)
    .subscribe();
}

export function subscribeToAttendance(employeeId, callback) {
  return supabase
    .channel('attendance')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'attendance',
      filter: `employee_id=eq.${employeeId}`
    }, callback)
    .subscribe();
}