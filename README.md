
## computer-algebra-system

The following documentation is based on FoondaMate Software Engineer Coding Challenge-002 Role<br> <br>
computer algebra system is a step by step math solver showing how equations are being solved

#### ```this project uses the``` [mathsteps](https://github.com/google/mathsteps) ```and``` [AsciiMath](https://www.sqlpac.com/en/documents/html-equations-math-with-mathjax-asciimath.html) ```Or``` [AsciiMathMl](https://github.com/asciimath/asciimathml) ```library for computation and presentation respectively```

• Author: [Abiola Yakubu](https://github.com/yakubu234) <br>
• Twitter: [@grandrubicon](https://twitter.com/grandrubicon) <br>
• Linkedin: [Abiola Yakubu](https://www.linkedin.com/in/abiolayakubu/) <br>

## Usage <br>

Setup your coding environment <br>

```git
git clone https://github.com/yakubu234/computer-algebra-system.git
```

 ```cd computer-algebra-system```

Run

```bash
 npm install

```

## Installin Redis-server On Local system (Unix System)

run the following command to install redis-server which gives you a cli interface to confirm the authenticity of redis funtionalty on the local system, restart redis if not started automatically after installation, and check status. All simultaneously.

```bash
sudo apt-get install redis-server
```

```bash
sudo systemctl restart redis
```

```bash
sudo systemctl status redis
```

note the above command is for unix systems. for windows kindly reachout to their official [documentation](https://redis.io/docs/getting-started/)  on how to install redis-server on windows.

## setup the enviroment varriables

locate the example file from

```parent_folder/env/.env.example```

where &nbsp;&nbsp;&nbsp; ```parent_folder``` &nbsp;&nbsp;&nbsp;is  computer-algebra-system

provide values for varraibles such as

```git
PORT=3000
ALLOWED_ORIGIN='http://127.0.0.1:3000'
REDIS_HOST = 127.0.0.1
REDIS_PORT = 6379
REDIS_TTL = 300000000
REDIS_TIMEOUT = 5000
REDIS_PASSWORD=""
```

please know that the above values for the varriables are default values, you are encouraged to change it based on your machines setup

## Run Test

use the following command to run the test

```bash
npm test
```

## endpoint to get the frontend  and a to search for equation solution

localhost:Port

### will take you to the frontend

i.e (the below example believes you are using port 3000 on a localhost address)

```ruby
localhost:3000
```

```bash
post  /search  
```

with  ```search_key```   as payload

Right here, you’ll get a json response.

##

##

## Dependencies used in this project are below

 ```"body-parser": "^1.20.1"``` <br>
```"cors": "^2.8.5"``` <br>
```"dotenv": "^16.0.3"```<br>
```"express": "^4.18.2"``` <br>
```"express-validator": "^6.14.2"```<br>
```"ioredis": "^5.3.1"```<br>
```"mathsteps": "^0.2.0"```<br>
```"nodemon": "^2.0.22"```<br>
```"cross-env": "^7.0.3"```<br>
```"jest": "^29.5.0"```<br>
```"supertest": "^6.3.3```<br>

```NB: the system used redis to cache a successful searched equations to be retrieved when such equation are searched in the future for effective read speed```

### folder structure are as below

```b ash
├── app
│   ├── middleware
│   │   └── RequestValidator.js
│   └── service
│       ├── Caching.js
│       └── SearchService.js
├── env
├── frontend
│   ├── css
│   │   └── main.css
│   ├── index.html
│   ├── javascript
│   │   ├── HttpRequest.js
│   │   ├── main.js
│   │   ├── startup.js
│   │   └── tex-chtml.js
│   └── README.md
├── LICENSE
├── math.js
├── package.json
├── package-lock.json
├── README.md
└── test
    ├── search.failled.test.js
    └── search.passed.test.js
```

# Credits due where credits due…

Thanks to [foondamate](https://careers.foondamate.com/) for giving me the opportunity to showcase my skill [Github Link](https://github.com/yakubu234/computer-algebra-system.git).

```

```
