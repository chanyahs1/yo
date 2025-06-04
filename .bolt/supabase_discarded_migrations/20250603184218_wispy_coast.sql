/*
  # Initial schema setup for employee management system
  
  1. New Tables
    - hr_admins: Store HR administrator accounts
    - employees: Store employee information
    - payrolls: Track employee payroll records
    - tasks: Manage employee tasks
  
  2. Security
    - Enable RLS on all tables
    - Add policies for HR admins and employees
    - Set up authentication rules
*/

-- Create hr_admins table
CREATE TABLE IF NOT EXISTS hr_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hr_admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HR admins can view their own data"
  ON hr_admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  surname text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  salary numeric NOT NULL,
  age integer NOT NULL,
  last_login timestamptz,
  last_logout timestamptz,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own data"
  ON employees
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "HR can manage all employee data"
  ON employees
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins
    WHERE hr_admins.id = auth.uid()
  ));

-- Create payrolls table
CREATE TABLE IF NOT EXISTS payrolls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  bonus numeric DEFAULT 0,
  reimbursement numeric DEFAULT 0,
  payment_date timestamptz NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payrolls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own payrolls"
  ON payrolls
  FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "HR can manage all payroll data"
  ON payrolls
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins
    WHERE hr_admins.id = auth.uid()
  ));

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  priority text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view and update their own tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "HR can manage all tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins
    WHERE hr_admins.id = auth.uid()
  ));