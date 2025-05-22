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
import { Country, Region } from '@/types/category';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialRegions: Region[] = [
  { id: uuidv4(), name: 'Europe' },
  { id: uuidv4(), name: 'Asia' },
  { id: uuidv4(), name: 'North America' },
];

const initialCountries: Country[] = [
  { id: uuidv4(), name: 'Germany', code: 'DE', regionId: '' },
  { id: uuidv4(), name: 'France', code: 'FR', regionId: '' },
  { id: uuidv4(), name: 'India', code: 'IN', regionId: '' },
  { id: uuidv4(), name: 'United States', code: 'US', regionId: '' },
];

export const CountryTable: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>(initialRegions);
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [search, setSearch] = useState('');
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isDeleteCountryModalOpen, setIsDeleteCountryModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);
  const [countryForm, setCountryForm] = useState({ name: '', code: '', regionId: '' });
  const [countryError, setCountryError] = useState('');
  const [regionForm, setRegionForm] = useState({ name: '' });
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [regionError, setRegionError] = useState('');

  // Filtered countries by search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.code.toLowerCase().includes(search.toLowerCase())
  );

  // Group countries by region
  const countriesByRegion = regions.map(region => ({
    region,
    countries: filteredCountries.filter(c => c.regionId === region.id)
  }));
  const ungroupedCountries = filteredCountries.filter(c => !c.regionId);

  // Country CRUD
  const handleOpenAddCountry = () => {
    setEditingCountry(null);
    setCountryForm({ name: '', code: '', regionId: '' });
    setCountryError('');
    setIsCountryModalOpen(true);
  };
  const handleOpenEditCountry = (country: Country) => {
    setEditingCountry(country);
    setCountryForm({ name: country.name, code: country.code, regionId: country.regionId || '' });
    setCountryError('');
    setIsCountryModalOpen(true);
  };
  const handleOpenDeleteCountry = (country: Country) => {
    setDeletingCountry(country);
    setIsDeleteCountryModalOpen(true);
  };
  const handleCloseCountryModal = () => {
    setIsCountryModalOpen(false);
    setEditingCountry(null);
    setCountryForm({ name: '', code: '', regionId: '' });
    setCountryError('');
  };
  const handleCloseDeleteCountryModal = () => {
    setIsDeleteCountryModalOpen(false);
    setDeletingCountry(null);
  };
  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCountryForm({ ...countryForm, [e.target.name]: e.target.value });
  };
  const handleSaveCountry = () => {
    if (!countryForm.name.trim() || !countryForm.code.trim()) {
      setCountryError('Name and code are required.');
      return;
    }
    if (
      countries.some(
        c =>
          c.code.toLowerCase() === countryForm.code.toLowerCase() &&
          (!editingCountry || c.id !== editingCountry.id)
      )
    ) {
      setCountryError('Country code must be unique.');
      return;
    }
    if (editingCountry) {
      setCountries(cs =>
        cs.map(c =>
          c.id === editingCountry.id
            ? { ...c, name: countryForm.name, code: countryForm.code, regionId: countryForm.regionId || undefined }
            : c
        )
      );
    } else {
      setCountries(cs => [
        ...cs,
        { id: uuidv4(), name: countryForm.name, code: countryForm.code, regionId: countryForm.regionId || undefined },
      ]);
    }
    handleCloseCountryModal();
  };
  const handleDeleteCountry = () => {
    if (deletingCountry) {
      setCountries(cs => cs.filter(c => c.id !== deletingCountry.id));
      handleCloseDeleteCountryModal();
    }
  };

  // Region CRUD
  const handleOpenAddRegion = () => {
    setEditingRegion(null);
    setRegionForm({ name: '' });
    setRegionError('');
    setIsRegionModalOpen(true);
  };
  const handleOpenEditRegion = (region: Region) => {
    setEditingRegion(region);
    setRegionForm({ name: region.name });
    setRegionError('');
    setIsRegionModalOpen(true);
  };
  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionForm({ ...regionForm, [e.target.name]: e.target.value });
  };
  const handleSaveRegion = () => {
    if (!regionForm.name.trim()) {
      setRegionError('Region name is required.');
      return;
    }
    if (
      regions.some(
        r =>
          r.name.toLowerCase() === regionForm.name.toLowerCase() &&
          (!editingRegion || r.id !== editingRegion.id)
      )
    ) {
      setRegionError('Region name must be unique.');
      return;
    }
    if (editingRegion) {
      setRegions(rs =>
        rs.map(r => (r.id === editingRegion.id ? { ...r, name: regionForm.name } : r))
      );
    } else {
      setRegions(rs => [...rs, { id: uuidv4(), name: regionForm.name }]);
    }
    setIsRegionModalOpen(false);
    setEditingRegion(null);
    setRegionForm({ name: '' });
    setRegionError('');
  };
  const handleDeleteRegion = (region: Region) => {
    // Remove region from countries
    setCountries(cs => cs.map(c => (c.regionId === region.id ? { ...c, regionId: undefined } : c)));
    setRegions(rs => rs.filter(r => r.id !== region.id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Countries & Regions</h2>
        <div className="flex gap-2">
          <Button onClick={handleOpenAddCountry} aria-label="Add Country">Add Country</Button>
          <Button onClick={handleOpenAddRegion} variant="outline" aria-label="Add Region">Manage Regions</Button>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Search by name or code..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full max-w-xs"
        aria-label="Search Countries"
      />
      {/* Table grouped by region */}
      {countriesByRegion.map(({ region, countries }) => (
        <div key={region.id} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{region.name}</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleOpenEditRegion(region)} aria-label={`Edit ${region.name}`}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteRegion(region)} aria-label={`Delete ${region.name}`}>Delete</Button>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Code</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">No countries in this region.</td>
                </tr>
              ) : (
                countries.map(country => (
                  <tr key={country.id}>
                    <td>{country.name}</td>
                    <td>{country.code}</td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => handleOpenEditCountry(country)} aria-label={`Edit ${country.name}`}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleOpenDeleteCountry(country)} aria-label={`Delete ${country.name}`} className="ml-2">Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      ))}
      {/* Ungrouped countries */}
      {ungroupedCountries.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">No Region</h3>
          <Table>
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Code</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ungroupedCountries.map(country => (
                <tr key={country.id}>
                  <td>{country.name}</td>
                  <td>{country.code}</td>
                  <td>
                    <Button size="sm" variant="outline" onClick={() => handleOpenEditCountry(country)} aria-label={`Edit ${country.name}`}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleOpenDeleteCountry(country)} aria-label={`Delete ${country.name}`} className="ml-2">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {/* Add/Edit Country Modal */}
      <Dialog open={isCountryModalOpen} onOpenChange={setIsCountryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCountry ? 'Edit Country' : 'Add Country'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSaveCountry();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={countryForm.name}
                onChange={handleCountryChange}
                required
                aria-label="Country Name"
              />
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                name="code"
                value={countryForm.code}
                onChange={handleCountryChange}
                required
                aria-label="Country Code"
              />
            </div>
            <div>
              <Label htmlFor="regionId">Region</Label>
              <select
                id="regionId"
                name="regionId"
                value={countryForm.regionId}
                onChange={handleCountryChange}
                className="w-full border rounded-md px-3 py-2 text-sm"
                aria-label="Country Region"
              >
                <option value="">No Region</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
            {countryError && <div className="text-red-500 text-sm">{countryError}</div>}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCloseCountryModal}>Cancel</Button>
              <Button type="submit">{editingCountry ? 'Save Changes' : 'Add Country'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Delete Country Modal */}
      <Dialog open={isDeleteCountryModalOpen} onOpenChange={setIsDeleteCountryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Country</DialogTitle>
          </DialogHeader>
          <div className="mb-4">Are you sure you want to delete <span className="font-semibold">{deletingCountry?.name}</span>?</div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCloseDeleteCountryModal}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={handleDeleteCountry}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Add/Edit Region Modal */}
      <Dialog open={isRegionModalOpen} onOpenChange={setIsRegionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRegion ? 'Edit Region' : 'Add Region'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSaveRegion();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="regionName">Region Name</Label>
              <Input
                id="regionName"
                name="name"
                value={regionForm.name}
                onChange={handleRegionChange}
                required
                aria-label="Region Name"
              />
            </div>
            {regionError && <div className="text-red-500 text-sm">{regionError}</div>}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsRegionModalOpen(false)}>Cancel</Button>
              <Button type="submit">{editingRegion ? 'Save Changes' : 'Add Region'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CountryTable; 