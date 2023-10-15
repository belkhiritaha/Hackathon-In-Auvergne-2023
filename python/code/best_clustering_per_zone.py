import pandas as pd
from sklearn.cluster import AgglomerativeClustering
from sklearn.linear_model import LinearRegression

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

# Initialiser des variables pour stocker les clusters
cluster_0 = df[df['Cluster'] == 0]
cluster_1 = df[df['Cluster'] == 1]
cluster_2 = df[df['Cluster'] == 2]

# Créer une fonction pour trouver la meilleure plantation par rapport à la capacité et au bénéfice pondérés
def meilleure_plantation_par_ponderation(cluster, coefficient_capacite, coefficient_benefice):
    X = cluster[['Capacite']].values
    y = coefficient_capacite * cluster['Capacite'].values + coefficient_benefice * cluster['Benefice'].values
    reg = LinearRegression().fit(X, y)
    predictions = reg.predict(X)
    meilleure_index = predictions.argmax()  # Indice de la meilleure plantation
    meilleure_plantation = cluster.iloc[meilleure_index]['Type de plantation']
    return meilleure_plantation

# Appliquer la régression linéaire et obtenir la meilleure plantation pondérée pour chaque cluster
coefficient_capacite = 0.5  # Coefficient de pondération pour la capacité (ajustez selon vos préférences)
coefficient_benefice = 0.5  # Coefficient de pondération pour le bénéfice (ajustez selon vos préférences)

meilleure_plantation_cluster_0 = meilleure_plantation_par_ponderation(cluster_0, coefficient_capacite, coefficient_benefice)
meilleure_plantation_cluster_1 = meilleure_plantation_par_ponderation(cluster_1, coefficient_capacite, coefficient_benefice)
meilleure_plantation_cluster_2 = meilleure_plantation_par_ponderation(cluster_2, coefficient_capacite, coefficient_benefice)

# Afficher les meilleures plantations pondérées dans chaque cluster
print("Meilleure plantation ponderee dans le cluster 0 :", meilleure_plantation_cluster_0)
print("Meilleure plantation ponderee dans le cluster 1 :", meilleure_plantation_cluster_1)
print("Meilleure plantation ponderee dans le cluster 2 :", meilleure_plantation_cluster_2)
