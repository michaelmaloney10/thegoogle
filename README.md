# thegoogle

# High level

You want to be able to run these queries from a CSV and have them output to a folder. All of these instructions assume you are
within this repositories directory when you run the commands.

On your computer that is this directory:

```sh
/Users/michaelmaloney/Documents/GitHub/thegoogle
```

In order to get to this directory navigate from githu desktop or run this command in terminal:

```sh
cd /Users/michaelmaloney/Documents/GitHub/thegoogle
```

# Make an output directory

Within your folder run this command:

```sh
mkdir <name of folder>
#example
mkdir output_2017_12_29
```

# Make a queries csv

Now, make a csv and put it in the top level directory of your repository. You can do this in excel, just make sure to save as csv

# Running it

To run the code use the following:

```sh
python src/runner.py --csv=blah.csv --timeout=7000
```
