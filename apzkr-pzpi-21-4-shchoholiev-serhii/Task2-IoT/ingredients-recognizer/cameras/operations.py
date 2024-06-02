import subprocess
import io
from PIL import Image
from app.logger import logger

def capture_image():
    """
    Captures an image from the camera using libcamera-still and flips it 
    because the camera is installed upside down.

    Returns:
        bytes: Image bytes.
        
    Raises:
        Exception: If there is an error capturing the image.
    """

    try:
        temp_image_file = "/tmp/captured_image.jpg"
        
        # Capture image using libcamera-still command
        subprocess.run(["libcamera-still", "-o", temp_image_file, "-t", "100", "--nopreview", "--autofocus-mode=manual", "--lens-position=4"], check=True)

        with open(temp_image_file, "rb") as image_file:
            stream = io.BytesIO(image_file.read())
        
        # Flip the image horizontally
        stream.seek(0)  # Go to the start of the stream
        image = Image.open(stream)
        flipped_image = image.transpose(Image.FLIP_TOP_BOTTOM)

        flipped_stream = io.BytesIO()
        flipped_image.save(flipped_stream, format='jpeg')
        flipped_image_bytes = flipped_stream.getvalue()

        logger.info("Image captured and flipped.")

        return flipped_image_bytes

    except Exception as e:
        logger.error(f"Error processing image: {e}")
        return None