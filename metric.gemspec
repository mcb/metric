# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "metric/version"

Gem::Specification.new do |s|
  s.name        = "metric"
  s.version     = Metrics::VERSION
  s.authors     = ["Michael C. Beck"]
  s.email       = ["michael.beck@qualeapps.com"]
  s.homepage    = "http://quale.de"
  s.summary     = %q{Metrics for your website}
  s.description = %q{metrics provides analytics for your website, logging all incoming traffic}

  s.rubyforge_project = "metric"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  s.add_development_dependency "rspec"
  s.add_dependency "sinatra"
  s.add_dependency "data_mapper"
  s.add_dependency "geocoder"
  s.add_dependency "user_agent"
end
