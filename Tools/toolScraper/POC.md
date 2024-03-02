# What is the problem?

We often find ourselves lost when reading research papers, gleaning for what is actually useful and applicable in daily life, and people often lack time/are not interested in reading research papers, hence the need of an automated way to scrape through these research papers, and extract tools or protocols that we can implement & apply in our daily life.

# How to solve the problem?


## First - Data Extraction :
We need to identify where to extract data, for this, we are going to use an API, which is from https://semanticscholar.org
### Why? 
- Because when extracting research papers, it already manages the potential conflicts of interest.
- Because it is free. 

## Second - Scope of Data :
We need to narrow the data down to our needs, in this case, anything relevant to Autism & Alzheimer
## Third - we need to implement a way to identify and track the tools & protocols, how to do that?

### Solution 1: Making a Natural Language Processor (NLP) From Scratch

Which will be very costy in terms of time.

### Solution 2 : Using an already pre-trained NLP model

To hasten the deployment of this project and save ourselves the hassle of making our own NLP, we use a pre-trained NLP model.

Our choice is Google's Bert, why?
		
- Because it's free, open-source and responds to our needs.
- Because it's a bidirectional transformer model, unlike chatgpt, This makes it better suited for sentiment analysis or natural language understanding (NLU) tasks, which is handy to attain our goal.
	
for more in-depth info : https://blog.invgate.com/gpt-3-vs-bert
	
We're gonna use a pre-trained model directed towards scientific papers, scibert.

https://github.com/allenai/scibert/

### Solution 3 : using an API of an already existing AI responding to these needs

Let's say ChatGPT's AI, we can leverage its usage to glean the tools off the data we've extracted and narrowed to autism & alzheimer in step 1 & 2.

# Goal Tree of the Tool
![goaltree](https://github.com/sMouaad/FinalCourseProject/assets/93816869/c7872d55-4c47-4800-b23b-08b8d7cb11da)
# Resources :
https://consensus.app/
This app might help us, unfortunately, it is commercial and it doesn't provide an API, however, it is a good reference point to make our own AI.

https://www.semanticscholar.org/product/api/tutorial#datasets
Semantic Scholar (SS) tutorial on how to use the api & extract datasets.

API Key of SS : m8XVuK1HPqQLbkFFR5GK1gx2KuTsUUw2wTeV2mJ8

https://arxiv.org/pdf/2301.10140.pdf
Research paper about Semanticscholar.org


https://aclanthology.org/D19-1371.pdf
Research paper about scibert, the pre-trained model.


