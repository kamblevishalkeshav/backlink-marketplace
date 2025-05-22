'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/category';
import { Plus, Trash } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

const MOCK_CATEGORIES: Category[] = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Tech blogs, SaaS, gadgets',
    createdAt: new Date().toISOString(),
    listingsCount: 42,
  },
  {
    id: 'news',
    name: 'News',
    createdAt: new Date().toISOString(),
    listingsCount: 25,
  },
  {
    id: 'fashion',
    name: 'Fashion',
    createdAt: new Date().toISOString(),
    listingsCount: 12,
  },
];

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const filtered = useMemo(() => {
    return categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const handleDelete = (id: string) => {
    if (!confirm('Delete this category?')) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, '-');
    setCategories((prev) => [
      ...prev,
      {
        id: slug,
        name: newName.trim(),
        description: newDescription.trim(),
        createdAt: new Date().toISOString(),
        listingsCount: 0,
      },
    ]);
    setNewName('');
    setNewDescription('');
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Input
              placeholder="Search category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Button size="sm" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Category
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-t">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Listings</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="px-4 py-2 font-medium text-gray-900">{c.name}</td>
                      <td className="px-4 py-2 text-gray-600">{c.description || '-'}</td>
                      <td className="px-4 py-2">
                        <Badge variant="outline">{c.listingsCount || 0}</Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Button size="icon" variant="outline" onClick={() => handleDelete(c.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add category dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <Input
              placeholder="Category name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <Input
              placeholder="Description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
} 