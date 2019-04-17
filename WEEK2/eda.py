import pandas as pd
import csv
import json
import matplotlib.pyplot as plt

def datafile(filename):

    # Read data from csv file and then .loc the wanted columns and store them into 'data'
    data = pd.read_csv(filename).loc[:, ["Country", "Region", "Pop. Density (per sq. mi.)", "Infant mortality (per 1000 births)", "GDP ($ per capita) dollars"]]

    # Strip al the excess tabs from Region data
    data["Region"] = data["Region"].str.strip()

    # Replace ',' for '.' and change strings into numerical data
    data["Pop. Density (per sq. mi.)"] = data["Pop. Density (per sq. mi.)"].str.replace(",", ".")
    data["Pop. Density (per sq. mi.)"] = pd.to_numeric(data["Pop. Density (per sq. mi.)"], errors='coerce')

    # Replace ',' for '.' and change strings into numerical data
    data["Infant mortality (per 1000 births)"] = data["Infant mortality (per 1000 births)"].str.replace(",", ".")
    data["Infant mortality (per 1000 births)"] = pd.to_numeric(data["Infant mortality (per 1000 births)"], errors='coerce')

    # Strip excess ' dollars' from data and convert to numerical data
    data["GDP ($ per capita) dollars"] = data["GDP ($ per capita) dollars"].str.strip(" dollars")
    data["GDP ($ per capita) dollars"] = pd.to_numeric(data["GDP ($ per capita) dollars"], errors='coerce')

    # Remove numerical index, drop NaN values and drop Surinam because of extreme unlikely outliers
    data.set_index("Country", inplace=True)
    data.dropna(inplace=True)
    data = data.drop(data["GDP ($ per capita) dollars"].idxmax())

    return(data)

def printfunction(data):
    """
    Print the full describe function to show five number summary for Infant mortality.
    and print the GDP mean, median and mode.
    """
    print("Five Number Summary:\n", data["Infant mortality (per 1000 births)"].describe())
    print("GDP DATA:\n", "GDP Mean:", data["GDP ($ per capita) dollars"].mean(),"GDP Median:", data["GDP ($ per capita) dollars"].median(), "GDP Mode:", data["GDP ($ per capita) dollars"].mode()[0])

def histogram(data):
    """
    Visualizing a histogram for GDP and show it
    """
    # Make a histogram for GDP
    plt.hist(data["GDP ($ per capita) dollars"])

    # Give a title and label the axis
    plt.title('GDP ($ per capita) dollars')
    plt.xlabel('GDP')
    plt.ylabel('# of Countries')

    # show the histogram
    plt.show()

def boxplot(data):
    """
    Visualizing a boxplot for Infant mortality and show it
    """
    # Make a boxplot for infant mortality
    plt.boxplot(data["Infant mortality (per 1000 births)"])

    # Give a title and label the axis
    plt.title('Boxplotted Infant mortality')
    plt.ylabel('# of Deaths')

    # show the plot
    plt.show()

def scatterplot(data):
    """
    Visualizing a scatteplot for GDP on X-axis
    and Infant mortality on y-axis and show it
    """
    # Make a scatterplot for infant mortality/GDP
    plt.scatter(data["GDP ($ per capita) dollars"], data["Infant mortality (per 1000 births)"])

    # Give a title and label the axis
    plt.title("Scattered GDP per capita/Infant mortality")
    plt.xlabel('GDP per capita')
    plt.ylabel('Infant mortality')

    # show the plot
    plt.show()

if __name__ == "__main__":
    # get data from input.csv via datafile
    data = datafile('input.csv')

    # execute methods with 'data' data
    histogram(data)
    printfunction(data)
    boxplot(data)
    scatterplot(data)

    # Data to JSON file
    data.to_json("fulldatafile.json", orient="index")
