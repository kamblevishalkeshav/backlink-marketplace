'use client';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/common/Modal';
import { Table } from '@/components/common/Table';
import { SensitiveNiche } from '@/types/category';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialSensitiveNiches: SensitiveNiche[] = [
  { id: uuidv4(), name: 'Adult', description: 'Adult content or services' },
  { id: uuidv4(), name: 'Gambling', description: 'Gambling or betting related' },
  { id: uuidv4(), name: 'Crypto', description: 'Cryptocurrency and blockchain' },
];

export const SensitiveNicheTable: React.FC = () => {
  const [niches, setNiches] = useState<SensitiveNiche[]>(initialSensitiveNiches);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNiche, setEditingNiche] = useState<SensitiveNiche | null>(null);
  const [deletingNiche, setDeletingNiche] = useState<SensitiveNiche | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  const filteredNiches = niches.filter(niche =>
    niche.name.toLowerCase().includes(search.toLowerCase()) ||
    (niche.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  const handleOpenAdd = () => {
    setEditingNiche(null);
    setForm({ name: '', description: '' });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (niche: SensitiveNiche) => {
    setEditingNiche(niche);
    setForm({ name: niche.name, description: niche.description || '' });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (niche: SensitiveNiche) => {
    setDeletingNiche(niche);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNiche(null);
    setForm({ name: '', description: '' });
    setError('');
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingNiche(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }
    if (
      niches.some(
        n =>
          n.name.toLowerCase() === form.name.toLowerCase() &&
          (!editingNiche || n.id !== editingNiche.id)
      )
    ) {
      setError('Sensitive niche name must be unique.');
      return;
    }
    if (editingNiche) {
      setNiches(ns =>
        ns.map(n =>
          n.id === editingNiche.id
            ? { ...n, name: form.name, description: form.description }
            : n
        )
      );
    } else {
      setNiches(ns => [
        ...ns,
        { id: uuidv4(), name: form.name, description: form.description },
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (deletingNiche) {
      setNiches(ns => ns.filter(n => n.id !== deletingNiche.id));
      handleCloseDeleteModal();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Sensitive Niches</h2>
        <Button onClick={handleOpenAdd} aria-label="Add Sensitive Niche">Add Sensitive Niche</Button>
      </div>
      <Input
        type="text"
        placeholder="Search by name or description..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full max-w-xs"
        aria-label="Search Sensitive Niches"
      />
      <Table>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Description</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNiches.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">No sensitive niches found.</td>
            </tr>
          ) : (
            filteredNiches.map(niche => (
              <tr key={niche.id}>
                <td>{niche.name}</td>
                <td>{niche.description || '-'}</td>
                <td>
                  <Button size="sm" variant="outline" onClick={() => handleOpenEdit(niche)} aria-label={`Edit ${niche.name}`}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleOpenDelete(niche)} aria-label={`Delete ${niche.name}`} className="ml-2">Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingNiche ? 'Edit Sensitive Niche' : 'Add Sensitive Niche'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                aria-label="Sensitive Niche Name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                aria-label="Sensitive Niche Description"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit">{editingNiche ? 'Save Changes' : 'Add Sensitive Niche'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sensitive Niche</DialogTitle>
          </DialogHeader>
          <div className="mb-4">Are you sure you want to delete <span className="font-semibold">{deletingNiche?.name}</span>?</div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SensitiveNicheTable; 