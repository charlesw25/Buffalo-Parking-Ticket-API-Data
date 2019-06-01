import json
import urllib.request

def get_ticket_data(x):
    array_of_arrays = []

    with urllib.request.urlopen(x) as trafficJSON:

        data = json.loads(trafficJSON.read().decode())

        for dict in data:
            if "latitude" not in dict:
                pass
            elif "longitude" not in dict:
                pass
            elif "viodesc" not in dict:
                pass
            else:
                array_of_arrays.append([float(dict["latitude"]), float(dict["longitude"]), dict["viodesc"]])

    json_info = json.dumps(array_of_arrays)
    #print(array_of_arrays)
    return json_info

print(get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json"))
