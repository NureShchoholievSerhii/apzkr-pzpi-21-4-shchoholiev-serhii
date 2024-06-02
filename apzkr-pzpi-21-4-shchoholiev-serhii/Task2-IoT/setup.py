from setuptools import setup, find_packages

setup(
    name="ingredients-recognizer",
    version="1.0.0",
    author='Serhii Shchoholiev',
    packages=find_packages(where="ingredients-recognizer"),
    package_dir={'': 'ingredients-recognizer'},
    package_data={
        'app': ['appconfig.json', 'deviceconfig.json'],
    },
    entry_points={
        'console_scripts': [
            'ingredients_recognizer=app.app:run',
        ],
    },
    install_requires=[
        'picamera==1.13',
        'build==1.0.3',
        'certifi==2023.11.17',
        'charset-normalizer==3.3.2',
        'colorzero==2.0',
        'gpiozero==1.6.2',
        'idna==3.4',
        'importlib-metadata==6.8.0',
        'packaging==23.2',
        'Pillow==10.1.0',
        'pyproject_hooks==1.0.0',
        'requests==2.31.0',
        'RPi.GPIO==0.7.1',
        'tomli==2.0.1',
        'urllib3==2.1.0',
        'zipp==3.17.0',
    ]
)