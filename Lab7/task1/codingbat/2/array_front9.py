def array_front9(nums):
  i = 0
  while i < len(nums) and i < 4:
    if nums[i] == 9:
      return True
    i += 1
  return False