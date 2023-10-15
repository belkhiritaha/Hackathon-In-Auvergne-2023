import pandas as pd
import matplotlib.pyplot as plt
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

df_numeric = df.drop(columns=['Type de plantation'])

hac = AgglomerativeClustering(n_clusters=3, linkage='ward')

labels = hac.fit_predict(df_numeric)

df['Cluster'] = labels

cluster_0 = df[df['Cluster'] == 0]
cluster_1 = df[df['Cluster'] == 1]
cluster_2 = df[df['Cluster'] == 2]

def meilleure_plantation_par_ponderation(cluster, coefficient_capacite, coefficient_benefice):
    X = cluster[['Capacite']].values
    y = coefficient_capacite * cluster['Capacite'].values + coefficient_benefice * cluster['Benefice'].values
    reg = LinearRegression().fit(X, y)
    predictions = reg.predict(X)
    meilleure_index = predictions.argmax()
    meilleure_plantation = cluster.iloc[meilleure_index]['Type de plantation']
    return meilleure_plantation

coefficient_capacite = 0.5
coefficient_benefice = 0.5

meilleure_plantation_cluster_0 = meilleure_plantation_par_ponderation(cluster_0, coefficient_capacite, coefficient_benefice)
meilleure_plantation_cluster_1 = meilleure_plantation_par_ponderation(cluster_1, coefficient_capacite, coefficient_benefice)
meilleure_plantation_cluster_2 = meilleure_plantation_par_ponderation(cluster_2, coefficient_capacite, coefficient_benefice)

# Fonction pour créer un graphique avec des barres hachurées si les barres se superposent
def plot_cluster_comparison_with_hatching(cluster_df, cluster_number):
    plt.figure(figsize=(8, 6))
    x = range(len(cluster_df))
    
    # Barres de capacité
    plt.bar(x, cluster_df['Capacite'], width=0.4, label='Capacité', hatch='/', alpha=0.7)
    
    # Barres de bénéfice
    plt.bar([i + 0.4 for i in x], cluster_df['Benefice'], width=0.4, label='Bénéfice', hatch='\\', alpha=0.7)
    
    plt.xlabel('Type de plantation')
    plt.ylabel('Valeurs')
    plt.title(f'Comparaison des plantations - Cluster {cluster_number}')
    plt.legend()
    plt.xticks([i + 0.2 for i in x], cluster_df['Type de plantation'])
    plt.show()

plot_cluster_comparison_with_hatching(cluster_0, 0)
plot_cluster_comparison_with_hatching(cluster_1, 1)
plot_cluster_comparison_with_hatching(cluster_2, 2)
