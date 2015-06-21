from conf import *
from urllib2 import urlopen
from urllib import urlencode
from suds.client import Client

import requests
from suds.transport.http import HttpAuthenticated
from suds.transport import Reply, TransportError

class RequestsTransport(HttpAuthenticated):
    def __init__(self, **kwargs):
        self.cert = kwargs.pop('cert', None)
        # super won't work because not using new style class
        HttpAuthenticated.__init__(self, **kwargs)

    def send(self, request):
        self.addcredentials(request)
        resp = requests.post(request.url, data=request.message,
                                     headers=request.headers, cert=self.cert)
        result = Reply(resp.status_code, resp.headers, resp.content)
        return result

def omat_lahdot():
    url = kamo_url
    print url
    transport = RequestsTransport(cert='cert')
    client = Client(url, transport=transport)
    print client

def vehicles():
    q = urlencode({
        "type":"vehicles",
        "lat1":"60",
        "lat2":"61",
        "lng1":"23",
        "lng2":"26"
        })
    response = urlopen(hsl_live_url + "?" + q)
    text = response.read()
    data = [line.rstrip().split(";") for line in text.split("\n") if len(line) > 1]
    return data

def vehicle(ID):
    q = urlencode({
        "type":"vehicle",
        "id":ID
        })
    response = urlopen(hsl_live_url + "?" + q)
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

