import requests
from gpiozero import MotionSensor
from cameras import capture_image
from app.config import config
from app.logger import logger

def setup_pir_motion_sensor(pin: int):
    """
    Sets up a PIR (Passive Infrared) motion sensor.

    Args:
        pin (int): The pin number to which the motion sensor is connected.
    """
    
    global motion_sensor
    motion_sensor = MotionSensor(pin)

def cleanup_motion_sensor():
    """
    Closes the motion sensor connection.
    """
    
    motion_sensor.close()

async def monitor_pir_motion_sensor():
    """
    Monitors the PIR motion sensor for any motion detected and captures an image when motion is detected.
    Sends the captured image to back-end for processing.
    """

    is_item_present = False

    while True:
        motion_sensor.wait_for_motion()
        motion_sensor.wait_for_no_motion()

        if is_item_present:
            is_item_present = False
        else:
            item_photo = capture_image()

            url = f"{config['apiUrl']}/products-recognizers/{config['deviceId']}/products/identify-by-image"
            files = {'image': ('image.jpg', item_photo, 'multipart/form-data')}

            response = requests.post(url, files=files)

            logger.info(f"POST request sent to {url}. Response status code: {response.status_code}")

            is_item_present = True