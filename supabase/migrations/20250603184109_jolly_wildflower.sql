/*
  # Initial Schema Setup for Employee Management System

  1. New Tables
    - `hr_admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
    
    - `employees`
      - `id` (uuid, primary key)
      - `name` (text)
      - `surname` (text)
      - `email` (text, unique)
      - `role` (text)
      - `salary` (numeric)
      - `age` (integer)
      - `last_login` (timestamp)
      - `last_logout` (timestamp)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `payrolls`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, foreign key)
      - `amount` (numeric)
      - `bonus` (numeric)
      - `reimbursement` (numeric)
      - `payment_date` (timestamp)
      - `status` (text)
      - `created_at` (timestamp)
    
    - `tasks`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `due_date` (timestamp)
      - `priority` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create HR Admins table
CREATE TABLE hr_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create Employees table
CREATE TABLE employees (
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

-- Create Payrolls table
CREATE TABLE payrolls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  bonus numeric DEFAULT 0,
  reimbursement numeric DEFAULT 0,
  payment_date timestamptz NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create Tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  priority text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE hr_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- HR Admins Policies
CREATE POLICY "HR admins can view their own data"
  ON hr_admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Employees Policies
CREATE POLICY "HR can manage all employee data"
  ON employees
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins
    WHERE id = auth.uid()
  ));

CREATE POLICY "Employees can view their own data"
  ON employees
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Payrolls Policies
CREATE POLICY "HR can manage all payroll data"
  ON payrolls
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins
    WHERE id = auth.uid()
  ));

CREATE POLICY "Employees can view their own payrolls"
  ON payrolls
  FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid());

-- Tasks Policies
CREATE POLICY "HR can manage all tasks"
  ON tasks
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM hr_admins
    WHERE id = auth.uid()
  ));

CREATE POLICY "Employees can view and update their own tasks"
  ON tasks
  TO authenticated
  USING (employee_id = auth.uid());