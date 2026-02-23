import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import pickle
 
df = pd.read_csv("dataset/Training.csv")
X = df.drop("prognosis", axis=1)
y = df["prognosis"]

model = DecisionTreeClassifier()
model.fit(X, y)

with open("model/disease_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved.")
