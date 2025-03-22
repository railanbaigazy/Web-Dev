def cigar_party(cigars, is_weekend):
  return not is_weekend and (40 <= cigars <= 60) or (is_weekend and cigars >= 40)
