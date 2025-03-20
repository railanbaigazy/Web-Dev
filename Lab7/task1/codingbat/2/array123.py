def array123(nums):
  for i in range(2, len(nums)):
    if nums[i-2] == 1 and nums[i-1] == 2 and nums[i] == 3:
      return True
  return False
