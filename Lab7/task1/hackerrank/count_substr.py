def count_substring(string, sub_string):
    l = 0
    r = len(sub_string)
    count = 0
    
    while r <= len(string):
        if string[l:r] == sub_string:
            count += 1
        l += 1
        r += 1
    
    return count

if __name__ == '__main__':
    string = input().strip()
    sub_string = input().strip()
    
    count = count_substring(string, sub_string)
    print(count)