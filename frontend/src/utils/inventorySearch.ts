import type { InventorySpool } from '../api/client';

/**
 * Return true when spool matches the search query across all searchable text fields.
 * Case-insensitive. Empty query always returns true.
 */
export function spoolMatchesQuery(spool: InventorySpool, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().split(" ");
  return q.every((term) =>
    String(spool.id).includes(term) ||
    spool.material.toLowerCase().includes(term) ||
    (spool.brand?.toLowerCase().includes(term) ?? false) ||
    (spool.color_name?.toLowerCase().includes(term) ?? false) ||
    (spool.subtype?.toLowerCase().includes(term) ?? false) ||
    (spool.note?.toLowerCase().includes(term) ?? false) ||
    (spool.slicer_filament_name?.toLowerCase().includes(term) ?? false) ||
    (spool.storage_location?.toLowerCase().includes(term) ?? false)
  );
}

/** Filter a spool list by a free-text search query. */
export function filterSpoolsByQuery(spools: InventorySpool[], query: string): InventorySpool[] {
  if (!query) return spools;
  return spools.filter((spool) => spoolMatchesQuery(spool, query));
}
