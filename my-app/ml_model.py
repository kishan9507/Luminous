import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def generate_dummy_data():
    np.random.seed(42)
    hours = np.arange(0, 168)  # 24 hours * 7 days
    consumption = np.random.poisson(lam=20, size=168) + (hours // 24) * 5  #consumption with a daily increase
    return pd.DataFrame({'Hour': hours, 'Consumption': consumption})

# Load and preprocess data
def load_data():
    data = generate_dummy_data()
    X = data[['Hour']].values  #(hour of the week)
    y = data['Consumption'].values  #(energy consumption)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test

def build_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=(1,)),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(1)
    ])
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

def train_model(model, X_train, y_train):
    model.fit(X_train, y_train, epochs=100, batch_size=16, verbose=1)

def save_model(model):
    model.save('energy_consumption_model.h5')

if __name__ == "__main__":
    X_train, X_test, y_train, y_test = load_data()
    model = build_model()
    train_model(model, X_train, y_train)

    save_model(model)

    print("Model training complete and saved as 'energy_consumption_model.h5'.")
