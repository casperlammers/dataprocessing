#!/usr/bin/env python
# Name: Casper Lammers
# Student number: 10665463
"""
This script visualizes data obtained from a .csv file
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018

# Global dictionary for the data
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}

#def writertest(self):


if __name__ == "__main__":

    with open(INPUT_CSV) as csvfile:
        csv_data = csv.DictReader(csvfile)

        for row in csv_data:
            data_dict[row['Year']].append(float(row['Rating'])
    print(csv_data)
