drop table if exists vehicles;
create table vehicles (
  id serial primary key,
  timestamp timestamp,
  vehicle_id varchar,
  route varchar,
  lat real,
  lng real,
  bearing integer,
  direction integer,
  previous integer,
  current integer,
  departure integer,
  type integer, -- 0 = bus 1 = tram 2 = metro 3 = kutsuplus 4 = train 5 = ferry
  operator varchar,
  name varchar,
  speed integer,
  acceleration integer
);

drop table if exists omat;
create table omat (
  id serial primary key,
  timestamp timestamp,
  stop integer,
  line varchar,
  time integer, -- time on stop according to schedule in seconds since midnight
  delta integer -- delta in seconds to schedule based on real vehicle location
);

create index omat_stop on omat (stop);
create index omat_line on omat (line);

