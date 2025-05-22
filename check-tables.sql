-- Database Tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Listing Table Columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Listing'; 