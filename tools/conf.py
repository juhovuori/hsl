_private = [x.rstrip() for x in open("credentials.conf","r").readlines()];

version = "HSL monitor 1.0"
hsl_live_url = "http://83.145.232.209:10001/"
hsl_push_host = "83.145.232.209"
hsl_push_port = 8080
kamo_url = "http://omatlahdot.hkl.fi/interfaces/kamo?wsdl"
#kamo_url = "http://hsl.trapeze.fi:80/interfaces/kamo"
#kamo_url = "https://omatlahdot.hkl.fi/interfaces/kamo"
hsl_user = _private[0]
hsl_password = _private[1]
db_connection = _private[2]

#hsl_live_url = "ws://83.145.232.209:8080/"
