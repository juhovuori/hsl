#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Usage: hsl.py (-o|-l|-p|-m|-v ID) [--interval=S] [--forever|--repeat=N]
"""

from docopt import docopt
from conf import version
from time import sleep
import client
import push_client
import db
import output

if __name__ == '__main__':
    arguments = docopt(__doc__,version=version)
    forever = arguments['--forever']
    repetitions = arguments['--repeat']
    repetitions = int(repetitions) if repetitions is not None else 1
    interval = int(arguments['--interval'] or 1)

    def one_more_round(): return forever or repetitions > 0

    while one_more_round():

      if arguments['-o']:
          client.omat_lahdot()
      if arguments['-l']:
          data = client.vehicles()
          output.dump(data)
      if arguments['-p']:
          data = push_client.vehicles()
          output.dump(data)
      if arguments['-m']:
          data = client.vehicles()
          db.store_batch(data)
      if arguments['-v']:
          client.vehicle(arguments['ID'])

      if not forever: repetitions -= 1
      if one_more_round(): sleep(interval)

