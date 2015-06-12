#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Usage: hsl.py -o
          hsl.py -l
          hsl.py -v ID
"""
from docopt import docopt
from conf import version
import client



if __name__ == '__main__':
    arguments = docopt(__doc__,version=version)
    if arguments['-o']:
        client.omat_lahdot()
    if arguments['-l']:
        client.vehicles()
    if arguments['-v']:
        client.vehicle(arguments['ID'])
