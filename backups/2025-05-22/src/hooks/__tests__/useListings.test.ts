import { act, renderHook, waitFor } from '@testing-library/react';
import { useListings } from '../useListings';

describe('useListings pagination', () => {
  it('returns correct listings for the first page', async () => {
    const { result } = renderHook(() => useListings(1, 2));
    act(() => {
      result.current.fetchListings();
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.listings.length).toBe(2);
    expect(result.current.totalPages).toBeGreaterThan(0);
  });

  it('returns correct listings for the second page', async () => {
    const { result } = renderHook(() => useListings(2, 2));
    act(() => {
      result.current.fetchListings();
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.listings.length).toBe(2);
  });

  it('returns empty listings for out-of-range page', async () => {
    const { result } = renderHook(() => useListings(100, 2));
    act(() => {
      result.current.fetchListings();
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.listings.length).toBe(0);
  });

  it('calculates totalPages correctly', async () => {
    const { result } = renderHook(() => useListings(1, 2));
    act(() => {
      result.current.fetchListings();
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    // There are 6 mock listings in useListings
    expect(result.current.totalPages).toBe(3);
  });
}); 