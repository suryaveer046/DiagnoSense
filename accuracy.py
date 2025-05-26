import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

# Load datasets
train_df = pd.read_csv("dataset/Training.csv")
test_df = pd.read_csv("dataset/Testing.csv")

# Features and labels
X_train = train_df.drop(columns=['prognosis'])
y_train = train_df['prognosis']
X_test = test_df.drop(columns=['prognosis'])
y_test = test_df['prognosis']

# Encode labels
le = LabelEncoder()
y_train_encoded = le.fit_transform(y_train)
y_test_encoded = le.transform(y_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train_encoded)

# Predict and evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test_encoded, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")
