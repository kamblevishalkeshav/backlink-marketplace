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
import { Language } from '@/types/language';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialLanguages: Language[] = [
  { id: uuidv4(), name: 'English', code: 'en', script: 'Latin' },
  { id: uuidv4(), name: 'Spanish', code: 'es', script: 'Latin' },
  { id: uuidv4(), name: 'Arabic', code: 'ar', script: 'Arabic' },
];

export const LanguageTable: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [deletingLanguage, setDeletingLanguage] = useState<Language | null>(null);
  const [form, setForm] = useState({ name: '', code: '', script: '' });
  const [error, setError] = useState('');

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase()) ||
    lang.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingLanguage(null);
    setForm({ name: '', code: '', script: '' });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (language: Language) => {
    setEditingLanguage(language);
    setForm({ name: language.name, code: language.code, script: language.script || '' });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (language: Language) => {
    setDeletingLanguage(language);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLanguage(null);
    setForm({ name: '', code: '', script: '' });
    setError('');
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingLanguage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.code.trim()) {
      setError('Name and code are required.');
      return;
    }
    if (
      languages.some(
        lang =>
          lang.code.toLowerCase() === form.code.toLowerCase() &&
          (!editingLanguage || lang.id !== editingLanguage.id)
      )
    ) {
      setError('Language code must be unique.');
      return;
    }
    if (editingLanguage) {
      setLanguages(langs =>
        langs.map(lang =>
          lang.id === editingLanguage.id
            ? { ...lang, name: form.name, code: form.code, script: form.script }
            : lang
        )
      );
    } else {
      setLanguages(langs => [
        ...langs,
        { id: uuidv4(), name: form.name, code: form.code, script: form.script },
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (deletingLanguage) {
      setLanguages(langs => langs.filter(lang => lang.id !== deletingLanguage.id));
      handleCloseDeleteModal();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Languages</h2>
        <Button onClick={handleOpenAdd} aria-label="Add Language">Add Language</Button>
      </div>
      <Input
        type="text"
        placeholder="Search by name or code..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full max-w-xs"
        aria-label="Search Languages"
      />
      <Table>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Code</th>
            <th className="text-left">Script</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLanguages.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">No languages found.</td>
            </tr>
          ) : (
            filteredLanguages.map(lang => (
              <tr key={lang.id}>
                <td>{lang.name}</td>
                <td>{lang.code}</td>
                <td>{lang.script || '-'}</td>
                <td>
                  <Button size="sm" variant="outline" onClick={() => handleOpenEdit(lang)} aria-label={`Edit ${lang.name}`}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleOpenDelete(lang)} aria-label={`Delete ${lang.name}`} className="ml-2">Delete</Button>
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
            <DialogTitle>{editingLanguage ? 'Edit Language' : 'Add Language'}</DialogTitle>
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
                aria-label="Language Name"
              />
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                aria-label="Language Code"
              />
            </div>
            <div>
              <Label htmlFor="script">Script (optional)</Label>
              <Input
                id="script"
                name="script"
                value={form.script}
                onChange={handleChange}
                aria-label="Language Script"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit">{editingLanguage ? 'Save Changes' : 'Add Language'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Language</DialogTitle>
          </DialogHeader>
          <div className="mb-4">Are you sure you want to delete <span className="font-semibold">{deletingLanguage?.name}</span>?</div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguageTable; 