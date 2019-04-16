import pandas as pd
import csv
import json
from numpy import percentile

def data(filename):

    # Read data from csv file and then .loc the wanted columns and store them into 'data'
    data = pd.read_csv(filename).loc[:, ["Country", "Region", "Pop. Density (per sq. mi.)", "Infant mortality (per 1000 births)", "GDP ($ per capita) dollars"]]

    data["Region"] = data["Region"].str.strip()
    region = data.sort_values(by=["Region"])
    region = region["Region"]

    data["Pop. Density (per sq. mi.)"] = data["Pop. Density (per sq. mi.)"].str.replace(",", ".")
    data["Pop. Density (per sq. mi.)"] = pd.to_numeric(data["Pop. Density (per sq. mi.)"], errors='coerce')
    pop_density = data.sort_values(by=["Pop. Density (per sq. mi.)"])
    pop_density = pop_density["Pop. Density (per sq. mi.)"]

    data["Infant mortality (per 1000 births)"] = data["Infant mortality (per 1000 births)"].str.replace(",", ".")
    data["Infant mortality (per 1000 births)"] = pd.to_numeric(data["Infant mortality (per 1000 births)"], errors='coerce')
    inf_mortality = data.sort_values(by=["Infant mortality (per 1000 births)"])
    inf_mortality = inf_mortality["Infant mortality (per 1000 births)"]

    data["GDP ($ per capita) dollars"] = data["GDP ($ per capita) dollars"].str.strip(" dollars")
    data["GDP ($ per capita) dollars"] = pd.to_numeric(data["GDP ($ per capita) dollars"], errors='coerce')
    gdp = data.sort_values(by=["GDP ($ per capita) dollars"])
    gdp = gdp["GDP ($ per capita) dollars"]

    # calculate min/max
    print(gdp.std())
    print("GDP Mean:", gdp.mean(),"GDP Median:", gdp.median(),"GDP Mode:", gdp.mode())

    # print(gdp.quantile(0.25))
    # print(gdp.quantile(0.75))

if __name__ == "__main__":
    data('input.csv')



# import necessary libs
# load into pandas Dataframe
# print dataframe
#
#
#
