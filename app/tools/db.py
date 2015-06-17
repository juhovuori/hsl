import psycopg2
import time

_conn = None

def get_conn():
    if _conn == None:
        _conn = psycopg2.connect("d")
    return _conn

def get_timestamp():
    return time.time()

def sql_str(entry, i):
    try:
        return entry[i]
    except e:
        print e
        return None

def sql_real(entry, i):
    try:
        return float(entry[i])
    except e:
        print e
        return None

def sql_int(entry, i):
    try:
        return int(entry[i])
    except e:
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
    for entry in entries:
        store(entry,t)

def sql_type(value):
    t = type(value)
    if (t == type('')): return 's'
    if (t == type(0)): return 'd'
    if (t == type(1.2)): return 'f'
    else:
        print type(value)
        raise Exception()

def store(entry,t=None):
    if t is None: t = get_timestamp()
    d = sql_dict(entry,t)
    c = get_conn().cursor()
    try:
        columns = d.keys().join(",")
        value_strings = ["\%(%s)%s" % (k,sql_type(d[k])) for k in d.keys()]
        values = value_strings.join(",")
        tpl = "INSERT INTO vehicles (%s) VALUES (%s)" % (columns, values)
        cur.execute(tpl, namedict)

    except e:
        print 'SQL:', e
