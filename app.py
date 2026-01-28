from flask import Flask, render_template, request, redirect, url_for, session, flash
import pickle
import pandas as pd
import os
from datetime import timedelta

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.permanent_session_lifetime = timedelta(minutes=30) 

# Temporary user storage (would be a database in a real application)
users = {
    "abc": {"password": "123", "name": "Demo User"} 
}

with open("model/disease_model.pkl", "rb") as f: 
    model = pickle.load(f)

symptoms = pd.read_csv("dataset/Training.csv").drop("prognosis", axis=1).columns.tolist() 

@app.route("/")
def root():
    if "user" in session:
        return redirect(url_for("home")) 
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
         
        if username in users and users[username]["password"] == password:
            session.permanent = True
            session["user"] = username
            session["name"] = users[username]["name"]
            return redirect(url_for("home"))
        else:
            return render_template("login.html", error="Invalid username or password")
    
    return render_template("login.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        name = request.form.get("name")
        email = request.form.get("email")
        
        if username in users:
            return render_template("signup.html", error="Username already exists")
        
        # Store new user (would save to database in a real application)
        users[username] = {
            "password": password,
            "name": name,
            "email": email
        }
        
        flash("Account created successfully! Please login.")
        return redirect(url_for("login"))
    
    return render_template("signup.html")

@app.route("/home")
def home():
    if "user" not in session:
        return redirect(url_for("login"))
    
    return render_template("index.html", symptoms=symptoms, user_name=session["name"])

@app.route("/predict", methods=["POST"])
def predict():
    if "user" not in session:
        return redirect(url_for("login"))
    
    input_symptoms = request.form.getlist("symptoms")
    input_vector = [1 if symptom in input_symptoms else 0 for symptom in symptoms]
    prediction = model.predict([input_vector])[0]
    return render_template("result.html", 
                          prediction=prediction, 
                          selected=input_symptoms, 
                          user_name=session["name"])

@app.route("/logout")
def logout():
    session.pop("user", None)
    session.pop("name", None)
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
