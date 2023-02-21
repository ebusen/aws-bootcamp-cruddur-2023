FROM python:3.10-slim-buster
#inside the container
#make a new folder inside the container
WORKDIR /backend-flask
#outside to container--->inside the container
#libraries we want to install to run the app
COPY requirements.txt requirements.txt
#inside the container
#install python libraries to run the app
RUN pip3 install -r requirements.txt
# . means everything in the current directory
#first . everything in the /backend-flask directory(outside the container)
#second . everything in the /backend-flask directory(inside the container)
COPY . .
#set environment variables(inside the container)
#they will remain set while the app is running
ENV FLASK_ENV=development

EXPOSE ${PORT}

# command 
#-m stands for module
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]