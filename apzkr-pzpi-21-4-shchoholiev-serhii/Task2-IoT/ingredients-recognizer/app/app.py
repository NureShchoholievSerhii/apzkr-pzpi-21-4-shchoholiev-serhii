import asyncio
from pir_motion_sensors import monitor_pir_motion_sensor, setup_pir_motion_sensor, cleanup_motion_sensor
from .logger import logger

async def main():
    PIR_SENSOR_PIN = 18

    setup_pir_motion_sensor(PIR_SENSOR_PIN)
    
    stop_event = asyncio.Event()

    try:
        await asyncio.gather(
            monitor_pir_motion_sensor(),
            stop_event.wait()  # Waiting for stop event
        )
    except Exception as e:
        logger.error(f"Error: {e}")
        logger.info("Application stopping...")
    finally:
        cleanup_motion_sensor()
        logger.info("Application stopped.")

def run():
    logger.info("Starting shelves controller...")
    asyncio.run(main())

if __name__ == "__main__":
    run()