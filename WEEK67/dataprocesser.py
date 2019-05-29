import pandas as pd
import csv
import json

def data_from_csv(filename):
    """
    Get wanted columns from csv file, select wanted values and return dataset
    """
    # # Get columns Location, Measure, Time and  Value from csv file
    dataset = pd.read_csv(filename, usecols=['LOCATION', 'MEASURE', 'TIME', 'Value'])

    # select wanted data from datasets: Measure value: KTOE in year 2014
    dataset = dataset.loc[dataset['MEASURE'] == 'KTOE']
    dataset = dataset.loc[(dataset['TIME'] >= 2012) & (dataset['TIME'] <= 2016)]
    dataset = dataset.loc[dataset['LOCATION'] != 'OECD']

    # Drop USA (outlier) & sort&round values for visualisation purposes as its value is a lot higher and drop NaN values
    dataset = dataset.dropna(subset=['Value']).reset_index()
    
    # 5 JARIGE DATA VAN LANDEN SAMENVOEGEN TOT 1 DATAPUNT IN NIEUWE VARIABELE/COLUMN
    dataset['Value'] = dataset['Value'].round()

    # dataset.sort_values(['Value'], axis=0, ascending=True, inplace=True)
    print(dataset)

    return(dataset)


if __name__ == "__main__":
    # Get data from input.csv via datafile
    data = data_from_csv('dataset.csv')

    # Data to JSON file
    data.to_json("cleaned_file.json", orient="index")
