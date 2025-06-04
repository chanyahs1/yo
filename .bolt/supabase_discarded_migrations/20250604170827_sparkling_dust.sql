/*
  # Employee Management System Tables

  1. New Tables
    - attendance
      - id (uuid, primary key)
      - employee_id (uuid, references employees)
      - check_in (timestamp)
      - check_out (timestamp)
      - status (text) - 'present', 'late', 'half-day'
      - created_at (timestamp)

    - leave_requests
      - id (uuid, primary key)
      - employee_id (uuid, references employees)
      - start_date (date)
      - end_date (date)
      - reason (text)
      - status (text) - 'pending', 'approved', 'rejected'
      - created_at (timestamp)

    - messages
      - id (uuid, primary key)
      - sender_id (uuid, references employees)
      - receiver_id (uuid, references employees)
      - content (text)
      - read (boolean)
      - created_at (timestamp)

    - employee_tasks
      - id (uuid, primary key)
      - employee_id (uuid, references employees)
      - title (text)
      - description (text)
      - due_date (timestamp)
      - status (text)
      - priority (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  check_in timestamptz,
  check_out timestamptz,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own attendance"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (auth.uid() = employee_id);

CREATE POLICY "HR can manage all attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins WHERE hr_admins.id = auth.uid()
  ));

-- Leave Requests Table
CREATE TABLE IF NOT EXISTS leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage their own leave requests"
  ON leave_requests
  FOR ALL
  TO authenticated
  USING (auth.uid() = employee_id);

CREATE POLICY "HR can manage all leave requests"
  ON leave_requests
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins WHERE hr_admins.id = auth.uid()
  ));

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own messages"
  ON messages
  FOR ALL
  TO authenticated
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

-- Employee Tasks Table
CREATE TABLE IF NOT EXISTS employee_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE employee_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage their own tasks"
  ON employee_tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = employee_id);

CREATE POLICY "HR can manage all tasks"
  ON employee_tasks
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins WHERE hr_admins.id = auth.uid()
  ));