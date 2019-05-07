import pandas as pd
import csv
import json

def data_from_csv(filename):
    """
    Get data from csv file, apply dateconverter and set index & return
    """
    # Get 'date' and 'windspeed' from csv file
    dataset = pd.read_csv(filename, usecols=['temperature', 'date'])

    # Apply dateconverter and set index to date
    dataset['date'] = dataset['date'].apply(dateconverter)
    dataset.set_index("date", inplace=True)

    return(dataset)

#     """
#     Insert '-' into given locations to dates for convenience & easier conversion
#     later on in js
#     """
    x = str(date)
    a = str(x[:4])
    b = "-"
    c = str(x[4:6])
    d = "-"
    e = str(x[6:])

    return a + b + c + d + e

if __name__ == "__main__":
    # Get data from input.csv via datafile
    data = data_from_csv('test.csv')

    # Data to JSON file
    data.to_json("cleaned_file.json", orient="index")
