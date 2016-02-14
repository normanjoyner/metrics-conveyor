FROM library/node:5.6.0

MAINTAINER Norman Joyner <norman.joyner@gmail.com>

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
CMD node application
