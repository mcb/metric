# config.ru for metric
require 'dm-core'

# Set up a Sqlite3 connection
# DataMapper.setup(:default, 'sqlite:///path/to/project.db')

# Or use a MySQL connection:
# DataMapper.setup(:default, 'mysql://localhost/the_database_name')

# Alternatively use a Postgres connection:
# DataMapper.setup(:default, 'postgres://localhost/the_database_name')


require 'metric'

# Set your user credentials to get access to your reports
set :user, 'admin'
set :password, 'admin'


run Sinatra::Application