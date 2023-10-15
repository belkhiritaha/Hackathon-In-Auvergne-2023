import pandas as pd
import numpy as np
from skrules import SkopeRules

# Données d'entraînement
data = {
    'Type de plantation': ['Tomate', 'Orge', 'Carotte', 'Aubergine', 'Pomme de terre'],
    'Type de terre': [2, 1, 2, 2, 1],
    'Date': [3, 3, 5, 5, 3],
    'Humidite': [40, 70, 20, 60, 90],
    'Température': [10, 25, 27, 26, 15],
    'Arrosage': [1, 0, 1, 0, 1],
    'TafterArrosage': [1, 2, 1, 1, 2],
    'Benefice': [40, 20, 50, 55, 67],
    'Capacite': [45, 85, 96, 74, 35],
    'Fertilite': [20, 45, 89, 23, 75],
    'Index': range(1, 6),
    'Meilleure': [0, 1, 0, 0, 0]  # 1 si la plantation est la meilleure, 0 sinon
}

df = pd.DataFrame(data)
X = df.drop(columns=['Type de plantation', 'Meilleure'])
y = df['Meilleure']

# Effectuer l'encodage one-hot sur les variables catégorielles
X = pd.get_dummies(X, columns=['Arrosage'])

# Assurez-vous que toutes les données sont de type numérique
X = X.astype(float)

# Formation du modèle SkopeRules
clf = SkopeRules()
clf.fit(X, y)

# Saisissez directement les données de plusieurs nouvelles observations
new_data = pd.DataFrame({
    'Type de terre': [2, 1, 2],  # Exemple de trois observations
    'Date': [4, 3, 5],
    'Humidite': [50, 70, 30],
    'Température': [20, 25, 28],
    'Arrosage_Oui': [1, 0, 1],  # Utilisez 1 pour 'Oui' et 0 pour 'Non'
    'Arrosage_Non': [0, 1, 0],
    'TafterArrosage': [2, 1, 1],
    'Benefice': [60, 20, 55],
    'Capacite': [80, 85, 90],
    'Fertilite': [30, 45, 88],
    'Index': [6, 7, 8]
})

# Utilisez le modèle pour prédire la meilleure plantation pour les nouvelles observations
predictions = clf.predict(new_data)

# Affichez les meilleures plantations prédites pour chaque observation
for i, prediction in enumerate(predictions):
    print(f"Meilleure plantation prédite pour l'observation {i + 1} est : {df['Type de plantation'][prediction]}")
