import matplotlib.pyplot as plt
import numpy as np

# Données du terrain
terrain = [[95, 5, 93, 69, 72, 89, 34, 42, 9, 17],
           [4, 26, 32, 24, 95, 90, 61, 98, 71, 88],
           [90, 94, 15, 55, 6, 21, 10, 39, 78, 10],
           [8, 69, 84, 90, 41, 2, 54, 89, 33, 64],
           [88, 44, 16, 52, 69, 45, 21, 66, 71, 68],
           [18, 25, 67, 47, 56, 54, 100, 23, 63, 41],
           [39, 14, 56, 95, 16, 94, 34, 10, 83, 12],
           [13, 79, 6, 68, 70, 89, 70, 81, 0, 2],
           [84, 60, 91, 72, 97, 16, 0, 81, 53, 91],
           [79, 56, 25, 5, 43, 33, 40, 70, 17, 42]]

# Résultats des clusters (liste de meilleures plantations pour chaque zone)
meilleures_plantations = [
    ['Carotte', 'Orge', 'Orge', 'Carotte', 'Orge', 'Carotte', 'Carotte', 'Carotte', 'Carotte', 'Carotte'],
    ['Carotte', 'Carotte', 'Carotte', 'Carotte', 'Orge', 'Orge', 'Orge', 'Orge', 'Carotte', 'Orge'],
    ['Carotte', 'Orge', 'Orge', 'Carotte', 'Orge', 'Carotte', 'Carotte', 'Carotte', 'Carotte', 'Carotte'],
    ['Carotte', 'Orge', 'Carotte', 'Orge', 'Orge', 'Carotte', 'Orge', 'Orge', 'Orge', 'Carotte'],
    ['Carotte', 'Carotte', 'Orge', 'Orge', 'Carotte', 'Carotte', 'Carotte', 'Orge', 'Carotte', 'Carotte'],
    ['Carotte', 'Carotte', 'Orge', 'Orge', 'Carotte', 'Carotte', 'Orge', 'Orge', 'Orge', 'Orge'],
    ['Orge', 'Carotte', 'Orge', 'Carotte', 'Carotte', 'Carotte', 'Orge', 'Carotte', 'Orge', 'Orge'],
    ['Carotte', 'Orge', 'Carotte', 'Orge', 'Orge', 'Carotte', 'Orge', 'Orge', 'Orge', 'Orge'],
    ['Carotte', 'Orge', 'Orge', 'Orge', 'Orge', 'Carotte', 'Carotte', 'Orge', 'Orge', 'Orge'],
    ['Orge', 'Orge', 'Orge', 'Orge', 'Orge', 'Carotte', 'Carotte', 'Carotte', 'Carotte', 'Orge']
]

# Convertir les données en tableau numpy pour la création du graphique
terrain_array = np.array(terrain)

# Créer une figure et un axe pour le terrain
fig, ax = plt.subplots()

# Créer une carte de chaleur du terrain
cax = ax.matshow(terrain_array, cmap='coolwarm')
fig.colorbar(cax)

# Afficher les clusters (meilleures plantations) sur le terrain
for i in range(10):
    for j in range(10):
        text = ax.text(j, i, meilleures_plantations[i][j], ha='center', va='center', color='black', fontsize=8)

# Personnaliser les étiquettes pour le terrain
ax.set_xticks(np.arange(10))
ax.set_yticks(np.arange(10))
ax.set_xticklabels(np.arange(1, 11))
ax.set_yticklabels(np.arange(1, 11))
ax.set_xlabel("Colonnes (zones)")
ax.set_ylabel("Lignes (zones)")

# Afficher le graphique
plt.show()
