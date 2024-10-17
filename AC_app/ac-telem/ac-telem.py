##############################################################
# Kunos Simulazioni
# AC Python tutorial 04 : Get data from AC
#
# To activate create a folder with the same name as this file
# in apps/python. Ex apps/python/tutorial01
# Then copy this file inside it and launch AC
#############################################################

import ac
import acsys
import os
import json

l_lapcount = 0
gear = 0
speed = 0
rpm = 0
performance = 0

# This function gets called by AC when the Plugin is initialised
# The function has to return a string with the plugin name
def acMain(ac_version):
    global l_lapcount
    appWindow = ac.newApp("Speed Logger")
    ac.setSize(appWindow, 200, 200)
    server = ac.addLabel(appWindow, "Logging speed.")
    ac.setPosition(server, 3, 30)
    ac.console("Speed Logger initialized!")
    return "Speed Logger"

def acUpdate(deltaT):
    global l_lapcount, speed
    # https://docs.google.com/document/d/13trBp6K1TjWbToUQs_nfFsB291-zVJzRZCNaTYt4Dzc/pub
    gear = ac.getCarState(0, acsys.CS.Gear)
    speed = ac.getCarState(0, acsys.CS.SpeedMPH)
    rpm = ac.getCarState(0, acsys.CS.RPM)
    performance = ac.getCarState(0, acsys.CS.PerformanceMeter)
    
    # Log speed to a file
    log_speed(gear, speed, rpm, performance)

def acShutdown():
    ac.console("Speed Logger shutting down.")
    log_speed(0, 0, 0, 0)
    return

def log_speed(in_gear, in_speed, in_rpm, in_performance):
    log_dir = "apps/python/ac-telem/logs"
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
    
    log_file = os.path.join(log_dir, "speed_log.json")
    
    data = {"gear": in_gear, "speed": in_speed, "rpm": in_rpm, "performance": in_performance}
    
    with open(log_file, "w") as f:
        json.dump(data, f)
