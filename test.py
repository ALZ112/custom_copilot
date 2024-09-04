def fibonacci(n):
  """Calculates the nth Fibonacci number.

  Args:
    n: The index of the Fibonacci number to calculate.

  Returns:
    The nth Fibonacci number.
  """

  if n < 0:
    raise ValueError("Fibonacci numbers cannot be calculated for negative values of n.")

  if n < 2:
    return n

  fib_minus_2 = 0
  fib_minus_1 = 1

  for _ in range(2, n):
    fib = fib_minus_2 + fib_minus_1
    fib_minus_2 = fib_minus_1
    fib_minus_1 = fib

  return fib
