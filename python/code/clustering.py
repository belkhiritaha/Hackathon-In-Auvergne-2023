import pandas as pd
from sklearn.cluster import AgglomerativeClustering

data = {
    'Type de plantation': ['Tomate','Orge', 'Carotte', 'Aubergine', 'Pomme de terre'],
    'Type de terre': [2, 1, 2, 2, 1],  # Le type de terre est défini comme 2 (par exemple, terre de jardin standard).
    'Date': [3, 3, 5, 5, 3],  # Date de plantation (valeurs aléatoires entre 1 et 6 mois).
    'Heure': [8] * 5,  # Heure moyenne de plantation.
    'Humidite': [ 40, 70, 20, 60, 90],  # Niveau d'humidité 
    'Température': [10, 25, 27, 26, 15],  # Température 
    'Arrosage': ['Oui','Non','Oui','Oui','Non'],  
    'TafterArrosage': [1] * 5,  # Temps moyen après l'arrosage pour ces légumes.
    'Benefice': [40, 20, 50, 55, 67],  # bénéfice en termes d'argent 
    'Capacite': [45, 85, 96, 74, 35,],  # capacite d'eau necessaire pour planter 
    'Fertilite': [20, 45, 89, 23, 75], # taux d'azote dans le sol 
    'Index': range(1, 6)
}

    

df = pd.DataFrame(data)

df['Arrosage'] = df['Arrosage'].map({'Oui': 1, 'Non': 0})

# Exclure la colonne "Type de plantation" de l'analyse
df_numeric = df.drop(columns=['Type de plantation'])

hac = AgglomerativeClustering(n_clusters=3, linkage='ward')

labels = hac.fit_predict(df_numeric)

# Ajouter les étiquettes de cluster au DataFrame original
df['Cluster'] = labels

print(df)


