
uids = None
uid_index = 0

def get_next_station_id():
    global uids, uid_index
    if uids is None:
        uids = [int(x) for x in open("uids").readlines()]
    if uid_index >= len(uids):
        uid_index = 0
    val = uids[uid_index]
    uid_index += 1
    return val

    
