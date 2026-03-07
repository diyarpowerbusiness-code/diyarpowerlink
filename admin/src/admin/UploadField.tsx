import React, { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { resolveImageUrl } from './resolveImage';

type UploadFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
};

export const UploadField = ({ label, value, onChange, onUploadingChange }: UploadFieldProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const upload = async (selected?: File | null) => {
    const fileToUpload = selected || file;
    if (!fileToUpload) return;
    setUploading(true);
    setError('');
    onUploadingChange?.(true);
    try {
      const res = await api.upload(fileToUpload);
      const rawUrl = res?.url || '';
      const url = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : (rawUrl ? `${API_BASE}${rawUrl}` : '');
      if (url) {
        onChange(url);
      } else {
        setError('Upload failed. Please try again.');
      }
      setFile(null);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  };

  const onSelectFile = async (selected: File | null) => {
    setFile(selected);
    if (selected) {
      await upload(selected);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {value && (
        <div className="border border-slate-200 rounded-xl p-2 w-full">
          <img src={resolveImageUrl(value)} alt={label} className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}
      {previewUrl && (
        <div className="border border-slate-200 rounded-xl p-2 w-full">
          <img src={previewUrl} alt={`${label} preview`} className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <label className="cursor-pointer border-2 border-dashed border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50/40 transition-colors flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
            +
          </div>
          <div>
            <div className="font-semibold text-slate-700">Upload image</div>
            <div className="text-xs text-slate-500">Click to choose a file from your PC</div>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => onSelectFile(e.target.files?.[0] || null)} />
        </label>
        {file && <span className="text-xs text-slate-500">{file.name}</span>}
        {uploading && <span className="text-xs text-blue-600">Uploading... please wait</span>}
        {error && <span className="text-xs text-red-600">{error}</span>}
        {value && !uploading && (
          <button type="button" onClick={() => onChange('')} className="text-sm text-slate-600 hover:text-slate-900 w-fit">
            Remove
          </button>
        )}
      </div>
    </div>
  );
};
