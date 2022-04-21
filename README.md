# Mastermind Game

<img src="/static/mastermind-screenshot.png" width="350" />

This single page web app replicates the classic decoding board game, Mastermind. When a game is initiated, a secret code is generated. Users have 10 chances to guess the code, and are given feedback after each guess as to whether their numbers are correct, correct and in the right location, or incorrect.

## Table of Contents
 - [Tech Stack](#techstack)
 - [Installation Instructions](#installation)
 - [Version 2.0](#version2)
 - [About the Developer](#about)

## Tech Stack <a name="techstack"></a>
**Backend:** Python3, Flask, Jinja<br>
**Frontend:** HTML5, CSS3, Javascript<br>

## Installation Instruction <a name="installation"></a>

To have this app running on your local computer, please follow the below steps:

Clone repository:

```
$ git clone https://github.com/margaretreed/mastermind.git
```

Create and activate a virtual environment:

```
$ pip3 install virtualenv
$ virtualenv env
$ source env/bin/activate
```

Install dependencies:

```
(env) $ pip3 install -r requirements.txt
```

Start backend server:

```
(env) $ python3 server.py
```

Navigate to `localhost:5000/` 


## Version 2.0 <a name="version2"></a>
- Track wins and losses
- Allow user to toggle hints option to include details on which numbers are correct and in the correct location
- Allow users to increase difficulty in the game by adjusting increasing the amount of numbers used in the secret code

## About the Developer <a name="about"></a>
Meg Reed is a software engineer in Berkeley, CA.