import requests
import random

def send_data():
    y = random.randint(55, 68)
    data = {
        'y': y,
        'expected': y
    }
    r = requests.post('http://localhost:3000/sensors/652b3704440d9c35e387a79a/data', json=data)

    print(r.text)

def send_faulty_data():
    y = 120
    data = {
        'y': y,
        'expected': y / 2
    }
    r = requests.post('http://localhost:3000/sensors/652b3704440d9c35e387a79a/data', json=data)

    print(r.text)

def main():
    for i in range(5):
        send_data()

    send_faulty_data()

    for i in range(2):
        send_data()

if __name__ == '__main__':
    main()