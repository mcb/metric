## Metrics

This is a gem to display metrics for a website. It is in development state and not production ready. However it is already used in a couple of projects. 

It is not yet covered by tests as it was merely a playground project. Specs will follow over time as we work on it.

### Usage

```
# config.ru for metric
require 'dm-core'

# Use sqlite3 for example

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/metric.db")

require 'metric'

# Set your user credentials to get access to your reports
set :user, 'admin'
set :password, 'admin'


run Sinatra::Application
```

Then fire up your unicorn or rack server and visit http://localhost:9292/reports. The user credentials should be set correctly prior production usage.

And in your Website:

```
<script type="text/javascript" charset="utf-8" src="http://yourhost/m.js"></script>
```

### Licensing

2012, Quale GbR (Michael C. Beck)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.