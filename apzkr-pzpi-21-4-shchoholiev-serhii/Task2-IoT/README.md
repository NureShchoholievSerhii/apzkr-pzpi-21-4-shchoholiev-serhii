# it-ingredients-recognizer
Ingredients Recognizer is a Python app for Raspberry PI that powers Ingredients Tracker system, focusing on inventory management and recipe processing for both home and professional kitchens. 

## Building application
``` bash
python -m build
```

## Accessing Raspberry Pi through ssh
1. Find Pi in network
    ``` bash
    arp -a
    ```
2. Connect to Pi: ssh username@devicename
    ``` bash
    ssh shchoholiev@sis-access-point
    ```
3. Enter password: 1654

## Installing application on Raspberry Pi
1. Copy wheel to Pi
    ``` bash
    scp dist/ingredients_recognizer-1.0.0-py3-none-any.whl shchoholiev@sis-access-point:/home/shchoholiev
    ```
2. On Raspberry Pi - install app as sudo (required for camera access)
    ``` bash
    sudo pip install ingredients_recognizer-1.0.0-py3-none-any.whl
    ```
3. Run the app
    ``` bash
    sudo ingredients_recognizer
    ```