data = {
    'Type de plantation': ['Tomate', 'Orge', 'Carotte', 'Aubergine', 'Pomme de terre'],
    'Type de terre': [2, 1, 2, 2, 1],
    'Date': [3, 3, 5, 5, 3],
    'Heure': [8] * 5,
    'Humidite': [40, 70, 20, 60, 90],
    'Température': [10, 25, 27, 26, 15],
    'Arrosage': ['Oui', 'Non', 'Oui', 'Oui', 'Non'],
    'TafterArrosage': [1] * 5,
    'Benefice': [40, 20, 50, 55, 67],
    'Capacite': [45, 85, 96, 74, 35],
    'Fertilite': [20, 45, 89, 23, 75],
    'Index': range(1, 6)
}

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

# Liste pour stocker la meilleure plantation pour chaque zone
meilleures_plantations = []

for i in range(10):
    for j in range(10):
        humidite_zone = terrain[i][j]

        # Créer un dictionnaire pour stocker le besoin d'humidité de chaque plante
        besoins_humidite = {}
        for plante, humidite in zip(data['Type de plantation'], data['Humidite']):
            besoins_humidite[plante] = humidite

        # Trouver la plante dont les besoins en humidité correspondent le mieux à la zone
        meilleure_plante = min(besoins_humidite, key=lambda plante: abs(besoins_humidite[plante] - humidite_zone))
        
        # Ajouter la meilleure plantation pour cette zone à la liste
        meilleures_plantations.append(meilleure_plante)

# Imprimer la liste de meilleures plantations pour chaque zone
for i in range(10):
    for j in range(10):
        zone = i * 10 + j + 1
        print(f"Meilleure plantation pour la zone {zone} : {meilleures_plantations[zone - 1]}")
