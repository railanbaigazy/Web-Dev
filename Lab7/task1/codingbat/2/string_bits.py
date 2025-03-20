def string_bits(str):
  ans = ''
  for i in range(0, len(str), 2):
    ans += str[i]
  return ans
