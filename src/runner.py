import argparse
import subprocess
import os

from datetime import datetime

def clean_query(query):
    return query.splitlines()[0]

def run(queries, output_folder, timeout_ms):

    for query in queries:
        query = clean_query(query)
        output = "{}/{}.png".format(output_folder, query.replace(" ", "_"))
        subprocess.call(['casperjs', 'src/scraper.js', query, output, timeout_ms])

def create_dir_if_needed(directory):

    if not directory:
        new_directory = "output/{}".format(datetime.now().strftime('%Y_%m_%d_%H_%M_%S'))
        print "creating output directory: {} ".format(new_directory)
        os.makedirs(new_directory)
        return new_directory

    if not os.path.exists(directory):
        print "creating output directory"
        os.makedirs(directory)
        
    return directory

def _parse_args():
    parser = argparse.ArgumentParser(description='Run this Adops Alert Script')
    parser.add_argument('--csv', type = str, required=True, help = 'location where the queries are')
    parser.add_argument('--output_folder', type = str, help = 'output folder for the images')
    parser.add_argument('--timeout_ms', type = str, default=5000, help = 'timeout for waiting for google to autocorrect')
    return parser.parse_args()

if __name__ == "__main__":

    _args = _parse_args()

    dir = create_dir_if_needed(_args.output_folder)

    queries = open(_args.csv).readlines()

    run(queries, dir, _args.timeout_ms)
