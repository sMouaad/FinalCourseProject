# What is the problem?

We often find ourselves lost when reading research papers, gleaning for what is actually useful and applicable in daily life, and people often lack time/are not interested in reading research papers, hence the need of an automated way to scrape through these research papers, and extract tools or protocols that we can implement & apply in our daily life.

# How to solve the problem?


- First, we need to identify where to extract data, https://scholar.google.com is a decent choice.
- Second, we need to narrow the data down to our needs, in this case, anything relevant to Autism & Alzheimer
- Third, we need to implement a Natural Language Processor (NLP) to identify and track the tools & protocols, how to do that?

## Solution 1: From Scratch

By making our own NLP, which will be very costy in terms of time.

## Solution 2 : Using an already pre-trained NLP model

To hasten the deployment of this project and save ourselves the hassle of making our own NLP, we use a pre-trained NLP model.

Our choice is Google's Bert, why?
		
- Because it's free and responds to our needs.
- Because it's a bidirectional transformer model, unlike chatgpt, This makes it better suited for sentiment analysis or natural language understanding (NLU) tasks, which is handy to attain our goal.
	
for more in-depth info : https://blog.invgate.com/gpt-3-vs-bert
	
We're gonna use a pre-trained model directed towards scientific papers, scibert.

https://github.com/allenai/scibert/

## Solution 3 : using an API of an already existing AI responding to these needs

https://consensus.ai/
This app might help us, unfortunately, it is commercial and it doesn't provide an API, however, it is a good reference point to make our own AI.




