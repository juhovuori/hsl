import psycopg2
import time
import conf
from datetime import datetime

_conn = None

def get_conn():
    global _conn
    if _conn == None:
        _conn = psycopg2.connect(conf.db_connection)
    return _conn

def get_timestamp():
    return datetime.now()

def sql_str(entry, i):
    if len(entry) <= i:
        return None
    try:
        return entry[i]
    except Exception as e:
        print e
        return None

def sql_real(entry, i):
    if len(entry) <= i or entry[i] == '':
        return None
    try:
        return float(entry[i])
    except Exception as e:
        print e
        return None

def sql_int(entry, i):
    if len(entry) <= i or entry[i] == '':
        return None
    try:
        return int(entry[i])
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

def get_time(s):
    if s is None: return None
    h = int(s[0:2])
    m = int(s[3:5])
    s = int(s[6:8])
    return h * 60 * 60 + m * 60 + s

def store_omat(entries,t=None, stop_id=None):
    if t is None: t = get_timestamp()
    t_str = str(t)[:19]
    print '%s: storing station %d' % (t_str, stop_id)
    for entry in entries:
        time = get_time(entry['time'])
        rtime = get_time(entry['rtime'])
        if rtime is None: continue
        delta = rtime-time
        d = {
            'line': entry['line'],
            'timestamp': t,
            'stop': int(entry['stop']),
            'time': time,
            'delta': delta
        }
        store('omat', d,t)

def store_batch(entries,t=None):
    if t is None: t = get_timestamp()
    t_str = str(t)[:19]
    print '%s: storing %d entries' % (t_str, len(entries))
    for entry in entries:
        store('vehicles', sql_dict(entry),t)

def store(table,entry,t=None):
    if t is None: t = get_timestamp()
    conn = get_conn()
    cur = conn.cursor()
    cols = [x for x in entry.keys() if entry[x] != None]
    try:
        columns = ",".join(cols)
        value_strings = ["%c(%s)s" % ('%', k) for k in cols]
        values = ",".join(value_strings)
        tpl = "INSERT INTO %s (%s) VALUES (%s)" % (table, columns, values)
        cur.execute(tpl, entry)
        conn.commit()

    except Exception as e:
        print 'SQL:', e
