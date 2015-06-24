import conf
from urllib2 import urlopen
from urllib import urlencode

import requests

def vehicles():
    q = urlencode({
        "type":"vehicles",
        "lat1":"60",
        "lat2":"61",
        "lng1":"23",
        "lng2":"26"
        })
    response = urlopen(conf.hsl_live_url + "?" + q)
    text = response.read()
    data = [line.rstrip().split(";") for line in text.split("\n") if len(line) > 1]
    return data

def vehicle(ID):
    q = urlencode({
        "type":"vehicle",
        "id":ID
        })
    response = urlopen(conf.hsl_live_url + "?" + q)
    data = response.read()
    values = data.rstrip().split(";")
    while len(values) < 10: values.append("")
    print """
    id              %s
    route           %s
    lat             %s
    lng             %s
    bearing         %s
    direction       %s
    previous stop   %s
    current stop    %s
    departure       %s
    speed           %s
    """ % tuple(values)

#from websocket import create_connection
#ws = create_connection(hs_live_url)
#print "Sending 'Hello, World'..."
#ws.send("Hello, World")
#print "Sent"
#print "Reeiving..."
#result = ws.recv()
#print "Received '%s'" % result
#ws.close()


if __name__ == '__main__':
    print 'This is a library.'

