import matplotlib.pyplot as plt
from datetime import date

# Dummy data for TAM, SAM, SOM over time
data_points = [
    {"date": date(2025, 1, 1), "tam": 1000, "sam": 600, "som": 150},
    {"date": date(2025, 6, 1), "tam": 1100, "sam": 650, "som": 180},
    {"date": date(2026, 1, 1), "tam": 1200, "sam": 700, "som": 210},
    {"date": date(2026, 6, 1), "tam": 1300, "sam": 750, "som": 250},
    {"date": date(2027, 1, 1), "tam": 1400, "sam": 800, "som": 300}
]

# Extracting data for plotting
dates = [point["date"] for point in data_points]
tam_values = [point["tam"] for point in data_points]
sam_values = [point["sam"] for point in data_points]
som_values = [point["som"] for point in data_points]

# Plotting the graph
plt.figure(figsize=(10, 6))
plt.plot(dates, tam_values, label="TAM ($M)", marker='o')
plt.plot(dates, sam_values, label="SAM ($M)", marker='o')
plt.plot(dates, som_values, label="SOM ($M)", marker='o')

# Formatting the graph
plt.title("TAM, SAM, SOM Market Projection Over Time")
plt.xlabel("Timeline")
plt.ylabel("Market Size ($M)")
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()

# Display the plot
plt.show()
