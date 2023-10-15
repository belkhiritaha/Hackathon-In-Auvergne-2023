import pandas as pd
from sklearn.cluster import AgglomerativeClustering
import matplotlib.pyplot as plt
import numpy as np


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

# Calcul des centres de clusters
cluster_centers = []
for cluster_id in np.unique(labels):
    cluster_points = df[df['Cluster'] == cluster_id]
    cluster_center = cluster_points[['Capacite', 'Benefice']].mean()
    cluster_centers.append(cluster_center)

cluster_colors = ['r', 'g', 'b']  # Couleurs pour les clusters
point_colors = [cluster_colors[cluster_id] for cluster_id in labels]  # Couleurs des points

# Calcul du cercle entourant le centre du cluster
def calculate_cluster_radius(cluster_points, center):
    distances = np.sqrt(np.sum((cluster_points - center.values) ** 2, axis=1))
    return np.max(distances)

plt.figure(figsize=(10, 6))
for center, color, cluster_id in zip(cluster_centers, cluster_colors, np.unique(labels)):
    cluster_points = df[df['Cluster'] == cluster_id]
    cluster_points_values = cluster_points[['Capacite', 'Benefice']].values
    cluster_radius = calculate_cluster_radius(cluster_points_values, center)
    plt.scatter(center['Capacite'], center['Benefice'], c=color, marker='o', s=3000, alpha=0.3, edgecolors='k', label=f'Cluster {cluster_colors.index(color)}')
    plt.gca().add_patch(plt.Circle((center['Capacite'], center['Benefice']), cluster_radius, color=color, alpha=0.1))
    for _, row in cluster_points.iterrows():
        plt.text(row['Capacite'], row['Benefice'], row['Type de plantation'], fontsize=10, ha='center')

plt.xlabel('Capacite')
plt.ylabel('Benefice')
plt.title('Clusters de plantations')
plt.legend()
plt.show()
