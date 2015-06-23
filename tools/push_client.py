import socket
import sys
import conf

def vehicles():

  # Create a TCP/IP socket
  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

  # Connect the socket to the port where the server is listening
  server_address = (conf.hsl_push_host, conf.hsl_push_port)
  print >>sys.stderr, 'connecting to %s port %s' % server_address
  sock.connect(server_address)

  try:
      
    # Send data
    message = '&%s;%s&\n' % (conf.hsl_user, conf.hsl_password)
    print >>sys.stderr, 'sending "%s"' % message
    sock.sendall(message)

    # Look for the response
    amount_received = 0
    amount_expected = len(message)
        
    while amount_received < amount_expected:
      data = sock.recv(16)
      amount_received += len(data)
      d = ",".join([str(ord(c)) for c in data])
      print >>sys.stderr, 'received (%d) %s' % (len(data), d)

  finally:
    print >>sys.stderr, 'closing socket'
    sock.close()

