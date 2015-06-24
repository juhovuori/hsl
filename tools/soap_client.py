from suds.client import Client
from suds.transport.http import HttpAuthenticated
from suds.transport import Reply, TransportError

import conf

def omat_lahdot(stop_id):
    url = conf.kamo_url
    print url
    #client = SoapClient(wsdl=url,trace=True);
    #http://127.0.0.1:8000/webservices/sample/call/soap?WSDL",trace=False)
    #response = client.AddIntegers(a=1,b=2)
    #result = response['AddResult']
    #print result
    #transport = RequestsTransport(cert='cert')
    client = Client(url)
    return client.service.getNextDepartures(stop_id)

