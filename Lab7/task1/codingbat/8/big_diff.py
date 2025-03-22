def big_diff(nums):
    max_num = nums[0]
    min_num = nums[0]
    for i in range(1, len(nums)):
        max_num = max(max_num, nums[i])
        min_num = min(min_num, nums[i])
    return max_num - min_num