import psycopg2
import time
import conf
from datetime import datetime

_conn = None

def get_conn():
    global _conn
    if _conn == None:
        _conn = psycopg2.connect(
          database = conf.db_database,
          host = conf.db_host,
          user = conf.db_user,
          password = conf.db_password)
    return _conn

def get_timestamp():
    return datetime.now()

def sql_str(entry, i):
    try:
        return entry[i]
    except IndexError as e:
        return None
    except Exception as e:
        print e
        return None

def sql_real(entry, i):
    try:
        return float(entry[i])
    except IndexError as e:
        return None
    except Exception as e:
        print e
        return None

def sql_int(entry, i):
    try:
        return int(entry[i])
    except IndexError as e:
        return None
    except Exception as e:
        print e
        return None

def sql_dict(entry,t):
    d = {
        'timestamp': t,
        'vehicle_id': sql_str(entry, 0),
        'route': sql_str(entry, 1),
        'lat': sql_real(entry, 2),
        'lng': sql_real(entry, 3),
        'bearing': sql_int(entry, 4),
        'direction': sql_int(entry, 5),
        'previous': sql_int(entry, 6),
        'current': sql_int(entry, 7),
        'departure': sql_int(entry, 8),
        'type': sql_int(entry, 9),
        'operator': sql_str(entry, 10),
        'name': sql_str(entry, 11),
        'speed': sql_int(entry, 12),
        'acceleration': sql_int(entry, 13)
    }
    return d

def store_batch(entries,t=None):
    if t is None: t = get_timestamp()
    t_str = str(t)[:19]
    print '%s: storing %d entries' % (t_str, len(entries))
    for entry in entries:
        store(entry,t)

def store(entry,t=None):
    if t is None: t = get_timestamp()
    d = sql_dict(entry,t)
    conn = get_conn()
    cur = conn.cursor()
    cols = [x for x in d.keys() if d[x] != None]
    try:
        columns = ",".join(cols)
        value_strings = ["%c(%s)s" % ('%', k) for k in cols]
        values = ",".join(value_strings)
        tpl = "INSERT INTO vehicles (%s) VALUES (%s)" % (columns, values)
        cur.execute(tpl, d)
        conn.commit()

    except Exception as e:
        print 'SQL:', e