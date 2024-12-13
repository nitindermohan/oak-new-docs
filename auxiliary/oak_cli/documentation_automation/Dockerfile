FROM python:3.11-slim-bookworm

WORKDIR /documentation_automation
COPY docs docs
COPY requirements.txt .
COPY reformat_html.sh .

RUN pip install -r requirements.txt
