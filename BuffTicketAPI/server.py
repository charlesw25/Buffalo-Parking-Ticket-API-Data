from bottle import *
from tickets import *

@route('/')
def server_staticHTML():
    return static_file("index.html", root="./")


@route('/map.js')
def server_staticMAP():
    return static_file("map.js", root="./")


#@route('/tickets')
#def send_stats():
#    return static_file("tickets.js", root="./")


#@route('/tickets')
#def get_tickets():
#    return json.dumps([[35.6763257, 139.6993177, "Meiji Shrine"],[35.7101456, 139.8105814, "Skytree"],[35.6950532, 139.7017945, "Godzilla Head"]])


@route('/tickets')
def get_tickets():
    return get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json")


run(host='localhost', port=8080, debug=True)
