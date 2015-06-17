#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Usage: hsl.py (-o|-l|-m|-v ID) [-r interval]
"""

from docopt import docopt
from conf import version
import client
import db
import output

if __name__ == '__main__':
    arguments = docopt(__doc__,version=version)
    if arguments['-o']:
        client.omat_lahdot()
    if arguments['-l']:
        data = client.vehicles()
        output.dump(data)
    if arguments['-m']:
        data = client.vehicles()
        db.store_batch(data)

    if arguments['-v']:
        client.vehicle(arguments['ID'])
