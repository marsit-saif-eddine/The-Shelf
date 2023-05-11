from flask import Flask,request
from pymongo import MongoClient as MongoClient
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from scipy.sparse import coo_matrix
import numpy as np
import json


client = MongoClient("mongodb+srv://TheShelf:zN5uGxM3vIDdvN1B@clustertheshelf.6hfio6i.mongodb.net/"
                             "?retryWrites=true&w=majority")

db = client['test']

collection = db['books']
collectionLikedBooks = db['liked_books_fulls']

app=Flask(__name__)
@app.route('/recommend',methods=['GET'])
def recommend_books():
        user_id =request.args.get('user_id')
        documentsLiked = list(collectionLikedBooks.find({"user_id": user_id}))
        documentsBook = list(collection.find())


        my_LikedBooks = pd.DataFrame(documentsLiked)
        books_titles = pd.DataFrame(documentsBook)


        my_LikedBooks["book_id"] = my_LikedBooks["book_id"].astype(str)  


        book_set = set(my_LikedBooks["book_id"])

        overlap_users = {}

        with open("goodreads_interactions_comics_graphic.json", 'r') as f:
            for line in f:
                data = json.loads(line)
                user_id = data["user_id"]
                book_id = data["book_id"]
                if book_id in book_set:
                    if user_id not in overlap_users:
                        overlap_users[user_id] = 1
                    else:
                        overlap_users[user_id] += 1


        filtered_overlap_users = set([k for k in overlap_users if overlap_users[k] > my_LikedBooks.shape[0]/5])


        interactions_list = []

        with open("goodreads_interactions_comics_graphic.json", 'r') as f:
            for line in f:
                data = json.loads(line)
                user_id = data["user_id"]
                book_id = data["book_id"]
                rating = data ['rating']
                if user_id in filtered_overlap_users:
                    interactions_list.append([user_id, book_id, rating])

        interactions = pd.DataFrame(interactions_list, columns=["user_id", "book_id", "rating"])

        interactions = pd.concat([my_LikedBooks[["user_id", "book_id", "rating"]], interactions])

        interactions["book_id"] = interactions["book_id"].astype(str)
        interactions["user_id"] = interactions["user_id"].astype(str)
        interactions["rating"] = pd.to_numeric(interactions["rating"])

        interactions["user_index"] = interactions["user_id"].astype("category").cat.codes

        interactions["book_index"] = interactions["book_id"].astype("category").cat.codes


        ratings_mat_coo = coo_matrix((interactions["rating"], (interactions["user_index"], interactions["book_index"])))


        ratings_mat = ratings_mat_coo.tocsr()


        similarity = cosine_similarity(ratings_mat[my_index,:], ratings_mat).flatten()


        import numpy as np

        indices = np.argpartition(similarity, -15)[-15:]

        similar_users = interactions[interactions["user_index"].isin(indices)].copy()


        similar_users = similar_users[similar_users["user_id"]!="-1"]


        book_recs = similar_users.groupby("book_id").rating.agg(['count', 'mean'])

        books_titles["book_id"] = books_titles["book_id"].astype(str)


        books_list = books_titles.to_dict(orient="records")

        book_recs = book_recs.merge(books_titles, how="inner", on="book_id")


        book_recs["adjusted_count"] = book_recs["count"] * (book_recs["count"] / book_recs["ratings"])

        book_recs["score"] = book_recs["mean"] * book_recs["adjusted_count"]



        book_recs = book_recs[~book_recs["book_id"].isin(my_LikedBooks["book_id"])]


        my_LikedBooks["title"] = my_LikedBooks["title"].str.replace("[^a-zA-Z0-9 ]", "", regex=True).str.lower()


        book_recs = book_recs[~book_recs["book_id"].isin(my_LikedBooks["book_id"])]

        book_recs = book_recs[book_recs["mean"] >=3]


        book_recs = book_recs[book_recs["count"]>4]


        top_recs = book_recs.sort_values("mean", ascending=False)

        return top_recs["_id"].tolist()








