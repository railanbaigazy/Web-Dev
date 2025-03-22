def centered_average(nums):
    nums.sort()
    nums.pop(0)
    nums.pop(-1)
    sum = 0
    for i in range(len(nums)):
        sum += nums[i]
    return sum // len(nums)