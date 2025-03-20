if __name__ == '__main__':
    students = []
    scores = []
    ans = []

    for _ in range(int(input())):
        name = input()
        score = float(input())
        students += [[name, score]]
        scores += [score]
    b = sorted(list(set(scores)))[1]

    for a, c in sorted(students):
        if c == b:
            print(a)