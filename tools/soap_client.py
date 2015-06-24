from suds.client import Client

import conf

client = None

def omat_lahdot(stop_id):

    global client
    url = conf.kamo_url

    if client is None:
        client = Client(url)

    return client.service.getNextDepartures(stop_id)

