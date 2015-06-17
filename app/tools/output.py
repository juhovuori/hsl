
def dump(data):
    for line in data:
        for cell in line:
            print "'" + cell + "'",
        print

