# function to print sort a list in python

def sort_list(list1):
    list1.sort()
    return list1

# create a list in python with random values
    
import random
lst = []
for i in range(20):
    n = random.randint(1,100)
    lst.append(n)
print(lst)

# shuffle and print list lst

random.shuffle(lst)
print(lst)

# sort a list lst using sort_list function and print the lst

sort_list(lst)
print(lst)

# declare a dict in python script with random initialization with keys as 6 subjets names and  values as set of professors who teaxh them


subject_professors = {"Maths": {"Mr. A", "Mr. B"},
                      "Science": {"Mr. C", "Mr. D"},
                      "History": {"Mr. E", "Mr. F"},
                      "Geography": {"Mr. G", "Mr. H"},
                      "English": {"Mr. I", "Mr. J"},
                      "Computer Science": {"Mr. K", "Mr. L"}}

# debug : print(subject_professors.type) ['dict' object has no attribute 'type']

# write code for merge mfunction in merge sort

# write segment tree snippet in c++

# generate a function to find average of a list
def average(lst):
    return sum(lst) / len(lst)
