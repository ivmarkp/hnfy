# Hnfy

### Hacker News *For You*
A webapp to recommend HN stories based on user's topics of interest collated from their own submitted stories on Hacker News.

### Why?
Hacker News is a great place to find some interesting articles on the web, particularly for people in STEM. Community membbers submit links to stories on the web (e.g. news articles, blog posts, research papers etc.). Members can upvote stories that they find interesting and if a story receives many upvotes it rises to the top and starts appearing on the front page.

Since, it is community driven, often front page stories that community collectively finds interesting might not be so for me. Hnfy tries to solve that problem for me and also because I wanted such a thing to exist.

### How?
Trained a topic model on 100K stories titles using LDA, a popular topic modeling technique, to extract some 50 groups of salient keywords. I call these "Reference Topics". Each group of keywords would fall into one or more topics e.g. Blockchain, Security, Programming etc. if you were to annotate them manually. A very large dataset of HN submissions is available on [Google BigQuery](https://bigquery.cloud.google.com/dataset/bigquery-public-data:hacker_news) that I used for training LDA model. A cleaned 2M story titles are available in [this](https://github.com/ivmarkp/hnx) repository where I've kept the backend code.

A few examples out of those extracted topics with non-stemmed keywords:

* Science - human, brain, studies, health, food, scientists, risk, cancer, research, dna, drug, body, sleep, medical
* Video - video, live, music, youtube, tv, netflix, stream, audio, conference, movies, shows, player, radio, spotify
* Government, Security - uk, nsa, bill, police, court, call, surveillance, intelligence, fbi, trump, obama, ban, vote, house

In order to determine user's interests, I only have his/her submitted stories (because if you haven't noticed yet, your upvoted submissions are private). As soon as the user enters a username on the homepage, the following actions take place:

1. Upto 100 stories submitted by the user this year so far are fetched using [Algolia HN Search API](https://hn.algolia.com/api).
2. An LDA model is trained on user's submissions and from 10 extracted topics, top keywords are picked and stemmed.
3. Next, these top keywords are searched in the pre-computed reference topics. All ref-topics that those keywords fall into are selected as the user's interests topics. So, the purpose of ref-topics was to expand the keyword dictionary of user interests topics.
4. Finally, current HN stories are fetched using the Algolia API. For each story, title is tokenized and stemmed. These stemmed tokens are matched with the user's interests topics keywords. Stories with successful matches are displayed along with the topics that they belongs to.
